// Firebase Spark (Auth + Cloud Firestore with Offline Persistence) bridge for Pipefitter Inventory
// Supports 3-tier hierarchy: Main Admin -> Supervisor -> Crew
(() => {
  const FB_VER = '10.14.1';
  const LS_CFG_KEY = 'pipefitter_fb_config_v1';

  const Cloud = {
    configured: false,
    ready: false,
    online: navigator.onLine,
    config: null,
    user: null,       // Firebase Auth user
    profile: null,    // { uid, username, displayName, role: 'admin'|'supervisor'|'crew', supervisorId, teamId }
    users: [],        // Visible user profiles (all for admin; own group for supervisor/crew)
    unsubs: [],
    onStateChange: null,
    onRemoteData: null,

    getSavedConfig() {
      if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && window.FIREBASE_CONFIG.projectId) {
        return window.FIREBASE_CONFIG;
      }
      try {
        const raw = localStorage.getItem(LS_CFG_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.apiKey && parsed.projectId) return parsed;
        }
      } catch {}
      return null;
    },

    saveConfig(cfg) {
      if (!cfg) {
        try { localStorage.removeItem(LS_CFG_KEY); } catch {}
        return;
      }
      try { localStorage.setItem(LS_CFG_KEY, JSON.stringify(cfg)); } catch {}
    },

    toAuthEmail(usernameOrEmail) {
      const s = String(usernameOrEmail || '').trim().toLowerCase();
      if (!s) return '';
      return s.includes('@') ? s : s.replace(/[^a-z0-9._-]/g, '') + '@pipefitter.local';
    },

    isAdmin() { return Boolean(this.user && this.profile && this.profile.role === 'admin'); },
    isSupervisor() { return Boolean(this.user && this.profile && this.profile.role === 'supervisor'); },
    isCrew() { return Boolean(this.user && this.profile && this.profile.role === 'crew'); },
    mySupervisorId() {
      if (!this.profile) return null;
      if (this.profile.role === 'supervisor') return this.profile.uid;
      return this.profile.supervisorId || null;
    },
    supervisors() {
      return this.users.filter((u) => u.role === 'supervisor');
    },

    loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(s);
      });
    },

    async init(callbacks = {}) {
      this.onStateChange = callbacks.onStateChange || (() => {});
      this.onRemoteData = callbacks.onRemoteData || (() => {});
      window.addEventListener('online', () => { this.online = true; this.onStateChange(); });
      window.addEventListener('offline', () => { this.online = false; this.onStateChange(); });

      const cfg = this.getSavedConfig();
      if (!cfg) {
        this.configured = false;
        this.ready = false;
        this.onStateChange();
        return false;
      }

      this.config = cfg;
      this.configured = true;
      try {
        await this.loadScript(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-app-compat.js`);
        await this.loadScript(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-auth-compat.js`);
        await this.loadScript(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-firestore-compat.js`);

        if (!window.firebase.apps.length) {
          window.firebase.initializeApp(cfg);
        }
        this.auth = window.firebase.auth();
        this.db = window.firebase.firestore();
        try {
          await this.db.enablePersistence({ synchronizeTabs: true });
        } catch (err) {}

        this.ready = true;
        this.auth.onAuthStateChanged(async (u) => {
          this.stopListeners();
          this.user = u || null;
          this.profile = null;
          this.users = [];
          if (u) {
            await this.ensureProfile(u);
            this.startListeners();
          }
          this.onStateChange();
        });
        return true;
      } catch (err) {
        console.warn('Firebase init error:', err);
        this.ready = false;
        this.onStateChange();
        return false;
      }
    },

    async ensureProfile(u, extra = {}) {
      const ref = this.db.collection('users').doc(u.uid);
      const snap = await ref.get();
      if (snap.exists) {
        this.profile = { uid: u.uid, ...snap.data() };
        return this.profile;
      }
      const existing = await this.db.collection('users').limit(1).get();
      const isFirst = existing.empty;
      const username = extra.username || (u.email || '').split('@')[0] || 'user';
      const profile = {
        uid: u.uid,
        username,
        displayName: extra.displayName || username,
        role: isFirst ? 'admin' : (extra.role || 'crew'),
        supervisorId: extra.supervisorId || '',
        teamId: extra.teamId || 'team-1',
        createdAt: Date.now()
      };
      await ref.set(profile);
      this.profile = profile;
      return profile;
    },

    async signIn(usernameOrEmail, password) {
      const email = this.toAuthEmail(usernameOrEmail);
      const cred = await this.auth.signInWithEmailAndPassword(email, password);
      await this.ensureProfile(cred.user);
      this.onStateChange();
      return this.profile;
    },

    async register(usernameOrEmail, password, displayName, teamId) {
      const email = this.toAuthEmail(usernameOrEmail);
      const cred = await this.auth.createUserWithEmailAndPassword(email, password);
      await this.ensureProfile(cred.user, {
        username: String(usernameOrEmail).trim().split('@')[0],
        displayName: String(displayName || usernameOrEmail).trim(),
        teamId: teamId || 'team-1'
      });
      this.onStateChange();
      return this.profile;
    },

    // Create a Supervisor (Admin only) or Crew (Admin or Supervisor) without signing out the current user
    async createManagedAccount({ username, password, displayName, role, supervisorId, teamId }) {
      if (!this.ready || !this.user) throw new Error('Not signed in');
      if (role === 'supervisor' && !this.isAdmin()) throw new Error('Only Main Admin can create Supervisors');
      if (role === 'crew' && !this.isAdmin() && !this.isSupervisor()) throw new Error('Not authorized');

      const secName = 'pf_creator_' + Date.now();
      const secApp = window.firebase.initializeApp(this.config, secName);
      try {
        const email = this.toAuthEmail(username);
        const cred = await secApp.auth().createUserWithEmailAndPassword(email, password);
        const uid = cred.user.uid;
        const supId = role === 'supervisor' ? uid : (this.isSupervisor() ? this.user.uid : (supervisorId || ''));
        const profile = {
          uid,
          username: String(username).trim().split('@')[0],
          displayName: String(displayName || username).trim(),
          role,
          supervisorId: supId,
          teamId: role === 'crew' ? (teamId || '') : '',
          createdAt: Date.now()
        };
        await this.db.collection('users').doc(uid).set(profile);
        await secApp.auth().signOut();
        return profile;
      } finally {
        await secApp.delete().catch(() => {});
      }
    },

    async signOut() {
      this.stopListeners();
      if (this.auth) await this.auth.signOut();
      this.user = null;
      this.profile = null;
      this.users = [];
      this.onStateChange();
    },

    async changePassword(currentPassword, newPassword) {
      if (!this.auth || !this.user) throw new Error('Not signed in');
      if (!currentPassword) throw new Error('Enter your current password');
      if (!newPassword || newPassword.length < 6) throw new Error('New password must be at least 6 characters');
      const cred = window.firebase.auth.EmailAuthProvider.credential(this.user.email, currentPassword);
      await this.user.reauthenticateWithCredential(cred);
      await this.user.updatePassword(newPassword);
    },

    stopListeners() {
      this.unsubs.forEach((fn) => { try { fn(); } catch {} });
      this.unsubs = [];
    },

    startListeners() {
      if (!this.db || !this.user || !this.profile) return;
      const admin = this.isAdmin();
      const supId = this.mySupervisorId();

      this.unsubs.push(
        this.db.collection('yard').doc('meta').onSnapshot((doc) => {
          if (doc.exists) this.onRemoteData({ meta: doc.data() });
        })
      );

      const teamsQ = admin
        ? this.db.collection('teams')
        : this.db.collection('teams').where('supervisorId', '==', supId || '__none__');
      this.unsubs.push(
        teamsQ.onSnapshot((snap) => {
          const teams = [];
          snap.forEach((d) => teams.push({ id: d.id, ...d.data() }));
          this.onRemoteData({ teams, hasRemoteTeams: true });
        })
      );

      const conexQ = admin
        ? this.db.collection('conexes')
        : this.db.collection('conexes').where('supervisorId', '==', supId || '__none__');
      this.unsubs.push(
        conexQ.onSnapshot((snap) => {
          const conexes = [];
          snap.forEach((d) => conexes.push({ id: d.id, ...d.data() }));
          this.onRemoteData({ conexes, hasRemoteConexes: true });
        })
      );

      const itemsQ = admin
        ? this.db.collection('items')
        : this.db.collection('items').where('supervisorId', '==', supId || '__none__');
      this.unsubs.push(
        itemsQ.onSnapshot((snap) => {
          const items = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
          this.onRemoteData({ items, hasRemoteItems: !snap.empty || !admin });
        })
      );

      const logsQ = admin
        ? this.db.collection('logs').orderBy('ts', 'desc').limit(150)
        : this.db.collection('logs').where('supervisorId', '==', supId || '__none__').limit(150);
      this.unsubs.push(
        logsQ.onSnapshot((snap) => {
          const logs = [];
          snap.forEach((d) => logs.push({ id: d.id, ...d.data() }));
          logs.sort((a, b) => (b.ts || b.t || 0) - (a.ts || a.t || 0));
          this.onRemoteData({ logs });
        })
      );

      const usersQ = admin
        ? this.db.collection('users')
        : this.db.collection('users').where('supervisorId', '==', supId || '__none__');
      this.unsubs.push(
        usersQ.onSnapshot((snap) => {
          const users = [];
          snap.forEach((d) => users.push({ uid: d.id, ...d.data() }));
          this.users = users;
          const mine = users.find((x) => x.uid === this.user.uid);
          if (mine) this.profile = mine;
          this.onStateChange();
        })
      );
    },

    async pushMeta(photoLibrary) {
      if (!this.isAdmin()) return;
      await this.db.collection('yard').doc('meta').set({ photoLibrary, updatedAt: Date.now() }, { merge: true });
    },

    async pushTeam(team) {
      if (!this.isAdmin() && !this.isSupervisor()) return;
      const doc = { ...team, supervisorId: this.isSupervisor() ? this.user.uid : (team.supervisorId || '') };
      await this.db.collection('teams').doc(doc.id).set(doc, { merge: true });
    },

    async deleteTeam(teamId) {
      if (!this.isAdmin() && !this.isSupervisor()) throw new Error('Only Supervisors and Main Admin can delete a team');
      await this.db.collection('teams').doc(teamId).delete();
    },

    // Main Admin only: transfer a Team (and all its Conex boxes + items) to a different Supervisor
    async transferTeamToSupervisor(teamId, newSupervisorId, conexes, items) {
      if (!this.isAdmin()) throw new Error('Only Main Admin can transfer teams between supervisors');
      const batch = this.db.batch();
      batch.set(this.db.collection('teams').doc(teamId), { supervisorId: newSupervisorId }, { merge: true });
      const teamConexIds = new Set();
      conexes.filter((c) => c.teamId === teamId).forEach((c) => {
        teamConexIds.add(c.id);
        batch.set(this.db.collection('conexes').doc(c.id), { supervisorId: newSupervisorId }, { merge: true });
      });
      items.filter((it) => teamConexIds.has(it.conexId)).forEach((it) => {
        batch.set(this.db.collection('items').doc(it.id), { supervisorId: newSupervisorId }, { merge: true });
      });
      this.users.filter((u) => u.role === 'crew' && u.teamId === teamId).forEach((u) => {
        batch.set(this.db.collection('users').doc(u.uid), { supervisorId: newSupervisorId }, { merge: true });
      });
      await batch.commit();
    },

    async pushConex(conex) {
      if (!this.isAdmin() && !this.isSupervisor()) return;
      const doc = { ...conex, supervisorId: this.isSupervisor() ? this.user.uid : (conex.supervisorId || '') };
      await this.db.collection('conexes').doc(doc.id).set(doc, { merge: true });
    },

    async deleteConex(conexId) {
      if (!this.isAdmin() && !this.isSupervisor()) throw new Error('Only Supervisors and Main Admin can delete a Conex box');
      await this.db.collection('conexes').doc(conexId).delete();
    },

    async pushItem(item) {
      if (!this.ready || !this.user) return;
      await this.db.collection('items').doc(item.id).set(item, { merge: true });
    },

    async deleteItem(itemId) {
      if (!this.ready || !this.user) return;
      await this.db.collection('items').doc(itemId).delete();
    },

    async pushLog(logEntry) {
      if (!this.ready || !this.user) return;
      const id = 'log_' + (logEntry.ts || Date.now()) + '_' + Math.random().toString(36).slice(2, 6);
      await this.db.collection('logs').doc(id).set(logEntry);
    },

    async updateUserProfile(uid, patch) {
      if (!this.isAdmin() && !this.isSupervisor()) return;
      await this.db.collection('users').doc(uid).set(patch, { merge: true });
    },

    async deleteUserProfile(uid) {
      if (!this.isAdmin() && !this.isSupervisor()) return;
      if (this.user && this.user.uid === uid) throw new Error('Cannot delete your own account');
      await this.db.collection('users').doc(uid).delete();
    },

    async seedCloudIfEmpty(state) {
      if (!this.isAdmin()) return;
      const metaSnap = await this.db.collection('yard').doc('meta').get();
      if (metaSnap.exists) return;
      const batch = this.db.batch();
      batch.set(this.db.collection('yard').doc('meta'), {
        photoLibrary: state.photoLib || [],
        updatedAt: Date.now()
      });
      state.teams.forEach((t) => batch.set(this.db.collection('teams').doc(t.id), { ...t, supervisorId: t.supervisorId || '' }));
      state.conexes.forEach((c) => batch.set(this.db.collection('conexes').doc(c.id), { ...c, supervisorId: c.supervisorId || '' }));
      state.items.forEach((it) => batch.set(this.db.collection('items').doc(it.id), { ...it, supervisorId: it.supervisorId || '' }));
      await batch.commit();
    }
  };

  window.PipefitterCloud = Cloud;
})();
