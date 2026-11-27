// Firebase Spark (Auth + Cloud Firestore with Offline Persistence) bridge for Pipefitter Inventory
(() => {
  const FB_VER = '10.14.1';
  const LS_CFG_KEY = 'pipefitter_fb_config_v1';

  const Cloud = {
    configured: false,
    ready: false,
    online: navigator.onLine,
    user: null,       // Firebase Auth user
    profile: null,    // { uid, username, displayName, role: 'admin'|'crew', teamId }
    users: [],        // All user profiles (for Admin Panel)
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
        } catch (err) {
          // Multi-tab or private browsing fallback — still works online/memory
        }

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
      // First user in the project becomes Admin automatically
      const existing = await this.db.collection('users').limit(1).get();
      const isFirst = existing.empty;
      const username = extra.username || (u.email || '').split('@')[0] || 'user';
      const profile = {
        uid: u.uid,
        username,
        displayName: extra.displayName || username,
        role: isFirst ? 'admin' : 'crew',
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

    async signOut() {
      this.stopListeners();
      if (this.auth) await this.auth.signOut();
      this.user = null;
      this.profile = null;
      this.users = [];
      this.onStateChange();
    },

    stopListeners() {
      this.unsubs.forEach((fn) => { try { fn(); } catch {} });
      this.unsubs = [];
    },

    startListeners() {
      if (!this.db || !this.user) return;
      this.unsubs.push(
        this.db.collection('yard').doc('meta').onSnapshot((doc) => {
          if (doc.exists) this.onRemoteData({ meta: doc.data() });
        })
      );
      this.unsubs.push(
        this.db.collection('conexes').onSnapshot((snap) => {
          const conexes = [];
          snap.forEach((d) => conexes.push({ id: d.id, ...d.data() }));
          if (conexes.length) this.onRemoteData({ conexes });
        })
      );
      this.unsubs.push(
        this.db.collection('items').onSnapshot((snap) => {
          const items = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
          this.onRemoteData({ items, hasRemoteItems: !snap.empty });
        })
      );
      this.unsubs.push(
        this.db.collection('logs').orderBy('ts', 'desc').limit(150).onSnapshot((snap) => {
          const logs = [];
          snap.forEach((d) => logs.push({ id: d.id, ...d.data() }));
          this.onRemoteData({ logs });
        })
      );
      this.unsubs.push(
        this.db.collection('users').onSnapshot((snap) => {
          const users = [];
          snap.forEach((d) => users.push({ uid: d.id, ...d.data() }));
          this.users = users;
          const mine = users.find((x) => x.uid === this.user.uid);
          if (mine) this.profile = mine;
          this.onStateChange();
        })
      );
    },

    async pushMeta(teams, photoLibrary) {
      if (!this.ready || !this.user || this.profile?.role !== 'admin') return;
      await this.db.collection('yard').doc('meta').set({ teams, photoLibrary, updatedAt: Date.now() }, { merge: true });
    },

    async pushConex(conex) {
      if (!this.ready || !this.user || this.profile?.role !== 'admin') return;
      await this.db.collection('conexes').doc(conex.id).set(conex, { merge: true });
    },

    async deleteConex(conexId) {
      if (!this.ready || !this.user || this.profile?.role !== 'admin') return;
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
      if (!this.ready || !this.user || this.profile?.role !== 'admin') return;
      await this.db.collection('users').doc(uid).set(patch, { merge: true });
    },

    async seedCloudIfEmpty(state) {
      if (!this.ready || !this.user || this.profile?.role !== 'admin') return;
      const metaSnap = await this.db.collection('yard').doc('meta').get();
      if (metaSnap.exists) return;
      const batch = this.db.batch();
      batch.set(this.db.collection('yard').doc('meta'), {
        teams: state.teams,
        photoLibrary: state.photoLibrary,
        updatedAt: Date.now()
      });
      state.conexes.forEach((c) => batch.set(this.db.collection('conexes').doc(c.id), c));
      state.items.forEach((it) => batch.set(this.db.collection('items').doc(it.id), it));
      await batch.commit();
    }
  };

  window.PipefitterCloud = Cloud;
})();
