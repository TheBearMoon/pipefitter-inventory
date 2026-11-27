const admin = require('firebase-admin');

function getAdminApp() {
  if (admin.apps.length) return admin.app();
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT env var is not configured');
  const serviceAccount = JSON.parse(raw);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

function setCors(req, res) {
  const origin = req.headers.origin || '';
  const allowed = [
    'https://thebearmoon.github.io',
    'http://localhost:8765',
    'http://127.0.0.1:8765',
    'http://localhost:3000'
  ];
  if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://thebearmoon.github.io');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    getAdminApp();
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) return res.status(401).json({ error: 'Missing authorization token' });

    const decoded = await admin.auth().verifyIdToken(match[1]);
    const callerUid = decoded.uid;

    const { targetUid, newPassword } = req.body || {};
    if (!targetUid || typeof targetUid !== 'string') {
      return res.status(400).json({ error: 'Missing target user ID' });
    }
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const db = admin.firestore();
    const callerSnap = await db.collection('users').doc(callerUid).get();
    if (!callerSnap.exists) return res.status(403).json({ error: 'Caller profile not found' });
    const caller = callerSnap.data();

    const targetSnap = await db.collection('users').doc(targetUid).get();
    if (!targetSnap.exists) return res.status(404).json({ error: 'Target user not found' });
    const target = targetSnap.data();

    const isAdmin = caller.role === 'admin';
    const isSupOfTarget =
      caller.role === 'supervisor' &&
      target.role === 'crew' &&
      target.supervisorId === callerUid;

    if (!isAdmin && !isSupOfTarget) {
      return res.status(403).json({
        error: 'Only Main Admin (all users) or the assigned Supervisor (own crew) can reset this password'
      });
    }

    await admin.auth().updateUser(targetUid, { password: newPassword });
    return res.status(200).json({ ok: true, uid: targetUid });
  } catch (err) {
    console.error('reset-password error:', err);
    return res.status(500).json({ error: err.message || 'Password reset failed' });
  }
};
