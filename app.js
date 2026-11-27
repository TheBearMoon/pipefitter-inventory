(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const ICON = {
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5L12 12l9-4.5M12 12v9"/></svg>',
    conex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M7 5.5v13M12 5.5v13M17 5.5v13"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
    firebase: '<svg viewBox="0 0 24 24" fill="none"><path d="M4.8 18.2L7.4 3.4c.1-.6.9-.7 1.2-.2l2.9 5.5 2.3-4.3c.3-.5 1-.4 1.2.1l4.2 13.7-6.8 3.8c-.5.3-1.1.3-1.6 0l-6-3.8z" fill="#FFA000"/><path d="M19.2 18.2L15 4.5c-.2-.5-.9-.6-1.2-.1L4.8 18.2l6 3.8c.5.3 1.1.3 1.6 0l6.8-3.8z" fill="#FFCA28"/><path d="M11.5 8.7L8.6 3.2c-.3-.5-1.1-.4-1.2.2L4.8 18.2l6.7-9.5z" fill="#F57C00"/></svg>',
    unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 017.5-2"/></svg>',
    chevDown: '<svg class="team-switch-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.4"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
    ul: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5M4 20h16"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.8-5.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 103-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    xfer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>'
  };

  const DEFAULT_PHOTO_LIB = [
    { id: 'green-gasket', label: 'Green', src: './assets/parts/green-gasket.jpg', builtin: true },
    { id: 'grey-gasket', label: 'Grey', src: './assets/parts/grey-gasket.jpg', builtin: true },
    { id: 'b7-bolt', label: 'B7 Bolt', src: './assets/parts/b7-stud-bolt.jpg', builtin: true },
    { id: 'l7-bolt', label: 'L7 Bolt', src: './assets/parts/l7-stud-bolt.jpg', builtin: true },
    { id: 'b8-bolt', label: 'B8 Bolt', src: './assets/parts/b8-stainless-stud-bolt.jpg', builtin: true },
    { id: 'u-bolt', label: 'U-Bolt', src: './assets/parts/u-bolt.jpg', builtin: true },
    { id: 'j-bolt', label: 'J-Bolt', src: './assets/parts/j-bolt.jpg', builtin: true },
    { id: 'pipe-plug', label: 'Plug', src: './assets/parts/pipe-plug.jpg', builtin: true },
    { id: 'ball-valve', label: 'Valve', src: './assets/parts/ball-valve.jpg', builtin: true }
  ];

  const DEFAULT_TEAMS = [
    { id: 'team-1', name: 'Crew A' },
    { id: 'team-2', name: 'Crew B' }
  ];

  const DEFAULT_CONEXES = [
    { id: 'conex-1', name: 'Conex 1', teamId: 'team-1' },
    { id: 'conex-2', name: 'Conex 2', teamId: 'team-2' }
  ];

  const SPEC = {
    'Gaskets': ['Pipe size', 'e.g. 4"', 'Material', 'e.g. Green Compressed Fiber', 'Type / Class', 'e.g. 150# Full Face'],
    'Bolts': ['Diameter × Length', 'e.g. 3/4" × 4-1/2"', 'Grade / Coating', 'e.g. ASTM A193 B7', 'Nut / Thread', 'e.g. 2H Heavy Hex'],
    'U-Bolts': ['Pipe size', 'e.g. 2" Pipe', 'Finish', 'e.g. Hot-Dip Galv', 'Rod / Thread', 'e.g. 3/8" Rod'],
    'J-Bolts': ['Diameter × Length', 'e.g. 1/2" × 12"', 'Finish', 'e.g. Hot-Dip Galv', 'Hook / Thread', 'e.g. 3" Thread'],
    'Pipe Plugs': ['Thread size', 'e.g. 1/2" NPT', 'Material', 'e.g. 316 Stainless', 'Head style', 'e.g. Hex Head'],
    'Valves': ['Size', 'e.g. 2" NPT', 'Body material', 'e.g. 316 Stainless', 'Type / Rating', 'e.g. Ball, 1000 WOG']
  };
  const DEF_SPEC = ['Size', 'e.g. 1"', 'Material', 'e.g. Carbon steel', 'Type / Rating', 'e.g. Standard'];
  const DEF_CATS = ['Gaskets', 'Bolts', 'U-Bolts', 'J-Bolts', 'Pipe Plugs', 'Valves'];
  const UNITS = ['ea', 'box', 'pack', 'set', 'ft', 'bag'];
  const SORT_LABELS = { name: 'Name', low: 'Low first', qty: 'Qty', bin: 'Bin', recent: 'Recent' };
  const SORT_OPTIONS = [
    ['name', 'Name (A–Z)'],
    ['low', 'Low stock first'],
    ['qty', 'Quantity (low to high)'],
    ['bin', 'Bin location'],
    ['recent', 'Recently updated']
  ];

  let S = {
    items: [],
    log: [],
    cats: DEF_CATS.slice(),
    teams: DEFAULT_TEAMS.map((t) => ({ ...t })),
    conexes: DEFAULT_CONEXES.map((c) => ({ ...c })),
    myTeamId: 'team-1',       // Team using this device (editable without unlocking)
    activeConex: 'conex-1',   // 'conex-1' | 'team:<id>' | 'all'
    pin: '',                  // Optional 4-digit supervisor PIN for unlocking other teams & whole-Conex transfers
    photoLib: DEFAULT_PHOTO_LIB.map((p) => ({ ...p })),
    theme: null,
    sort: 'name',
    seeded: false,
    lastBackup: null
  };

  let view = 'stock';
  let cat = 'All';
  let statusFilter = 'all';
  let actFilter = 'all';
  let query = '';
  let lastPopId = null;
  let unlockedTeams = new Set(); // Session-only unlock for supervisor edits on other teams

  // ---------- Offline-First Storage (IndexedDB -> localStorage -> Memory) ----------
  let db = null;
  let storageMode = 'memory';

  function openDB() {
    return new Promise((res) => {
      try {
        if (!('indexedDB' in window) || !window.indexedDB) return res();
        const r = window.indexedDB.open('ezinventory', 1);
        r.onupgradeneeded = () => {
          if (!r.result.objectStoreNames.contains('kv')) r.result.createObjectStore('kv');
        };
        r.onsuccess = () => { db = r.result; storageMode = 'idb'; res(); };
        r.onerror = () => res();
      } catch (_) { res(); }
    });
  }

  function loadState() {
    return new Promise((res) => {
      if (db) {
        try {
          const tx = db.transaction('kv').objectStore('kv').get('state');
          tx.onsuccess = () => res(tx.result || null);
          tx.onerror = () => res(null);
          return;
        } catch (_) {}
      }
      try {
        const raw = window.localStorage.getItem('ezinventory');
        if (raw) { storageMode = 'ls'; return res(JSON.parse(raw)); }
      } catch (_) {}
      res(null);
    });
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      if (db) {
        try {
          db.transaction('kv', 'readwrite').objectStore('kv').put(S, 'state');
          return;
        } catch (_) {}
      }
      try {
        window.localStorage.setItem('ezinventory', JSON.stringify(S));
        storageMode = 'ls';
      } catch (_) { storageMode = 'memory'; }
    }, 100);
  }

  function seed() {
    S.teams = DEFAULT_TEAMS.map((t) => ({ ...t }));
    S.conexes = DEFAULT_CONEXES.map((c) => ({ ...c }));
    S.myTeamId = 'team-1';
    S.activeConex = 'conex-1';
    S.pin = '';
    S.photoLib = DEFAULT_PHOTO_LIB.map((p) => ({ ...p }));
    const mk = (name, category, size, material, type, bin, qty, min, unit, sku, photo, conexId) => ({
      id: uid(), name, category, size, material, type, bin, qty, min, unit, sku,
      notes: '', photo, conexId, updated: Date.now(), sample: true
    });
    S.items = [
      mk('Green Fiber Flange Gasket', 'Gaskets', '4"', 'Green Compressed Fiber', '150# Full Face', 'A-1', 24, 10, 'ea', 'GFG-4-150', './assets/parts/green-gasket.jpg', 'conex-1'),
      mk('Grey Ring Gasket', 'Gaskets', '4"', 'Flexible Graphite', '150# RF Ring', 'A-2', 16, 10, 'ea', 'GRG-4-150', './assets/parts/grey-gasket.jpg', 'conex-1'),
      mk('B7 Stud Bolt w/ 2H Nuts', 'Bolts', '3/4" × 4-1/2"', 'ASTM A193 B7', 'Black Oxide', 'B-1', 6, 20, 'ea', 'B7-34-412', './assets/parts/b7-stud-bolt.jpg', 'conex-1'),
      mk('L7 Low-Temp Stud Bolt', 'Bolts', '3/4" × 4-1/2"', 'ASTM A320 L7', 'Alloy Steel', 'B-2', 32, 16, 'ea', 'L7-34-412', './assets/parts/l7-stud-bolt.jpg', 'conex-2'),
      mk('B8 Stainless Stud Bolt', 'Bolts', '5/8" × 3-3/4"', '304 Stainless (B8)', 'Heavy Hex Nuts', 'B-3', 14, 12, 'ea', 'B8-58-334', './assets/parts/b8-stainless-stud-bolt.jpg', 'conex-1'),
      mk('Galvanized Pipe U-Bolt', 'U-Bolts', '2" Pipe', 'Hot-Dip Galv', '3/8" Rod', 'C-2', 40, 15, 'ea', 'UB-2-HDG', './assets/parts/u-bolt.jpg', 'conex-2'),
      mk('J-Bolt Anchor', 'J-Bolts', '1/2" × 12"', 'Hot-Dip Galv', '3" Thread', 'C-5', 0, 10, 'ea', 'JB-12-12', './assets/parts/j-bolt.jpg', 'conex-1'),
      mk('Hex Head Pipe Plug', 'Pipe Plugs', '1/2" NPT', '316 Stainless', 'Hex Head', 'D-1', 18, 8, 'ea', 'PP-12-316', './assets/parts/pipe-plug.jpg', 'conex-1'),
      mk('Full Port Ball Valve', 'Valves', '2" NPT', '316 Stainless', '1000 WOG', 'E-4', 3, 4, 'ea', 'BV-2-316', './assets/parts/ball-valve.jpg', 'conex-2')
    ];
    S.seeded = true;
  }

  function migrateState() {
    let changed = false;
    if (!Array.isArray(S.teams) || !S.teams.length) {
      S.teams = DEFAULT_TEAMS.map((t) => ({ ...t }));
      changed = true;
    }
    // Migrate older combined { id, name, conex } teams into separate S.conexes
    if (!Array.isArray(S.conexes) || !S.conexes.length) {
      S.conexes = S.teams.map((t, idx) => ({
        id: 'conex-' + (idx + 1),
        name: t.conex || `Conex ${idx + 1}`,
        teamId: t.id
      }));
      changed = true;
    }
    if (!S.myTeamId || !S.teams.some((t) => t.id === S.myTeamId)) {
      S.myTeamId = S.teams[0].id;
      changed = true;
    }
    if (!S.activeConex || (S.activeConex !== 'all' && !S.activeConex.startsWith('team:') && !S.conexes.some((c) => c.id === S.activeConex))) {
      const firstMine = S.conexes.find((c) => c.teamId === S.myTeamId) || S.conexes[0];
      S.activeConex = firstMine.id;
      changed = true;
    }
    if (!Array.isArray(S.photoLib)) {
      S.photoLib = DEFAULT_PHOTO_LIB.map((p) => ({ ...p }));
      changed = true;
    }
    if (typeof S.pin !== 'string') { S.pin = ''; changed = true; }

    const defaultConexId = S.conexes[0].id;
    S.items.forEach((i) => {
      if (i.min == null) { i.min = 0; changed = true; }
      if (!i.conexId || !S.conexes.some((c) => c.id === i.conexId)) {
        const byTeam = i.teamId ? S.conexes.find((c) => c.teamId === i.teamId) : null;
        i.conexId = byTeam ? byTeam.id : defaultConexId;
        changed = true;
      }
    });
    if (changed) save();
  }

  // ---------- Helpers ----------
  const teamById = (id) => S.teams.find((t) => t.id === id) || S.teams[0] || { id: '', name: 'Unassigned' };
  function teamDisplayName(teamOrId) {
    const t = typeof teamOrId === 'string' ? teamById(teamOrId) : teamOrId;
    if (!t) return '';
    const crewNames = (Cloud.users || [])
      .filter((u) => u.role === 'crew' && u.teamId === t.id && (u.displayName || u.username))
      .map((u) => u.displayName || u.username);
    if (crewNames.length) return crewNames.join(', ');
    return t.name;
  }
  const conexById = (id) => S.conexes.find((c) => c.id === id) || S.conexes[0] || null;
  const conexesForTeam = (tid) => S.conexes.filter((c) => c.teamId === tid);
  const myTeamObj = () => teamById(S.myTeamId);

  const Cloud = window.PipefitterCloud || {
    configured: false, ready: false, online: true, user: null, profile: null, users: [],
    init: async () => false, saveConfig: () => {}, getSavedConfig: () => null,
    pushMeta: async () => {}, pushTeam: async () => {}, deleteTeam: async () => {},
    pushConex: async () => {}, deleteConex: async () => {},
    pushItem: async () => {}, deleteItem: async () => {}, pushLog: async () => {},
    seedCloudIfEmpty: async () => {}
  };

  function isMainAdmin() {
    if (Cloud.user && Cloud.profile) return Cloud.profile.role === 'admin';
    return !Cloud.configured;
  }

  function canManageYard() {
    if (Cloud.user && Cloud.profile) {
      return Cloud.profile.role === 'admin' || Cloud.profile.role === 'supervisor';
    }
    return !Cloud.configured;
  }

  function canEditConex(conexId) {
    const cx = conexById(conexId);
    if (!cx) return false;
    if (Cloud.user && Cloud.profile) {
      if (Cloud.profile.role === 'admin') return true;
      if (Cloud.profile.role === 'supervisor') return cx.supervisorId === Cloud.user.uid;
      return cx.teamId === Cloud.profile.teamId;
    }
    return cx.teamId === S.myTeamId || unlockedTeams.has(cx.teamId);
  }

  function editableConexes() {
    return S.conexes.filter((c) => canEditConex(c.id));
  }

  function activeScopeConexIds() {
    if (S.activeConex === 'all') return S.conexes.map((c) => c.id);
    if (S.activeConex.startsWith('team:')) {
      const tid = S.activeConex.slice(5);
      return conexesForTeam(tid).map((c) => c.id);
    }
    return [S.activeConex];
  }

  function scopedItems() {
    const ids = new Set(activeScopeConexIds());
    return S.items.filter((i) => ids.has(i.conexId));
  }

  function activeReadOnlyTeam() {
    if (S.activeConex === 'all') return null;
    if (S.activeConex.startsWith('team:')) {
      const tid = S.activeConex.slice(5);
      return tid !== S.myTeamId && !unlockedTeams.has(tid) ? teamById(tid) : null;
    }
    const cx = conexById(S.activeConex);
    return cx && !canEditConex(cx.id) ? teamById(cx.teamId) : null;
  }

  const statusOf = (i) => (i.qty <= 0 ? 'out' : (i.min > 0 && i.qty <= i.min ? 'low' : 'ok'));
  const statusRank = (i) => ({ out: 0, low: 1, ok: 2 }[statusOf(i)]);
  const specLine = (i) => [i.size, i.material, i.type].filter(Boolean).join(' · ');
  const needQty = (i) => Math.max((i.min || 0) * 2 - i.qty, (i.min || 0) - i.qty, 1);
  const lowItems = (items = scopedItems()) => items
    .filter((i) => statusOf(i) !== 'ok')
    .sort((a, b) => statusRank(a) - statusRank(b) || (a.qty - a.min) - (b.qty - b.min));

  function fmtTime(t) {
    return new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function fmtDay(t) {
    const d = new Date(t);
    const n = new Date();
    const y = new Date();
    y.setDate(n.getDate() - 1);
    if (d.toDateString() === n.toDateString()) return 'Today';
    if (d.toDateString() === y.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function recentNotes() {
    const seen = [];
    for (const l of S.log) {
      const note = (l.note || '').trim();
      if (note && !['Edited', 'Restocked'].includes(note) && !seen.includes(note)) {
        seen.push(note);
        if (seen.length >= 4) break;
      }
    }
    return seen;
  }

  function compressImage(file, cb) {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const maxDim = 320;
          const sc = Math.min(1, maxDim / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * sc);
          c.height = Math.round(img.height * sc);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          cb(c.toDataURL('image/jpeg', 0.8));
        } catch (_) { cb(r.result); }
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  }

  // ---------- Rendering ----------
  function applyTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = S.theme || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    const meta = $('#themeColorMeta');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c1117' : '#eef1f5');
    const btn = $('#themeBtn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? ICON.sun : ICON.moon;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function renderTeamBar() {
    const bar = $('#teamBar');
    if (!bar) return;
    bar.classList.toggle('hidden', view === 'tools');
    if (view === 'tools') return;

    const sw = $('#teamSwitchBtn');
    const roTeam = activeReadOnlyTeam();
    if (S.activeConex === 'all') {
      sw.innerHTML = `${ICON.conex}<span class="team-switch-name">All Conex</span><span class="conex-pill">${S.conexes.length} BOXES</span>${ICON.chevDown}`;
    } else if (S.activeConex.startsWith('team:')) {
      const tm = teamById(S.activeConex.slice(5));
      const cnt = conexesForTeam(tm.id).length;
      sw.innerHTML = `${roTeam ? ICON.lock : ICON.conex}<span class="team-switch-name">${esc(teamDisplayName(tm))}</span><span class="conex-pill">${cnt} CONEX</span>${ICON.chevDown}`;
    } else {
      const cx = conexById(S.activeConex);
      const tm = teamById(cx.teamId);
      sw.innerHTML = `${roTeam ? ICON.lock : ICON.conex}<span class="team-switch-name">${esc(teamDisplayName(tm))}</span><span class="conex-pill">${esc(cx.name)}</span>${ICON.chevDown}`;
    }

    const allBtn = $('#teamAllBtn');
    allBtn.classList.toggle('hidden', S.conexes.length <= 1);
    allBtn.classList.toggle('is-active', S.activeConex === 'all');
    allBtn.setAttribute('aria-pressed', String(S.activeConex === 'all'));

    const svBtn = $('#superViewBtn');
    if (svBtn) {
      const canSuperView = Boolean(Cloud.user && (Cloud.profile?.role === 'admin' || Cloud.profile?.role === 'supervisor'));
      svBtn.classList.toggle('hidden', !canSuperView);
    }
  }

  function readOnlyBannerHtml() {
    const roTeam = activeReadOnlyTeam();
    if (!roTeam) return '';
    return `
      <div class="readonly-banner">
        <div class="readonly-banner-left">
          ${ICON.lock}
          <span>View only · Owned by ${esc(teamDisplayName(roTeam))}</span>
        </div>
      </div>`;
  }

  function render() {
    applyTheme();
    document.querySelectorAll('[data-v]').forEach((b) => {
      const active = b.dataset.v === view;
      b.classList.toggle('is-active', active);
      if (active) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    ['stock', 'reorder', 'activity', 'tools'].forEach((v) => {
      $('#v-' + v).classList.toggle('hidden', v !== view);
    });
    $('#stockHead').classList.toggle('hidden', view !== 'stock');
    renderTeamBar();

    const scoped = scopedItems();
    const lows = lowItems(scoped);
    const n = lows.length;
    ['#roDot', '#roDotDesktop'].forEach((sel) => {
      const el = $(sel);
      if (el) {
        el.textContent = n;
        el.classList.toggle('hidden', !n);
      }
    });

    const ids = new Set(activeScopeConexIds());
    const scopeLogs = S.activeConex === 'all'
      ? S.log
      : S.log.filter((l) => ids.has(l.conexId) || ids.has(l.toConexId));

    const stockSub = n
      ? `${scoped.length} part${scoped.length === 1 ? '' : 's'} · ${n} need${n === 1 ? 's' : ''} reorder`
      : `${scoped.length} part${scoped.length === 1 ? '' : 's'} · All stocked`;

    const titles = {
      stock: ['Pipefitter Inventory', stockSub],
      reorder: ['Reorder List', n ? `${n} part${n === 1 ? '' : 's'} at or below minimum` : 'Everything above minimum'],
      activity: ['Activity Log', `${scopeLogs.length} recorded update${scopeLogs.length === 1 ? '' : 's'}`],
      tools: ['Tools & Settings', 'Teams, Conex boxes, photo library & security']
    };
    $('#pageTitle').textContent = titles[view][0];
    $('#pageSub').textContent = titles[view][1];

    ({ stock: renderStock, reorder: renderReorder, activity: renderActivity, tools: renderTools })[view]();
    lastPopId = null;
  }

  function renderStock() {
    const baseItems = scopedItems();
    const counts = {};
    baseItems.forEach((i) => { counts[i.category] = (counts[i.category] || 0) + 1; });
    const cats = ['All', ...S.cats];
    $('#pills').innerHTML = cats.map((c) => {
      const on = c === cat;
      const cnt = c === 'All' ? baseItems.length : (counts[c] || 0);
      return `<button type="button" class="cat-pill ${on ? 'is-active' : ''}" role="tab" aria-selected="${on}" data-cat="${esc(c)}">${esc(c)}<span class="cat-count">${cnt}</span></button>`;
    }).join('');

    const scope = cat === 'All' ? baseItems : baseItems.filter((i) => i.category === cat);
    const okCount = scope.filter((i) => statusOf(i) === 'ok').length;
    const lowCount = scope.filter((i) => statusOf(i) === 'low').length;
    const outCount = scope.filter((i) => statusOf(i) === 'out').length;

    $('#statusFilters').innerHTML = [
      ['all', 'All', scope.length, ''],
      ['ok', 'In stock', okCount, 'ok'],
      ['low', 'Low', lowCount, 'low'],
      ['out', 'Out', outCount, 'out']
    ].map(([k, lbl, num, dot]) => `
      <button type="button" class="status-chip ${statusFilter === k ? 'is-active' : ''}" data-st="${k}" aria-pressed="${statusFilter === k}">
        ${dot ? `<span class="st-dot ${dot}" aria-hidden="true"></span>` : ''}${lbl} <span class="st-num">${num}</span>
      </button>
    `).join('');

    const q = query.trim().toLowerCase();
    let items = scope.filter((i) => {
      if (statusFilter !== 'all' && statusOf(i) !== statusFilter) return false;
      if (!q) return true;
      const cx = conexById(i.conexId);
      const tm = cx ? teamById(cx.teamId) : null;
      return [i.name, i.size, i.material, i.type, i.bin, i.sku, i.category, i.notes, tm?.name, cx?.name]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });

    const sorters = {
      name: (a, b) => a.name.localeCompare(b.name),
      low: (a, b) => statusRank(a) - statusRank(b) || a.name.localeCompare(b.name),
      qty: (a, b) => a.qty - b.qty || a.name.localeCompare(b.name),
      bin: (a, b) => (a.bin || '~').localeCompare(b.bin || '~', undefined, { numeric: true }),
      recent: (a, b) => (b.updated || 0) - (a.updated || 0)
    };
    items.sort(sorters[S.sort] || sorters.name);

    $('#sortLabel').textContent = SORT_LABELS[S.sort] || 'Name';
    $('#qClear').classList.toggle('is-visible', Boolean(query));
    const lblEl = $('#listLabel');
    lblEl.textContent = q ? `${items.length} match${items.length === 1 ? '' : 'es'}` : `${items.length} shown`;
    lblEl.classList.toggle('is-filtered', Boolean(q));

    const banner = readOnlyBannerHtml();
    if (!items.length) {
      const hasAny = baseItems.length > 0;
      $('#list').innerHTML = `${banner ? `<div style="grid-column:1/-1">${banner}</div>` : ''}
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-icon">${ICON.box}</div>
          <h3>${hasAny ? 'No matching parts' : 'No parts in this Conex'}</h3>
          <p>${hasAny ? 'Try clearing your search or switching back to All categories and stock levels.' : 'Add your first gasket, stud bolt, plug, or valve to start tracking stock.'}</p>
          ${hasAny
            ? `<button type="button" class="btn btn-outline" id="clearFiltersBtn">Show all parts</button>`
            : (activeReadOnlyTeam() ? '' : `<button type="button" class="btn btn-primary" id="emptyAddBtn">${ICON.plus}Add first item</button>`)}
        </div>`;
      return;
    }

    $('#list').innerHTML = `${banner ? `<div style="grid-column:1/-1">${banner}</div>` : ''}${items.map(renderCard).join('')}`;
  }

  function renderCard(i) {
    const st = statusOf(i);
    const lbl = { ok: 'In stock', low: 'Low', out: 'Out' }[st];
    const pct = i.min > 0 ? Math.min(100, Math.round((i.qty / (i.min * 2)) * 100)) : (i.qty > 0 ? 100 : 0);
    const details = [i.material, i.type].filter(Boolean).join(' · ');
    const popCls = lastPopId === i.id ? 'is-pop' : '';
    const cx = conexById(i.conexId);
    const tm = cx ? teamById(cx.teamId) : null;
    const locked = !canEditConex(i.conexId);
    const showConex = (S.activeConex === 'all' || S.activeConex.startsWith('team:')) && cx;

    return `
      <article class="item-card ${locked ? 'is-locked' : ''}" data-id="${i.id}">
        <button type="button" class="item-card-top" data-edit="${i.id}" aria-label="${locked ? 'View' : 'Edit'} ${esc(i.name)}">
          <div class="part-thumb ${i.photo ? '' : 'is-empty'}">
            ${i.photo ? `<img src="${esc(i.photo)}" alt="${esc(i.name)}" loading="lazy" decoding="async" width="60" height="60" onerror="this.parentElement.classList.add('is-empty');this.remove()">` : ICON.box}
          </div>
          <div class="item-body">
            <div class="item-head">
              <h2 class="item-name">${esc(i.name)}</h2>
              <span class="status-pill ${st}">${lbl}</span>
            </div>
            ${(i.size || details) ? `
              <div class="spec-line">
                ${i.size ? `<span class="spec-size">${esc(i.size)}</span>` : ''}
                ${details ? `<span class="spec-detail">${esc(details)}</span>` : ''}
              </div>` : ''}
            <div class="loc-line">
              ${showConex ? `<span class="conex-tag">${esc(cx.name)}</span>` : ''}
              ${locked && S.activeConex === 'all' && tm ? `<span class="lock-pill">${esc(tm.name)} · View only</span>` : ''}
              ${i.bin ? `<span class="bin-tag">BIN ${esc(i.bin)}</span>` : ''}
              <span class="loc-item">${ICON.tag}${esc(i.category)}</span>
              ${i.min > 0 ? `<span class="loc-item">Min ${i.min}</span>` : ''}
            </div>
          </div>
        </button>

        <div class="stock-meter" aria-hidden="true">
          <span class="stock-meter-fill ${st}" style="width:${pct}%"></span>
        </div>

        <div class="stepper-wrap">
          <div class="stepper">
            <button type="button" class="step-btn is-minus" data-adj="-5" ${locked || i.qty <= 0 ? 'disabled' : ''} aria-label="Remove 5 ${esc(i.name)}">−5</button>
            <button type="button" class="step-btn is-minus" data-adj="-1" ${locked || i.qty <= 0 ? 'disabled' : ''} aria-label="Remove 1 ${esc(i.name)}">−1</button>
            <button type="button" class="qty-btn is-${st}" data-count="${i.id}" ${locked ? 'disabled' : ''} aria-label="${locked ? 'View-only quantity' : 'Adjust or transfer'} ${esc(i.name)}, currently ${i.qty} ${esc(i.unit || 'ea')}">
              <span class="qty-val ${popCls}">${i.qty}</span>
              <span class="qty-unit">${esc(i.unit || 'ea')}</span>
            </button>
            <button type="button" class="step-btn is-plus" data-adj="1" ${locked ? 'disabled' : ''} aria-label="Add 1 ${esc(i.name)}">+1</button>
            <button type="button" class="step-btn is-plus" data-adj="5" ${locked ? 'disabled' : ''} aria-label="Add 5 ${esc(i.name)}">+5</button>
          </div>
        </div>
      </article>`;
  }

  function renderReorder() {
    const items = lowItems();
    const banner = readOnlyBannerHtml();
    if (!items.length) {
      $('#v-reorder').innerHTML = `${banner}
        <div class="empty-state">
          <div class="empty-icon">${ICON.checkCircle}</div>
          <h3>All stocked up</h3>
          <p>Nothing in this view is at or below its reorder point. Set a Reorder at count on any part to track it automatically here.</p>
          <button type="button" class="btn btn-outline" data-v="stock">Back to Stock</button>
        </div>`;
      return;
    }

    const outCount = items.filter((i) => i.qty <= 0).length;
    const lowCount = items.length - outCount;
    const totalOrder = items.reduce((sum, i) => sum + needQty(i), 0);

    $('#v-reorder').innerHTML = `${banner}
      <div class="reorder-summary">
        <div class="reorder-kpis">
          <div class="reorder-kpi is-out"><b>${outCount}</b><span>Out of stock</span></div>
          <div class="reorder-kpi is-low"><b>${lowCount}</b><span>Low stock</span></div>
          <div class="reorder-kpi is-units"><b>${totalOrder}</b><span>Suggested units</span></div>
        </div>
        <div class="reorder-actions">
          <button type="button" class="btn btn-primary" id="roCopy">${ICON.copy}Copy list</button>
          <button type="button" class="btn btn-outline" id="roCsv">${ICON.dl}CSV</button>
          <button type="button" class="btn btn-outline" id="roShare">${ICON.share}Share</button>
        </div>
      </div>

      <div class="panel">
        ${items.map((i) => {
          const order = needQty(i);
          const isOut = i.qty <= 0;
          const cx = conexById(i.conexId);
          const locked = !canEditConex(i.conexId);
          return `
            <div class="reorder-card ${isOut ? 'is-out' : ''}">
              <div class="part-thumb ${i.photo ? '' : 'is-empty'}" style="width:52px;height:52px">
                ${i.photo ? `<img src="${esc(i.photo)}" alt="${esc(i.name)}" loading="lazy" width="46" height="46">` : ICON.box}
              </div>
              <button type="button" class="reorder-info" data-edit="${i.id}">
                <div class="item-name" style="font-size:var(--text-sm)">${esc(i.name)}</div>
                <div class="spec-line" style="margin-top:3px">
                  ${i.size ? `<span class="spec-size">${esc(i.size)}</span>` : ''}
                  ${(S.activeConex === 'all' || S.activeConex.startsWith('team:')) && cx ? `<span class="conex-tag">${esc(cx.name)}</span>` : ''}
                  ${i.bin ? `<span class="bin-tag">BIN ${esc(i.bin)}</span>` : ''}
                </div>
                <div class="loc-line" style="margin-top:4px">
                  <span>On hand <strong style="color:var(--color-text)">${i.qty}</strong> ${esc(i.unit || 'ea')}</span>
                  <span>Min ${i.min}</span>
                </div>
              </button>
              <div class="reorder-right">
                <span class="order-badge">Order ${order} ${esc(i.unit || 'ea')}</span>
                ${locked
                  ? `<span class="lock-pill">View only</span>`
                  : `<button type="button" class="receive-btn" data-receive="${i.id}" data-qty="${order}">${ICON.check}Receive +${order}</button>`}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderActivity() {
    const ids = new Set(activeScopeConexIds());
    const scoped = S.activeConex === 'all'
      ? S.log
      : S.log.filter((l) => ids.has(l.conexId) || ids.has(l.toConexId));

    const filterBar = `
      <div class="status-bar">
        <div class="status-filters" role="group" aria-label="Filter activity">
          ${[
            ['all', 'All'],
            ['out', 'Check-outs'],
            ['in', 'Check-ins'],
            ['xfer', 'Transfers'],
            ['set', 'Counts']
          ].map(([k, lbl]) => `
            <button type="button" class="status-chip ${actFilter === k ? 'is-active' : ''}" data-af="${k}" aria-pressed="${actFilter === k}">${lbl}</button>
          `).join('')}
        </div>
      </div>`;

    const entries = scoped.filter((l) => {
      if (actFilter === 'all') return true;
      if (actFilter === 'xfer') return l.kind === 'xfer' || l.kind === 'conex-xfer';
      if (actFilter === 'out') return !['set', 'xfer', 'conex-xfer'].includes(l.kind) && l.delta < 0;
      if (actFilter === 'in') return !['set', 'xfer', 'conex-xfer'].includes(l.kind) && l.delta > 0;
      return l.kind === 'set' || l.kind === 'add' || l.kind === 'del';
    });

    if (!entries.length) {
      $('#v-activity').innerHTML = `${scoped.length ? filterBar : ''}
        <div class="empty-state">
          <div class="empty-icon">${ICON.clock}</div>
          <h3>${scoped.length ? 'No matching activity' : 'No activity logged yet'}</h3>
          <p>${scoped.length ? 'Try switching the activity filter back to All.' : 'Every check-in, check-out, part transfer, whole-Conex transfer, and count edit appears here automatically.'}</p>
          ${scoped.length
            ? `<button type="button" class="btn btn-outline" data-af="all">Show all activity</button>`
            : `<button type="button" class="btn btn-outline" data-v="stock">Go to Stock</button>`}
        </div>`;
      return;
    }

    let html = filterBar;
    let day = '';
    entries.slice(0, 300).forEach((l) => {
      const d = fmtDay(l.t);
      if (d !== day) {
        if (day) html += '</div>';
        html += `<h2 class="day-label">${esc(d)}</h2><div class="panel">`;
        day = d;
      }
      const isXfer = l.kind === 'xfer' || l.kind === 'conex-xfer';
      const k = isXfer ? 'xfer' : (l.kind === 'set' ? 'set' : (l.delta >= 0 ? 'in' : 'out'));
      const sign = l.kind === 'conex-xfer' ? 'BOX'
        : l.kind === 'xfer' ? `⇄${Math.abs(l.delta)}`
        : l.kind === 'set' ? `=${l.to}`
        : (l.delta > 0 ? `+${l.delta}` : `${l.delta}`);
      const verb = l.kind === 'conex-xfer' ? 'Conex transferred'
        : l.kind === 'xfer' ? 'Transferred'
        : l.kind === 'set' ? 'Count set'
        : l.kind === 'add' ? 'Added'
        : l.kind === 'del' ? 'Removed'
        : (l.delta > 0 ? 'Checked in' : 'Checked out');
      const cx = l.conexId ? conexById(l.conexId) : null;
      const toCx = l.toConexId ? conexById(l.toConexId) : null;
      const routeTag = l.kind === 'xfer' && cx && toCx
        ? `<span class="act-note">${esc(cx.name)} → ${esc(toCx.name)}</span>`
        : (l.kind !== 'conex-xfer' && S.activeConex === 'all' && cx ? `<span class="act-note">${esc(cx.name)}</span>` : '');

      const byTag = l.by ? `<span class="act-note">by ${esc(l.by)}</span>` : '';

      html += `
        <div class="act-row">
          <div class="act-delta ${k}">${esc(sign)}</div>
          <div class="act-copy">
            <div class="act-title">${esc(l.name)}</div>
            <div class="act-sub">
              <span>${l.kind === 'conex-xfer' ? esc(l.note) : `${verb} · ${l.from} → ${l.to}`}</span>
              ${routeTag}
              ${byTag}
              ${l.kind !== 'conex-xfer' && l.note ? `<span class="act-note">${esc(l.note)}</span>` : ''}
            </div>
          </div>
          <span class="act-time">${esc(fmtTime(l.t))}</span>
        </div>`;
    });
    $('#v-activity').innerHTML = html + '</div>';
  }

  function renderTools() {
    const persisted = window._persisted;
    const hasSamples = S.items.some((i) => i.sample);
    const engineLabel = storageMode === 'idb' ? 'IndexedDB (on-device)'
      : storageMode === 'ls' ? 'Browser storage'
      : 'Session memory (preview mode)';
    const backupNote = S.lastBackup
      ? `Last backed up ${fmtDay(S.lastBackup)} at ${fmtTime(S.lastBackup)}`
      : 'Save a full JSON copy of all teams and Conex boxes';
    const myTm = myTeamObj();
    const libModified = DEFAULT_PHOTO_LIB.some((def) => {
      const curP = S.photoLib.find((p) => p.id === def.id);
      return !curP || curP.label !== def.label || curP.src !== def.src;
    });

    const roleLabel = Cloud.profile?.role === 'admin' ? 'Main Admin'
      : Cloud.profile?.role === 'supervisor' ? 'Supervisor' : 'Crew';
    const cloudTitle = !Cloud.configured
      ? 'Not connected (Local offline only)'
      : Cloud.user && Cloud.profile
        ? `${esc(Cloud.profile.displayName)} · ${roleLabel}`
        : 'Connected · Sign in required';
    const cloudDesc = !Cloud.configured
      ? 'Paste your free Firebase Spark config to enable logins & live sync'
      : Cloud.user && Cloud.profile
        ? `${Cloud.online ? 'Live sync active' : 'Offline — changes queued'} · ${Cloud.profile.role === 'admin' ? 'Full Yard' : Cloud.profile.role === 'supervisor' ? 'Own Teams Group' : esc(teamById(Cloud.profile.teamId)?.name || 'Unassigned')}`
        : 'Sign in with your username to sync inventory across devices';

    $('#v-tools').innerHTML = `
      <div class="tools-grid">
        <div class="panel">
          <h2 class="panel-title">Cloud Sync &amp; Accounts (Firebase Spark)</h2>
          <button type="button" class="list-item" id="cloudPrimaryBtn">
            <span class="li-icon">${ICON.shield}</span>
            <span class="li-text">
              <span class="li-label"><strong>${cloudTitle}</strong></span>
              <span class="li-desc">${cloudDesc}</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
          ${Cloud.user && (Cloud.profile?.role === 'admin' || Cloud.profile?.role === 'supervisor') ? `
            <button type="button" class="list-item" id="toolsSuperViewBtn">
              <span class="li-icon">${ICON.grid}</span>
              <span class="li-text">
                <span class="li-label">${Cloud.profile?.role === 'admin' ? 'Admin Super View' : 'Super View'}</span>
                <span class="li-desc">${Cloud.profile?.role === 'admin' ? 'Browse all crews and search materials across every Conex box' : 'Browse your crews and search materials across your Conex boxes'}</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          ${Cloud.user && (Cloud.profile?.role === 'admin' || Cloud.profile?.role === 'supervisor') ? `
            <button type="button" class="list-item" id="adminPanelBtn">
              <span class="li-icon">${ICON.lock}</span>
              <span class="li-text">
                <span class="li-label">${Cloud.profile.role === 'admin' ? 'Main Admin Panel · Supervisors, Teams &amp; Users' : 'Supervisor Panel · Create Crew &amp; Manage Group'}</span>
                <span class="li-desc">${Cloud.users.length} account${Cloud.users.length === 1 ? '' : 's'} in scope</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          ${Cloud.configured ? `
            <button type="button" class="list-item" id="cloudConfigBtn">
              <span class="li-icon">${ICON.firebase}</span>
              <span class="li-text">
                <span class="li-label">Firebase Spark Settings</span>
                <span class="li-desc">Update or disconnect your Firebase project config</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
        </div>

        <div class="panel">
          <h2 class="panel-title">Teams</h2>
          ${S.teams.length ? S.teams.map((tm) => {
            const boxes = conexesForTeam(tm.id);
            const boxIds = new Set(boxes.map((b) => b.id));
            const cnt = S.items.filter((i) => boxIds.has(i.conexId)).length;
            return `
              <button type="button" class="list-item" data-editteam="${esc(tm.id)}">
                <span class="li-icon">${ICON.shield}</span>
                <span class="li-text">
                  <span class="li-label">${esc(teamDisplayName(tm))} <span class="conex-pill" style="margin-left:6px">${boxes.length} CONEX</span></span>
                  <span class="li-desc">${cnt} part${cnt === 1 ? '' : 's'}${canManageYard() ? ' · Tap to edit or delete team' : ' · View only'}</span>
                </span>
                <span class="li-chev">${ICON.chev}</span>
              </button>`;
          }).join('') : '<div class="empty-note" style="padding:12px 16px">No teams yet.</div>'}
          ${canManageYard() ? `
            <button type="button" class="list-item" id="addTeamBtn">
              <span class="li-icon">${ICON.plus}</span>
              <span class="li-text">
                <span class="li-label">Add team</span>
                <span class="li-desc">Create a new crew (teams can hold 1 or multiple Conex boxes)</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
        </div>

        <div class="panel">
          <h2 class="panel-title">Conex Boxes</h2>
          ${S.conexes.length ? S.conexes.map((c) => {
            const tm = teamById(c.teamId);
            const cnt = S.items.filter((i) => i.conexId === c.id).length;
            const low = S.items.filter((i) => i.conexId === c.id && statusOf(i) !== 'ok').length;
            return `
              <button type="button" class="list-item" data-editconex="${esc(c.id)}">
                <span class="li-icon">${ICON.conex}</span>
                <span class="li-text">
                  <span class="li-label">${esc(c.name)} <span class="conex-pill" style="margin-left:6px">${esc(teamDisplayName(tm))}</span></span>
                  <span class="li-desc">${cnt} part${cnt === 1 ? '' : 's'}${low ? ` · ${low} low/out` : ''}${canManageYard() ? ' · Tap to edit, transfer, or delete' : ' · View only'}</span>
                </span>
                <span class="li-chev">${ICON.chev}</span>
              </button>`;
          }).join('') : '<div class="empty-note" style="padding:12px 16px">No Conex boxes yet.</div>'}
          ${canManageYard() ? `
            <button type="button" class="list-item" id="addConexBtn">
              <span class="li-icon">${ICON.plus}</span>
              <span class="li-text">
                <span class="li-label">Add Conex box</span>
                <span class="li-desc">Assign a new Conex to an existing or new team</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
        </div>

        <div class="panel">
          <h2 class="panel-title">Hardware Photo Library</h2>
          <div class="lib-grid">
            ${S.photoLib.map((p) => `
              <button type="button" class="lib-card" data-editlib="${esc(p.id)}" aria-label="Edit ${esc(p.label)} photo">
                <div class="lib-card-img">
                  <img src="${esc(p.src)}" alt="${esc(p.label)}" loading="lazy" width="54" height="54">
                </div>
                <span class="lib-card-label">${esc(p.label)}</span>
              </button>`).join('')}
          </div>
          <button type="button" class="list-item" id="addLibPhotoBtn">
            <span class="li-icon">${ICON.cam}</span>
            <span class="li-text">
              <span class="li-label">Add library photo</span>
              <span class="li-desc">Save custom part photos for one-tap reuse</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
          ${libModified ? `
            <button type="button" class="list-item" id="restoreLibBtn">
              <span class="li-icon">${ICON.reset}</span>
              <span class="li-text">
                <span class="li-label">Restore default photos</span>
                <span class="li-desc">Bring back the 9 built-in studio hardware photos</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
        </div>

        <div class="panel">
          <h2 class="panel-title">Categories</h2>
          <div class="chip-wrap">
            ${S.cats.map((c) => `
              <span class="cat-manage-chip">${esc(c)}
                <button type="button" data-delcat="${esc(c)}" aria-label="Remove ${esc(c)} category">✕</button>
              </span>`).join('')}
          </div>
          <button type="button" class="list-item" id="addCat">
            <span class="li-icon">${ICON.plus}</span>
            <span class="li-text">
              <span class="li-label">Add category</span>
              <span class="li-desc">Flanges, fittings, clamps, hangers, and more</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
        </div>

        <div class="panel">
          <h2 class="panel-title">Backup &amp; Export</h2>
          <button type="button" class="list-item" id="bk">
            <span class="li-icon">${ICON.dl}</span>
            <span class="li-text">
              <span class="li-label">Back up all teams (JSON)</span>
              <span class="li-desc">${esc(backupNote)}</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
          ${isMainAdmin() ? `
            <button type="button" class="list-item" id="rs">
              <span class="li-icon">${ICON.ul}</span>
              <span class="li-text">
                <span class="li-label">Restore from backup</span>
                <span class="li-desc">Load a previously saved JSON backup file</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          <button type="button" class="list-item" id="csv">
            <span class="li-icon">${ICON.grid}</span>
            <span class="li-text">
              <span class="li-label">Export full CSV</span>
              <span class="li-desc">Includes Team &amp; Conex columns for Excel or Sheets</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
        </div>

        <div class="panel">
          <h2 class="panel-title">${isMainAdmin() ? 'Device &amp; Reset' : 'Device &amp; Storage'}</h2>
          <div class="list-item">
            <span class="li-icon">${ICON.shield}</span>
            <span class="li-text">
              <span class="li-label">Offline storage</span>
              <span class="li-desc">${engineLabel} · ${persisted ? 'Protected' : 'Back up regularly'} · ${S.conexes.length} Conex · ${S.items.length} part${S.items.length === 1 ? '' : 's'}</span>
            </span>
          </div>
          ${hasSamples && isMainAdmin() ? `
            <button type="button" class="list-item" id="clrS">
              <span class="li-icon">${ICON.trash}</span>
              <span class="li-text">
                <span class="li-label">Clear sample items</span>
                <span class="li-desc">Removes starter parts while keeping everything you added</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          ${isMainAdmin() ? `
            <button type="button" class="list-item is-danger" id="rst">
              <span class="li-icon">${ICON.trash}</span>
              <span class="li-text">
                <span class="li-label">Reset everything</span>
                <span class="li-desc">Permanently delete all items and history</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
        </div>
      </div>`;
  }

  // ---------- Actions & Feedback ----------
  let undoState = null;
  let toastTimer = null;

  function toast(msg, undo) {
    $('#toastMsg').textContent = msg;
    $('#toastUndo').classList.toggle('hidden', !undo);
    undoState = undo || null;
    $('#toast').classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('#toast').classList.remove('is-open'); }, undo ? 4400 : 2800);
  }

  function logIt(i, kind, from, to, note, extra) {
    const cx = conexById(i.conexId);
    const entry = {
      t: Date.now(),
      ts: Date.now(),
      id: i.id,
      conexId: i.conexId,
      supervisorId: (cx && cx.supervisorId) || (Cloud.mySupervisorId ? Cloud.mySupervisorId() : '') || '',
      name: i.name,
      kind,
      delta: to - from,
      from,
      to,
      by: Cloud.profile ? (Cloud.profile.displayName || Cloud.profile.username || '') : '',
      note: note || '',
      ...(extra || {})
    };
    S.log.unshift(entry);
    if (S.log.length > 1000) S.log.length = 1000;
    if (Cloud.ready && Cloud.user) Cloud.pushLog(entry).catch(() => {});
  }

  function setQty(i, to, kind, note) {
    if (!canEditConex(i.conexId)) { toast('View only — unlock team to edit'); return; }
    to = Math.max(0, Math.round(to));
    const from = i.qty;
    if (to === from && kind !== 'set') return;
    const prevLog = S.log.length;
    const wasOk = statusOf(i) === 'ok';
    i.qty = to;
    i.updated = Date.now();
    lastPopId = i.id;
    logIt(i, kind || 'adj', from, to, note);
    save();
    render();
    if (navigator.vibrate) try { navigator.vibrate(8); } catch (_) {}

    const d = to - from;
    const crossedLow = wasOk && statusOf(i) !== 'ok' && to < from;
    const msg = kind === 'set'
      ? `${i.name}: set to ${to}`
      : crossedLow
        ? `${i.name} → ${to} (added to Reorder)`
        : `${d > 0 ? '+' : ''}${d} ${i.name} → ${to}`;

    toast(msg, () => {
      i.qty = from;
      S.log.splice(0, S.log.length - prevLog);
      save();
      render();
    });
  }

  function transferPartQty(srcItem, toConexId, amount, note) {
    if (!canEditConex(srcItem.conexId)) { toast('View only — unlock team to transfer'); return; }
    const qty = Math.min(srcItem.qty, Math.max(0, Math.round(amount)));
    if (qty <= 0) { toast('Enter a quantity greater than 0'); return; }
    const destCx = conexById(toConexId);
    if (!destCx || destCx.id === srcItem.conexId) return;

    const prevSrcQty = srcItem.qty;
    const prevLogLen = S.log.length;
    const matchKey = (x) => [x.name, x.size, x.material, x.category].map((s) => String(s || '').trim().toLowerCase()).join('|');
    const key = matchKey(srcItem);

    let destItem = S.items.find((x) => x.conexId === toConexId && matchKey(x) === key);
    let createdDest = false;
    let prevDestQty = destItem ? destItem.qty : 0;

    srcItem.qty = Math.max(0, srcItem.qty - qty);
    srcItem.updated = Date.now();

    if (destItem) {
      destItem.qty += qty;
      destItem.updated = Date.now();
    } else {
      destItem = { ...srcItem, id: uid(), conexId: toConexId, qty, updated: Date.now() };
      delete destItem.sample;
      S.items.push(destItem);
      createdDest = true;
    }

    lastPopId = srcItem.id;
    logIt(srcItem, 'xfer', prevSrcQty, srcItem.qty, note, { toConexId });
    save();
    render();
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (_) {}

    toast(`Transferred ${qty} ${srcItem.unit || 'ea'} to ${destCx.name}`, () => {
      srcItem.qty = prevSrcQty;
      if (createdDest) {
        const idx = S.items.findIndex((x) => x.id === destItem.id);
        if (idx >= 0) S.items.splice(idx, 1);
      } else {
        destItem.qty = prevDestQty;
      }
      S.log.splice(0, S.log.length - prevLogLen);
      save();
      render();
    });
  }

  // ---------- Modal / Bottom Sheet ----------
  function openSheet(title, body, foot) {
    clearTimeout(toastTimer);
    $('#toast').classList.remove('is-open');
    $('#shTitle').textContent = title;
    $('#shBody').innerHTML = body;
    $('#shFoot').innerHTML = foot || '';
    $('#shFoot').classList.toggle('hidden', !foot);
    $('#shBody').scrollTop = 0;
    $('#scrim').classList.add('is-open');
    $('#sheet').classList.add('is-open');
  }

  function closeSheet() {
    $('#scrim').classList.remove('is-open');
    $('#sheet').classList.remove('is-open');
  }

  $('#scrim').onclick = closeSheet;
  $('#shClose').onclick = closeSheet;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#sheet').classList.contains('is-open')) closeSheet();
  });

  // Unlock Other Team Sheet (requires Supervisor PIN if set)
  function openUnlockTeam(teamId) {
    const tm = teamById(teamId);
    openSheet(`Unlock ${tm.name}`, `
      <div class="callout is-warn">
        ${ICON.lock}
        <div>${tm.name}'s Conex boxes are view-only on this phone to prevent accidental edits. ${S.pin ? 'Enter the Supervisor PIN to unlock editing for this session.' : 'Confirm below to temporarily unlock editing for this session.'}</div>
      </div>
      ${S.pin ? `
        <div class="field" id="fg-upin">
          <label for="u-pin">Supervisor PIN</label>
          <input id="u-pin" type="password" inputmode="numeric" maxlength="8" placeholder="Enter PIN" autocomplete="off">
          <div class="field-error">Incorrect PIN.</div>
        </div>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="u-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="u-ok">Unlock ${esc(tm.name)}</button>`);

    $('#u-cancel').onclick = closeSheet;
    $('#u-ok').onclick = () => {
      if (S.pin) {
        if ($('#u-pin').value.trim() !== S.pin) {
          $('#fg-upin').classList.add('has-error');
          $('#u-pin').focus();
          return;
        }
      }
      unlockedTeams.add(tm.id);
      closeSheet();
      render();
      toast(`${tm.name} unlocked for this session`);
    };
    if (S.pin) {
      $('#u-pin').oninput = () => $('#fg-upin').classList.remove('has-error');
      setTimeout(() => $('#u-pin')?.focus(), 220);
    }
  }

  // Set My Team Sheet
  function openSetMyTeam() {
    openSheet('My Team on this phone', `
      <div class="field-hint" style="margin-bottom:var(--space-3)">Choose which team uses this device. Your team's Conex boxes are always editable; other teams' Conex boxes stay view-only.</div>
      <div>
        ${S.teams.map((t) => {
          const cxList = conexesForTeam(t.id).map((c) => c.name).join(', ') || 'No Conex assigned';
          const active = S.myTeamId === t.id;
          return `
            <button type="button" class="team-option ${active ? 'is-active' : ''}" data-pick-myteam="${esc(t.id)}">
              <div class="team-option-copy">
                <div class="team-option-title"><span>${esc(t.name)}</span></div>
                <div class="team-option-meta">${esc(cxList)}</div>
              </div>
              ${active ? ICON.check : ''}
            </button>`;
        }).join('')}
      </div>
    `, '');

    document.querySelectorAll('[data-pick-myteam]').forEach((b) => {
      b.onclick = () => {
        S.myTeamId = b.dataset.pickMyteam;
        unlockedTeams.clear();
        const mine = conexesForTeam(S.myTeamId);
        if (mine.length) S.activeConex = mine[0].id;
        save();
        closeSheet();
        render();
        toast(`Device assigned to ${myTeamObj().name}`);
      };
    });
  }

  // Set / Change Supervisor PIN Sheet
  function openSetPin() {
    openSheet(S.pin ? 'Change Supervisor PIN' : 'Set Supervisor PIN', `
      <div class="field-hint" style="margin-bottom:var(--space-3)">A 4-digit PIN prevents other crews from unlocking another team's Conex box or transferring a Conex box on this phone.</div>
      ${S.pin ? `
        <div class="field" id="fg-curpin">
          <label for="p-cur">Current PIN</label>
          <input id="p-cur" type="password" inputmode="numeric" maxlength="8" placeholder="Current PIN" autocomplete="off">
          <div class="field-error">Current PIN does not match.</div>
        </div>` : ''}
      <div class="field" id="fg-newpin">
        <label for="p-new">New 4-digit PIN</label>
        <input id="p-new" type="password" inputmode="numeric" maxlength="8" placeholder="e.g. 1234" autocomplete="off">
        <div class="field-error">Enter at least 4 digits.</div>
      </div>
      ${S.pin ? `
        <button type="button" class="btn btn-danger" style="width:100%" id="p-clear">Remove PIN</button>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="p-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="p-save">Save PIN</button>`);

    $('#p-cancel').onclick = closeSheet;
    $('#p-new').oninput = () => $('#fg-newpin').classList.remove('has-error');
    if ($('#p-cur')) $('#p-cur').oninput = () => $('#fg-curpin').classList.remove('has-error');

    $('#p-save').onclick = () => {
      if (S.pin && $('#p-cur').value.trim() !== S.pin) {
        $('#fg-curpin').classList.add('has-error');
        $('#p-cur').focus();
        return;
      }
      const next = $('#p-new').value.trim();
      if (next.length < 4) {
        $('#fg-newpin').classList.add('has-error');
        $('#p-new').focus();
        return;
      }
      S.pin = next;
      save();
      closeSheet();
      render();
      toast('Supervisor PIN saved');
    };

    if ($('#p-clear')) {
      $('#p-clear').onclick = () => {
        if ($('#p-cur').value.trim() !== S.pin) {
          $('#fg-curpin').classList.add('has-error');
          $('#p-cur').focus();
          return;
        }
        S.pin = '';
        save();
        closeSheet();
        render();
        toast('Supervisor PIN removed');
      };
    }
  }

  // Switch Team / Conex Sheet (groups Conex boxes by Team; supports 2+ Conex per Team!)
  function openConexSwitcher() {
    const totalLow = lowItems(S.items).length;
    let body = '<div>';

    S.teams.forEach((t) => {
      const boxes = conexesForTeam(t.id);
      const isMine = t.id === S.myTeamId;
      const isUnlocked = unlockedTeams.has(t.id);
      body += `<div class="section-div" style="margin-top:var(--space-2)">${esc(teamDisplayName(t))}${isMine ? ' (My Team)' : (isUnlocked ? ' (Unlocked)' : ' · View only')}</div>`;

      if (boxes.length > 1) {
        const teamItemCnt = S.items.filter((i) => boxes.some((b) => b.id === i.conexId)).length;
        const active = S.activeConex === `team:${t.id}`;
        body += `
          <button type="button" class="team-option ${active ? 'is-active' : ''}" data-pick-conex="team:${esc(t.id)}">
            <div class="team-option-copy">
              <div class="team-option-title"><span>All ${esc(teamDisplayName(t))}</span><span class="conex-pill">${boxes.length} CONEX</span></div>
              <div class="team-option-meta">${teamItemCnt} parts across ${boxes.map((b) => b.name).join(' & ')}</div>
            </div>
            ${active ? ICON.check : ''}
          </button>`;
      }

      boxes.forEach((c) => {
        const items = S.items.filter((i) => i.conexId === c.id);
        const lows = items.filter((i) => statusOf(i) !== 'ok').length;
        const active = S.activeConex === c.id;
        body += `
          <button type="button" class="team-option ${active ? 'is-active' : ''}" data-pick-conex="${esc(c.id)}">
            <div class="team-option-copy">
              <div class="team-option-title">
                <span>${esc(c.name)}</span>
                ${!isMine && !isUnlocked ? `<span class="lock-pill">View only</span>` : ''}
              </div>
              <div class="team-option-meta">${items.length} part${items.length === 1 ? '' : 's'}${lows ? ` · ${lows} low/out` : ' · All stocked'}</div>
            </div>
            ${active ? ICON.check : ''}
          </button>`;
      });

      if (!boxes.length) {
        body += `<div class="field-hint" style="padding:4px 12px 8px">No Conex assigned to ${esc(t.name)}</div>`;
      }
    });

    if (S.conexes.length > 1) {
      body += `<div class="section-div">Yard Overview</div>
        <button type="button" class="team-option ${S.activeConex === 'all' ? 'is-active' : ''}" data-pick-conex="all">
          <div class="team-option-copy">
            <div class="team-option-title"><span>All Conex Boxes</span><span class="conex-pill">${S.conexes.length} BOXES</span></div>
            <div class="team-option-meta">${S.items.length} total parts${totalLow ? ` · ${totalLow} low/out` : ''}</div>
          </div>
          ${S.activeConex === 'all' ? ICON.check : ''}
        </button>`;
    }
    body += '</div>';

    openSheet('Switch Team / Conex', body,
      `<button type="button" class="btn btn-outline" style="flex:1" id="swTransferConex">${ICON.xfer}Transfer Conex</button>`);

    document.querySelectorAll('[data-pick-conex]').forEach((b) => {
      b.onclick = () => {
        S.activeConex = b.dataset.pickConex;
        cat = 'All';
        statusFilter = 'all';
        save();
        closeSheet();
        render();
      };
    });
    $('#swTransferConex').onclick = () => openWholeConexTransfer(null);
  }

  // Whole-Conex Transfer Sheet (reassign an entire Conex box + all its inventory to another team!)
  function openWholeConexTransfer(preselectConexId) {
    if (S.teams.length < 2) {
      toast('Add a second team in Tools first');
      return;
    }
    const cxId = preselectConexId || (S.activeConex !== 'all' && !S.activeConex.startsWith('team:') ? S.activeConex : S.conexes[0].id);
    const curCx = conexById(cxId);

    openSheet('Transfer Conex to another team', `
      <div class="callout is-warn">
        ${ICON.xfer}
        <div>Reassign an entire Conex box and all of its inventory to another team. Teams can hold one or multiple Conex boxes.</div>
      </div>

      <div class="field">
        <label for="tc-conex">Conex box to transfer</label>
        <select id="tc-conex">${S.conexes.map((c) => {
          const tm = teamById(c.teamId);
          const cnt = S.items.filter((i) => i.conexId === c.id).length;
          return `<option value="${esc(c.id)}" ${c.id === curCx.id ? 'selected' : ''}>${esc(c.name)} (Currently ${esc(tm.name)} · ${cnt} parts)</option>`;
        }).join('')}</select>
      </div>

      <div class="field" id="fg-tcdest">
        <label for="tc-dest">Transfer ownership to team</label>
        <select id="tc-dest"></select>
        <div class="field-error">Choose a different destination team.</div>
      </div>

      ${S.pin ? `
        <div class="field" id="fg-tcpin">
          <label for="tc-pin">Supervisor PIN</label>
          <input id="tc-pin" type="password" inputmode="numeric" maxlength="8" placeholder="Enter PIN" autocomplete="off">
          <div class="field-error">Incorrect PIN.</div>
        </div>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="tc-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="tc-ok">Transfer Conex</button>`);

    const syncDest = () => {
      const selectedCx = conexById($('#tc-conex').value);
      const others = S.teams.filter((t) => t.id !== selectedCx.teamId);
      $('#tc-dest').innerHTML = others.map((t) => {
        const cnt = conexesForTeam(t.id).length;
        return `<option value="${esc(t.id)}">${esc(t.name)} (currently ${cnt} Conex)</option>`;
      }).join('');
      $('#tc-ok').textContent = others.length ? `Transfer ${selectedCx.name} to ${others[0].name}` : 'Transfer Conex';
    };

    $('#tc-conex').onchange = syncDest;
    $('#tc-dest').onchange = () => {
      const selectedCx = conexById($('#tc-conex').value);
      const destTm = teamById($('#tc-dest').value);
      $('#tc-ok').textContent = `Transfer ${selectedCx.name} to ${destTm.name}`;
    };
    syncDest();

    if ($('#tc-pin')) $('#tc-pin').oninput = () => $('#fg-tcpin').classList.remove('has-error');
    $('#tc-cancel').onclick = closeSheet;
    $('#tc-ok').onclick = () => {
      if (S.pin && $('#tc-pin').value.trim() !== S.pin) {
        $('#fg-tcpin').classList.add('has-error');
        $('#tc-pin').focus();
        return;
      }
      const cx = conexById($('#tc-conex').value);
      const fromTm = teamById(cx.teamId);
      const toTm = teamById($('#tc-dest').value);
      if (!toTm || toTm.id === fromTm.id) return;

      cx.teamId = toTm.id;
      if (toTm.supervisorId !== undefined) cx.supervisorId = toTm.supervisorId;
      if (Cloud.ready && Cloud.user) Cloud.pushConex(cx).catch(() => {});
      const partCount = S.items.filter((i) => i.conexId === cx.id).length;
      const xferEntry = {
        t: Date.now(),
        ts: Date.now(),
        id: cx.id,
        conexId: cx.id,
        supervisorId: cx.supervisorId || (Cloud.mySupervisorId ? Cloud.mySupervisorId() : '') || '',
        name: cx.name,
        kind: 'conex-xfer',
        delta: 0,
        from: 0,
        to: partCount,
        by: Cloud.profile ? (Cloud.profile.displayName || Cloud.profile.username || '') : '',
        note: `${teamDisplayName(fromTm)} → ${teamDisplayName(toTm)} (${partCount} parts)`
      };
      S.log.unshift(xferEntry);
      if (Cloud.ready && Cloud.user) Cloud.pushLog(xferEntry).catch(() => {});
      save();
      closeSheet();
      render();
      toast(`${cx.name} transferred to ${toTm.name}`);
    };
  }

  // Add / Edit Conex Box Sheet
  function openConexEditor(conexId) {
    if (!canManageYard()) {
      toast('Only Supervisors and Main Admin can manage Conex boxes');
      return;
    }
    const existing = conexId ? conexById(conexId) : null;
    const nextNum = S.conexes.length + 1;
    const partCount = existing ? S.items.filter((i) => i.conexId === existing.id).length : 0;

    openSheet(existing ? `Manage ${existing.name}` : 'Add Conex box', `
      <div class="field" id="fg-cname">
        <label for="cx-name">Conex box name / number</label>
        <input id="cx-name" value="${esc(existing ? existing.name : `Conex ${nextNum}`)}" placeholder="e.g. Conex ${nextNum}" autocomplete="off">
        <div class="field-error">Enter a Conex name.</div>
      </div>
      <div class="field">
        <label for="cx-team">Assigned team</label>
        <select id="cx-team">${S.teams.map((t) => `<option value="${esc(t.id)}" ${(existing ? existing.teamId : S.myTeamId) === t.id ? 'selected' : ''}>${esc(teamDisplayName(t))}</option>`).join('')}</select>
      </div>
      ${existing && S.teams.length > 1 ? `
        <button type="button" class="btn btn-outline" style="width:100%;margin-bottom:var(--space-2)" id="cx-xfer">${ICON.xfer}Transfer ${esc(existing.name)} to another team</button>` : ''}
      ${existing ? `
        <button type="button" class="btn btn-danger" style="width:100%" id="cx-del">${ICON.trash}Delete Conex box</button>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="cx-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="cx-save">${existing ? 'Save Conex' : 'Add Conex'}</button>`);

    $('#cx-name').oninput = () => $('#fg-cname').classList.remove('has-error');
    $('#cx-cancel').onclick = closeSheet;
    $('#cx-save').onclick = async () => {
      const name = $('#cx-name').value.trim();
      const teamId = $('#cx-team').value;
      if (!name) { $('#fg-cname').classList.add('has-error'); $('#cx-name').focus(); return; }
      const assignedTeam = teamById(teamId);
      const supId = Cloud.profile?.role === 'supervisor'
        ? Cloud.user.uid
        : (assignedTeam?.supervisorId || existing?.supervisorId || '');
      if (existing) {
        existing.name = name;
        existing.teamId = teamId;
        existing.supervisorId = supId;
        if (Cloud.ready && Cloud.user) {
          try { await Cloud.pushConex(existing); } catch (err) { toast(err?.message || 'Could not sync Conex'); }
        }
        toast(`Saved ${name}`);
      } else {
        const nc = { id: 'conex-' + uid(), name, teamId, supervisorId: supId };
        S.conexes.push(nc);
        S.activeConex = nc.id;
        if (Cloud.ready && Cloud.user) {
          try { await Cloud.pushConex(nc); } catch (err) { toast(err?.message || 'Could not sync Conex'); }
        }
        toast(`Added ${name}`);
      }
      save();
      closeSheet();
      render();
    };
    if ($('#cx-xfer')) $('#cx-xfer').onclick = () => openWholeConexTransfer(existing.id);
    if ($('#cx-del')) {
      $('#cx-del').onclick = () => {
        if (!canManageYard()) {
          toast('Only Supervisors and Main Admin can delete a Conex box');
          return;
        }
        openSheet(`Delete ${existing.name}?`, `
          <div class="info-callout">
            <span>${partCount
              ? `<strong>${esc(existing.name)}</strong> contains <strong>${partCount} part${partCount === 1 ? '' : 's'}</strong>. Deleting this Conex box will permanently remove the box and its parts from the yard.`
              : `Permanently delete <strong>${esc(existing.name)}</strong> from the yard? This cannot be undone.`}</span>
          </div>
        `,
        `<button type="button" class="btn" style="flex:1" id="dcx-cancel">Cancel</button>
         <button type="button" class="btn btn-danger" style="flex:2" id="dcx-ok">Delete Conex box</button>`);
        $('#dcx-cancel').onclick = () => openConexEditor(existing.id);
        $('#dcx-ok').onclick = async () => {
          const toDeleteItems = S.items.filter((i) => i.conexId === existing.id);
          try {
            if (Cloud.ready && Cloud.user) {
              for (const it of toDeleteItems) {
                await Cloud.deleteItem(it.id).catch(() => {});
              }
              await Cloud.deleteConex(existing.id);
            }
            S.items = S.items.filter((i) => i.conexId !== existing.id);
            S.conexes = S.conexes.filter((c) => c.id !== existing.id);
            if (S.activeConex === existing.id) S.activeConex = S.conexes[0]?.id || 'all';
            save();
            closeSheet();
            render();
            toast(`Deleted ${existing.name}`);
          } catch (err) {
            toast(err?.message || 'Could not delete Conex box');
          }
        };
      };
    }
  }

  // Edit / Delete Team Sheet
  function openTeamEditor(teamId) {
    if (!canManageYard()) {
      toast('Only Supervisors and Main Admin can manage teams');
      return;
    }
    const existing = S.teams.find((t) => t.id === teamId);
    if (!existing) return;
    const boxes = conexesForTeam(existing.id);
    const boxIds = new Set(boxes.map((b) => b.id));
    const partCount = S.items.filter((i) => boxIds.has(i.conexId)).length;

    openSheet(`Manage ${teamDisplayName(existing)}`, `
      <div class="field" id="fg-etname">
        <label for="et-name">Team / Crew name</label>
        <input id="et-name" value="${esc(existing.name)}" placeholder="e.g. Turnaround, Fab Shop" autocomplete="off">
        <div class="field-error">Enter a team name.</div>
      </div>
      <div class="info-callout" style="margin-bottom:var(--space-3)">
        <span>Assigned <strong>${boxes.length} Conex box${boxes.length === 1 ? '' : 'es'}</strong> · <strong>${partCount} part${partCount === 1 ? '' : 's'}</strong>.</span>
      </div>
      <button type="button" class="btn btn-danger" style="width:100%" id="tm-del">${ICON.trash}Delete team</button>
    `,
    `<button type="button" class="btn" style="flex:1" id="et-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="et-save">Save team</button>`);

    $('#et-name').oninput = () => $('#fg-etname').classList.remove('has-error');
    $('#et-cancel').onclick = closeSheet;
    $('#et-save').onclick = async () => {
      const name = $('#et-name').value.trim();
      if (!name) { $('#fg-etname').classList.add('has-error'); $('#et-name').focus(); return; }
      existing.name = name;
      if (Cloud.ready && Cloud.user) {
        try { await Cloud.pushTeam(existing); } catch (err) { toast(err?.message || 'Could not sync team'); }
      }
      save();
      closeSheet();
      render();
      toast(`Saved ${name}`);
    };
    $('#tm-del').onclick = () => {
      const label = teamDisplayName(existing);
      openSheet(`Delete ${label}?`, `
        <div class="info-callout">
          <span>${boxes.length
            ? `<strong>${esc(label)}</strong> currently holds <strong>${boxes.length} Conex box${boxes.length === 1 ? '' : 'es'}</strong> and <strong>${partCount} part${partCount === 1 ? '' : 's'}</strong>. Deleting this team will also permanently delete its Conex boxes and parts.`
            : `Permanently delete <strong>${esc(label)}</strong>? This cannot be undone.`}</span>
        </div>
      `,
      `<button type="button" class="btn" style="flex:1" id="dtm-cancel">Cancel</button>
       <button type="button" class="btn btn-danger" style="flex:2" id="dtm-ok">Delete team</button>`);
      $('#dtm-cancel').onclick = () => openTeamEditor(existing.id);
      $('#dtm-ok').onclick = async () => {
        const toDeleteItems = S.items.filter((i) => boxIds.has(i.conexId));
        try {
          if (Cloud.ready && Cloud.user) {
            for (const it of toDeleteItems) {
              await Cloud.deleteItem(it.id).catch(() => {});
            }
            for (const cx of boxes) {
              await Cloud.deleteConex(cx.id).catch(() => {});
            }
            await Cloud.deleteTeam(existing.id);
          }
          S.items = S.items.filter((i) => !boxIds.has(i.conexId));
          S.conexes = S.conexes.filter((c) => c.teamId !== existing.id);
          S.teams = S.teams.filter((t) => t.id !== existing.id);
          if (S.myTeamId === existing.id) S.myTeamId = S.teams[0]?.id || '';
          if (boxIds.has(S.activeConex) || S.activeConex === 'team:' + existing.id) {
            S.activeConex = S.conexes[0]?.id || 'all';
          }
          save();
          closeSheet();
          render();
          toast(`Deleted ${label}`);
        } catch (err) {
          toast(err?.message || 'Could not delete team');
        }
      };
    };
  }

  // Add Team Sheet
  function openAddTeam() {
    if (!canManageYard()) {
      toast('Only Supervisors and Main Admin can add teams');
      return;
    }
    const nextLetter = String.fromCharCode(65 + S.teams.length);
    openSheet('Add team', `
      <div class="field" id="fg-tname">
        <label for="t-name">Team / Crew name</label>
        <input id="t-name" placeholder="e.g. Crew ${nextLetter}, Turnaround, Fab Shop" autocomplete="off">
        <div class="field-error">Enter a team name.</div>
      </div>
      <div class="field">
        <label for="t-conex">Assign a new Conex box (optional)</label>
        <input id="t-conex" value="Conex ${S.conexes.length + 1}" placeholder="Leave blank for no Conex yet" autocomplete="off">
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="t-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="t-save">Add team</button>`);

    $('#t-name').oninput = () => $('#fg-tname').classList.remove('has-error');
    $('#t-cancel').onclick = closeSheet;
    $('#t-save').onclick = async () => {
      const name = $('#t-name').value.trim();
      const conexName = $('#t-conex').value.trim();
      if (!name) { $('#fg-tname').classList.add('has-error'); $('#t-name').focus(); return; }
      const supId = Cloud.profile?.role === 'supervisor' ? Cloud.user.uid : '';
      const nt = { id: 'team-' + uid(), name, supervisorId: supId };
      S.teams.push(nt);
      if (Cloud.ready && Cloud.user) {
        try { await Cloud.pushTeam(nt); } catch (err) { toast(err?.message || 'Could not sync team'); }
      }
      if (conexName) {
        const nc = { id: 'conex-' + uid(), name: conexName, teamId: nt.id, supervisorId: supId };
        S.conexes.push(nc);
        if (Cloud.ready && Cloud.user) {
          try { await Cloud.pushConex(nc); } catch (err) { toast(err?.message || 'Could not sync Conex'); }
        }
      }
      save();
      closeSheet();
      render();
      toast(`Added ${name}`);
    };
    setTimeout(() => $('#t-name')?.focus(), 250);
  }

  // Edit / Add Hardware Photo Library Item Sheet
  let libEditId = null;
  let libEditSrc = '';

  function updateLibPhotoPreview() {
    const thumb = $('#lp-thumb');
    if (!thumb) return;
    thumb.classList.toggle('is-empty', !libEditSrc);
    thumb.innerHTML = libEditSrc ? `<img src="${esc(libEditSrc)}" alt="Library photo preview">` : ICON.cam;
    const btn = $('#lp-upload');
    if (btn) btn.textContent = libEditSrc ? 'Replace photo' : 'Upload / Camera';
    $('#fg-lpsrc')?.classList.remove('has-error');
  }

  function openLibPhotoEditor(photoId) {
    const existing = photoId ? S.photoLib.find((p) => p.id === photoId) : null;
    libEditId = existing ? existing.id : null;
    libEditSrc = existing ? existing.src : '';

    openSheet(existing ? 'Edit library photo' : 'Add library photo', `
      <div class="field" id="fg-lpsrc">
        <label>Hardware image</label>
        <div class="photo-editor">
          <div class="part-thumb ${libEditSrc ? '' : 'is-empty'}" id="lp-thumb" style="width:72px;height:72px">
            ${libEditSrc ? `<img src="${esc(libEditSrc)}" alt="Library photo preview">` : ICON.cam}
          </div>
          <div class="btn-row">
            <button type="button" class="btn btn-outline btn-sm" id="lp-upload">${libEditSrc ? 'Replace photo' : 'Upload / Camera'}</button>
          </div>
        </div>
        <div class="field-error">Choose or take a photo first.</div>
      </div>

      <div class="field" id="fg-lplabel">
        <label for="lp-label">Short label</label>
        <input id="lp-label" value="${esc(existing ? existing.label : '')}" placeholder="e.g. Gate Valve, Blind Flange, B7 Bolt" maxlength="20" autocomplete="off">
        <div class="field-error">Enter a short label for this photo.</div>
      </div>

      ${existing ? `
        <div class="btn-row" id="lpDelRow" style="margin-top:var(--space-2)">
          <button type="button" class="btn btn-danger" style="flex:1" id="lp-del">${ICON.trash}Remove from library</button>
        </div>
        <div class="inline-confirm hidden" id="lpDelConfirm">
          <span>Remove "${esc(existing.label)}"?</span>
          <div class="btn-row">
            <button type="button" class="btn btn-sm btn-outline" id="lp-del-no">Cancel</button>
            <button type="button" class="btn btn-sm btn-danger-solid" id="lp-del-yes">Remove</button>
          </div>
        </div>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="lp-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="lp-save">${existing ? 'Save photo' : 'Add to library'}</button>`);

    $('#lp-upload').onclick = () => $('#libPhotoIn').click();
    $('#lp-label').oninput = () => $('#fg-lplabel').classList.remove('has-error');
    $('#lp-cancel').onclick = closeSheet;
    $('#lp-save').onclick = () => {
      const label = $('#lp-label').value.trim();
      if (!libEditSrc) { $('#fg-lpsrc').classList.add('has-error'); return; }
      if (!label) { $('#fg-lplabel').classList.add('has-error'); $('#lp-label').focus(); return; }

      if (existing) {
        const oldSrc = existing.src;
        existing.label = label;
        existing.src = libEditSrc;
        if (oldSrc !== libEditSrc) {
          S.items.forEach((it) => { if (it.photo === oldSrc) it.photo = libEditSrc; });
        }
        toast(`Updated "${label}" photo`);
      } else {
        S.photoLib.push({ id: 'lib-' + uid(), label, src: libEditSrc, builtin: false });
        toast(`Added "${label}" to photo library`);
      }
      save();
      closeSheet();
      render();
    };

    if (existing) {
      $('#lp-del').onclick = () => { $('#lpDelRow').classList.add('hidden'); $('#lpDelConfirm').classList.remove('hidden'); };
      $('#lp-del-no').onclick = () => { $('#lpDelConfirm').classList.add('hidden'); $('#lpDelRow').classList.remove('hidden'); };
      $('#lp-del-yes').onclick = () => {
        S.photoLib = S.photoLib.filter((p) => p.id !== existing.id);
        save();
        closeSheet();
        render();
        toast(`Removed "${existing.label}" from library`);
      };
    }
  }

  $('#libPhotoIn').onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    compressImage(f, (dataUrl) => { libEditSrc = dataUrl; updateLibPhotoPreview(); });
    e.target.value = '';
  };

  function openRestoreDefaultPhotos() {
    openSheet('Restore default photos', `
      <div class="callout is-warn">
        ${ICON.alert}
        <div>Restore the 9 built-in studio hardware photos to their defaults? Any custom photos you added will stay in your library.</div>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="rl-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="rl-ok">Restore defaults</button>`);

    $('#rl-cancel').onclick = closeSheet;
    $('#rl-ok').onclick = () => {
      const custom = S.photoLib.filter((p) => !p.builtin && !DEFAULT_PHOTO_LIB.some((d) => d.id === p.id));
      S.photoLib = [...DEFAULT_PHOTO_LIB.map((p) => ({ ...p })), ...custom];
      save();
      closeSheet();
      render();
      toast('Default hardware photos restored');
    };
  }

  // Sort Sheet
  function openSortSheet() {
    openSheet('Sort inventory', `
      <div role="radiogroup" aria-label="Sort order">
        ${SORT_OPTIONS.map(([val, label]) => `
          <button type="button" class="sort-option ${S.sort === val ? 'is-active' : ''}" data-pick-sort="${val}" role="radio" aria-checked="${S.sort === val}">
            <span>${label}</span>
            ${S.sort === val ? ICON.check : ''}
          </button>`).join('')}
      </div>`, '');
    document.querySelectorAll('[data-pick-sort]').forEach((b) => {
      b.onclick = () => { S.sort = b.dataset.pickSort; save(); closeSheet(); renderStock(); };
    });
  }

  // Add / Edit Item Sheet (or View-Only Part Sheet if locked!)
  let editing = null;
  let editPhoto = '';

  function updatePhotoPreview() {
    const thumb = $('#f-thumb');
    if (!thumb) return;
    thumb.classList.toggle('is-empty', !editPhoto);
    thumb.innerHTML = editPhoto ? `<img src="${esc(editPhoto)}" alt="Selected part photo">` : ICON.cam;
    const btn = $('#f-photo');
    if (btn) btn.textContent = editPhoto ? 'Upload photo' : 'Upload / Camera';
    const rem = $('#f-nophoto');
    if (rem) rem.classList.toggle('hidden', !editPhoto);
    document.querySelectorAll('.lib-thumb').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.libSrc === editPhoto);
    });
  }

  function openEdit(id, dupFrom) {
    const src = id ? S.items.find((x) => x.id === id) : dupFrom;
    if (id && src && !canEditConex(src.conexId)) {
      const cx = conexById(src.conexId);
      const tm = teamById(cx.teamId);
      openSheet('Part details (View only)', `
        <div class="callout is-warn">
          ${ICON.lock}
          <div>This item is in <strong>${esc(cx.name)} (${esc(tm.name)})</strong> and is view-only on this phone.</div>
        </div>
        <div class="count-header">
          <div class="part-thumb ${src.photo ? '' : 'is-empty'}" style="width:60px;height:60px">
            ${src.photo ? `<img src="${esc(src.photo)}" alt="${esc(src.name)}">` : ICON.box}
          </div>
          <div>
            <div class="item-name">${esc(src.name)}</div>
            <div class="spec-line" style="margin-top:4px">
              ${src.size ? `<span class="spec-size">${esc(src.size)}</span>` : ''}
              <span class="spec-detail">${esc([src.material, src.type].filter(Boolean).join(' · '))}</span>
            </div>
            <div class="loc-line" style="margin-top:4px">
              <span class="conex-tag">${esc(cx.name)}</span>
              ${src.bin ? `<span class="bin-tag">BIN ${esc(src.bin)}</span>` : ''}
              <span>On hand: <strong style="color:var(--color-text)">${src.qty} ${esc(src.unit || 'ea')}</strong></span>
            </div>
          </div>
        </div>
        ${src.notes ? `<div class="field-hint">${esc(src.notes)}</div>` : ''}
      `,
      `<button type="button" class="btn" style="flex:1" id="ro-close">Close</button>
       <button type="button" class="btn btn-primary" style="flex:1" id="ro-unlock">Unlock ${esc(tm.name)}</button>`);
      $('#ro-close').onclick = closeSheet;
      $('#ro-unlock').onclick = () => openUnlockTeam(tm.id);
      return;
    }

    const allowed = editableConexes();
    if (!allowed.length) {
      toast('Switch to your team or unlock a team to add items');
      return;
    }

    editing = id || null;
    const defaultConexId = allowed.some((c) => c.id === S.activeConex) ? S.activeConex : allowed[0].id;
    const i = src
      ? { ...src }
      : {
          name: '',
          category: cat !== 'All' ? cat : (S.cats[0] || 'Gaskets'),
          conexId: defaultConexId,
          size: '', material: '', type: '', bin: '', sku: '',
          unit: 'ea', qty: 0, min: 0, notes: '', photo: ''
        };
    if (dupFrom) { i.name = `${i.name} (copy)`; i.qty = 0; }
    editPhoto = i.photo || '';
    const sp = SPEC[i.category] || DEF_SPEC;

    openSheet(
      id ? 'Edit item' : (dupFrom ? 'Duplicate item' : 'New item'),
      `
      <div class="field" id="fg-name">
        <label for="f-name">Item name</label>
        <input id="f-name" value="${esc(i.name)}" placeholder="e.g. B7 Stud Bolt w/ 2H Nuts">
        <div class="field-error">Enter a part name before saving.</div>
      </div>

      <div class="field">
        <label for="f-conex">Conex box</label>
        <select id="f-conex">${allowed.map((c) => {
          const tm = teamById(c.teamId);
          return `<option value="${esc(c.id)}" ${c.id === i.conexId ? 'selected' : ''}>${esc(c.name)} — ${esc(tm.name)}</option>`;
        }).join('')}</select>
      </div>

      <div class="form-grid-2">
        <div class="field">
          <label for="f-cat">Category</label>
          <select id="f-cat">${S.cats.map((c) => `<option ${c === i.category ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>
        </div>
        <div class="field">
          <label for="f-bin">Bin / Shelf</label>
          <input id="f-bin" value="${esc(i.bin)}" placeholder="e.g. B-1">
        </div>
      </div>

      <div class="section-div">Specs</div>
      <div class="field">
        <label id="l-size" for="f-size">${esc(sp[0])}</label>
        <input id="f-size" value="${esc(i.size)}" placeholder="${esc(sp[1])}">
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label id="l-mat" for="f-mat">${esc(sp[2])}</label>
          <input id="f-mat" value="${esc(i.material)}" placeholder="${esc(sp[3])}">
        </div>
        <div class="field">
          <label id="l-type" for="f-type">${esc(sp[4])}</label>
          <input id="f-type" value="${esc(i.type)}" placeholder="${esc(sp[5])}">
        </div>
      </div>
      <div class="field">
        <label for="f-sku">Part # / SKU (optional)</label>
        <input id="f-sku" value="${esc(i.sku)}" placeholder="e.g. B7-34-412">
      </div>

      <div class="section-div">Quantity &amp; Reorder</div>
      <div class="form-grid-3">
        <div class="field">
          <label for="f-qty">On hand</label>
          <input id="f-qty" type="number" inputmode="numeric" min="0" value="${i.qty}">
        </div>
        <div class="field">
          <label for="f-min">Reorder at</label>
          <input id="f-min" type="number" inputmode="numeric" min="0" value="${i.min || 0}">
        </div>
        <div class="field">
          <label for="f-unit">Unit</label>
          <select id="f-unit">${UNITS.map((u) => `<option ${u === i.unit ? 'selected' : ''}>${u}</option>`).join('')}</select>
        </div>
      </div>
      <div class="field-hint">Moves to Reorder when on-hand hits this number. Set 0 to skip tracking.</div>

      <div class="section-div">Photo</div>
      <div class="photo-editor">
        <div class="part-thumb ${editPhoto ? '' : 'is-empty'}" id="f-thumb" style="width:64px;height:64px">
          ${editPhoto ? `<img src="${esc(editPhoto)}" alt="Part photo">` : ICON.cam}
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-outline btn-sm" id="f-photo">${editPhoto ? 'Upload photo' : 'Upload / Camera'}</button>
          <button type="button" class="btn btn-sm ${editPhoto ? '' : 'hidden'}" id="f-nophoto">Remove</button>
        </div>
      </div>
      ${S.photoLib.length ? `
        <div class="photo-library-label">Or pick from your Hardware Photo Library (editable in Tools):</div>
        <div class="photo-library" id="photoLibrary">
          ${S.photoLib.map((p) => `
            <button type="button" class="lib-thumb ${editPhoto === p.src ? 'is-selected' : ''}" data-lib-src="${esc(p.src)}">
              <img src="${esc(p.src)}" alt="${esc(p.label)}" loading="lazy" width="52" height="52">
              <span>${esc(p.label)}</span>
            </button>`).join('')}
        </div>` : ''}

      <div class="section-div">Notes</div>
      <div class="field">
        <label for="f-notes" class="sr-only">Notes</label>
        <textarea id="f-notes" placeholder="Flange spec, torque reminder, job shelf…">${esc(i.notes)}</textarea>
      </div>

      ${id ? `
        <div class="btn-row" id="editExtraActions" style="margin-top:var(--space-2)">
          <button type="button" class="btn btn-outline" style="flex:1" id="f-dup">${ICON.copy}Duplicate</button>
          <button type="button" class="btn btn-danger" style="flex:1" id="f-del">${ICON.trash}Delete</button>
        </div>
        <div class="inline-confirm hidden" id="delConfirmBar">
          <span>Delete this item?</span>
          <div class="btn-row">
            <button type="button" class="btn btn-sm btn-outline" id="f-del-no">Cancel</button>
            <button type="button" class="btn btn-sm btn-danger-solid" id="f-del-yes">Delete</button>
          </div>
        </div>` : ''}
      `,
      `<button type="button" class="btn" style="flex:1" id="f-cancel">Cancel</button>
       <button type="button" class="btn btn-primary" style="flex:2" id="f-save">${id ? 'Save changes' : 'Add item'}</button>`
    );

    $('#f-name').oninput = () => $('#fg-name').classList.remove('has-error');
    $('#f-cat').onchange = (e) => {
      const s = SPEC[e.target.value] || DEF_SPEC;
      [['size', 0], ['mat', 2], ['type', 4]].forEach(([k, n]) => {
        $('#l-' + k).textContent = s[n];
        $('#f-' + k).placeholder = s[n + 1];
      });
    };
    $('#f-photo').onclick = () => $('#photoIn').click();
    $('#f-nophoto').onclick = () => { editPhoto = ''; updatePhotoPreview(); };
    document.querySelectorAll('.lib-thumb').forEach((btn) => {
      btn.onclick = () => { editPhoto = btn.dataset.libSrc; updatePhotoPreview(); };
    });
    $('#f-cancel').onclick = closeSheet;
    $('#f-save').onclick = saveEdit;

    if (id) {
      $('#f-dup').onclick = () => openEdit(null, S.items.find((x) => x.id === id));
      $('#f-del').onclick = () => { $('#editExtraActions').classList.add('hidden'); $('#delConfirmBar').classList.remove('hidden'); };
      $('#f-del-no').onclick = () => { $('#delConfirmBar').classList.add('hidden'); $('#editExtraActions').classList.remove('hidden'); };
      $('#f-del-yes').onclick = () => {
        const idx = S.items.findIndex((x) => x.id === id);
        if (idx < 0) return;
        const it = S.items[idx];
        S.items.splice(idx, 1);
        logIt(it, 'del', it.qty, 0);
        save();
        closeSheet();
        render();
        toast(`Deleted ${it.name}`, () => { S.items.splice(idx, 0, it); S.log.shift(); save(); render(); });
      };
    }

    if (!id && !dupFrom) setTimeout(() => $('#f-name')?.focus(), 260);
  }

  function saveEdit() {
    const nameEl = $('#f-name');
    const name = nameEl.value.trim();
    if (!name) { $('#fg-name').classList.add('has-error'); nameEl.focus(); return; }
    const data = {
      name,
      conexId: $('#f-conex').value,
      category: $('#f-cat').value,
      bin: $('#f-bin').value.trim(),
      size: $('#f-size').value.trim(),
      material: $('#f-mat').value.trim(),
      type: $('#f-type').value.trim(),
      sku: $('#f-sku').value.trim(),
      qty: Math.max(0, parseInt($('#f-qty').value, 10) || 0),
      min: Math.max(0, parseInt($('#f-min').value, 10) || 0),
      unit: $('#f-unit').value,
      notes: $('#f-notes').value.trim(),
      photo: editPhoto,
      updated: Date.now()
    };

    if (editing) {
      const it = S.items.find((x) => x.id === editing);
      const from = it.qty;
      Object.assign(it, data);
      delete it.sample;
      if (from !== data.qty) logIt(it, 'set', from, data.qty, 'Edited');
      toast('Changes saved');
    } else {
      const it = { id: uid(), ...data };
      S.items.push(it);
      logIt(it, 'add', 0, it.qty);
      toast(`${name} added`);
    }
    save();
    closeSheet();
    render();
  }

  $('#photoIn').onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    compressImage(f, (dataUrl) => { editPhoto = dataUrl; updatePhotoPreview(); });
    e.target.value = '';
  };

  // Precision Count / Check-out / Check-in / Part Transfer Sheet
  function openCount(id) {
    const i = S.items.find((x) => x.id === id);
    if (!i || !canEditConex(i.conexId)) return;
    let mode = i.qty > 0 ? 'out' : 'in';
    const srcCx = conexById(i.conexId);
    const otherConexes = S.conexes.filter((c) => c.id !== i.conexId);
    const notes = recentNotes();

    openSheet('Adjust or transfer', `
      <div class="count-header">
        <div class="part-thumb ${i.photo ? '' : 'is-empty'}" style="width:50px;height:50px">
          ${i.photo ? `<img src="${esc(i.photo)}" alt="${esc(i.name)}">` : ICON.box}
        </div>
        <div style="min-width:0;flex:1">
          <div class="item-name" style="font-size:var(--text-sm)">${esc(i.name)}</div>
          <div class="loc-line" style="margin-top:2px">
            <span class="conex-tag">${esc(srcCx.name)}</span>
            ${i.bin ? `<span class="bin-tag">BIN ${esc(i.bin)}</span>` : ''}
            <span>On hand: <strong style="color:var(--color-text)">${i.qty} ${esc(i.unit || 'ea')}</strong></span>
          </div>
        </div>
      </div>

      <div class="mode-tabs" role="tablist">
        <button type="button" data-mode="out" class="${mode === 'out' ? 'is-active' : ''}" role="tab" aria-selected="${mode === 'out'}">Check out</button>
        <button type="button" data-mode="in" class="${mode === 'in' ? 'is-active' : ''}" role="tab" aria-selected="${mode === 'in'}">Check in</button>
        <button type="button" data-mode="xfer" role="tab" aria-selected="false">Transfer</button>
        <button type="button" data-mode="set" role="tab" aria-selected="false">Set count</button>
      </div>

      <div class="transfer-box hidden" id="xferBox">
        ${otherConexes.length ? `
          <label for="c-dest">Transfer parts from ${esc(srcCx.name)} to:</label>
          <select id="c-dest">${otherConexes.map((c) => `<option value="${esc(c.id)}">${esc(c.name)} — ${esc(teamById(c.teamId).name)}</option>`).join('')}</select>
        ` : `<div style="font-size:var(--text-xs);color:var(--color-text-secondary)">Add a second Conex box in Tools to transfer parts.</div>`}
      </div>

      <div class="big-counter">
        <button type="button" id="c-m" aria-label="Decrease">−</button>
        <input id="c-n" type="number" inputmode="numeric" min="0" value="1" aria-label="Amount">
        <button type="button" id="c-p" aria-label="Increase">+</button>
      </div>

      <div class="preset-row" aria-label="Quick bolt and hardware counts">
        ${[1, 2, 4, 8, 12, 16, 24].map((n) => `<button type="button" class="preset-btn" data-preset="${n}">${n}</button>`).join('')}
      </div>

      <div class="count-preview" id="c-hint"></div>

      <div class="field">
        <label for="c-note">Job / Work Order note (optional)</label>
        <input id="c-note" placeholder="e.g. WO-1042, Unit 3">
        ${notes.length ? `
          <div class="recent-notes">
            ${notes.map((nt) => `<button type="button" class="note-chip" data-note="${esc(nt)}">${esc(nt)}</button>`).join('')}
          </div>` : ''}
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="c-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="c-ok">Confirm</button>`);

    const nEl = $('#c-n');
    const okBtn = $('#c-ok');
    const updateHint = () => {
      const v = Math.max(0, parseInt(nEl.value, 10) || 0);
      $('#xferBox').classList.toggle('hidden', mode !== 'xfer');

      if (mode === 'xfer') {
        const destSel = $('#c-dest');
        const destCx = destSel ? conexById(destSel.value) : null;
        const moveQty = Math.min(i.qty, v);
        const rem = i.qty - moveQty;
        okBtn.disabled = !destCx || moveQty <= 0;
        okBtn.style.opacity = okBtn.disabled ? '0.5' : '1';
        $('#c-hint').innerHTML = destCx
          ? `<span>${esc(srcCx.name)}: ${i.qty} → <strong style="color:var(--color-text)">${rem} ${esc(i.unit || 'ea')}</strong> · ${esc(destCx.name)}: <strong style="color:var(--color-ok)">+${moveQty}</strong></span>`
          : `<span>No destination Conex box available</span>`;
        okBtn.textContent = destCx ? `Transfer ${moveQty} to ${destCx.name}` : 'Transfer';
        return;
      }

      okBtn.disabled = false;
      okBtn.style.opacity = '1';
      const to = mode === 'set' ? v : (mode === 'in' ? i.qty + v : Math.max(0, i.qty - v));
      const nextSt = to <= 0 ? 'out' : (i.min > 0 && to <= i.min ? 'low' : 'ok');
      const warnHtml = nextSt === 'out'
        ? `<div class="count-alert out">Out of stock — will appear in Reorder</div>`
        : (nextSt === 'low' && mode !== 'in'
          ? `<div class="count-alert low">At or below Min ${i.min} — will appear in Reorder</div>`
          : '');
      $('#c-hint').innerHTML = `<span>${i.qty} ${esc(i.unit || 'ea')} → <strong style="color:var(--color-text)">${to} ${esc(i.unit || 'ea')}</strong></span>${warnHtml}`;
      okBtn.textContent = { out: `Check out ${v}`, in: `Check in ${v}`, set: `Set to ${v}` }[mode];
    };

    document.querySelectorAll('.mode-tabs button').forEach((b) => {
      b.onclick = () => {
        mode = b.dataset.mode;
        document.querySelectorAll('.mode-tabs button').forEach((x) => {
          const active = x === b;
          x.classList.toggle('is-active', active);
          x.setAttribute('aria-selected', String(active));
        });
        nEl.value = mode === 'set' ? i.qty : 1;
        updateHint();
      };
    });

    if ($('#c-dest')) $('#c-dest').onchange = updateHint;
    document.querySelectorAll('.preset-btn').forEach((b) => { b.onclick = () => { nEl.value = b.dataset.preset; updateHint(); }; });
    document.querySelectorAll('.note-chip').forEach((b) => { b.onclick = () => { $('#c-note').value = b.dataset.note; }; });
    $('#c-m').onclick = () => { nEl.value = Math.max(0, (parseInt(nEl.value, 10) || 0) - 1); updateHint(); };
    $('#c-p').onclick = () => { nEl.value = (parseInt(nEl.value, 10) || 0) + 1; updateHint(); };
    nEl.oninput = updateHint;
    updateHint();

    $('#c-cancel').onclick = closeSheet;
    okBtn.onclick = () => {
      const v = Math.max(0, parseInt(nEl.value, 10) || 0);
      const note = $('#c-note').value.trim();
      if (mode === 'xfer') {
        const destId = $('#c-dest')?.value;
        closeSheet();
        if (destId) transferPartQty(i, destId, v, note);
        return;
      }
      closeSheet();
      if (mode === 'set') setQty(i, v, 'set', note);
      else setQty(i, mode === 'in' ? i.qty + v : i.qty - v, 'adj', note);
    };
  }

  // Add Category Sheet
  function openAddCategory() {
    openSheet('Add category', `
      <div class="field" id="fg-cat">
        <label for="cat-in">Category name</label>
        <input id="cat-in" placeholder="e.g. Flanges, Studs, Clamps" autocomplete="off">
        <div class="field-error" id="cat-err">Enter a new category name.</div>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="cat-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="cat-save">Add category</button>`);

    const inp = $('#cat-in');
    const submit = () => {
      const c = inp.value.trim();
      if (!c) { $('#cat-err').textContent = 'Enter a category name.'; $('#fg-cat').classList.add('has-error'); inp.focus(); return; }
      if (S.cats.some((x) => x.toLowerCase() === c.toLowerCase())) {
        $('#cat-err').textContent = 'That category already exists.';
        $('#fg-cat').classList.add('has-error');
        inp.focus();
        return;
      }
      S.cats.push(c);
      save();
      closeSheet();
      render();
      toast(`Category "${c}" added`);
    };

    inp.oninput = () => $('#fg-cat').classList.remove('has-error');
    inp.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
    $('#cat-cancel').onclick = closeSheet;
    $('#cat-save').onclick = submit;
    setTimeout(() => inp.focus(), 260);
  }

  function openClearSamples() {
    const count = S.items.filter((i) => i.sample).length;
    openSheet('Clear sample items', `
      <div class="callout is-warn">
        ${ICON.alert}
        <div>Remove the ${count} starter sample item${count === 1 ? '' : 's'}? Anything you added or edited will stay safe.</div>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="cs-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="cs-ok">Clear samples</button>`);

    $('#cs-cancel').onclick = closeSheet;
    $('#cs-ok').onclick = () => {
      S.items = S.items.filter((i) => !i.sample);
      S.log = S.log.filter((l) => S.items.some((i) => i.id === l.id));
      save();
      closeSheet();
      render();
      toast('Sample items cleared');
    };
  }

  function openRestoreConfirm(parsed) {
    if (!isMainAdmin()) {
      toast('Main Admin access required');
      return;
    }
    openSheet('Restore backup', `
      <div class="callout is-warn">
        ${ICON.alert}
        <div>Replace your current inventory (${S.items.length} parts) with <strong>${parsed.items.length} parts</strong> from this backup file?</div>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="rs-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="rs-ok">Restore backup</button>`);

    $('#rs-cancel').onclick = closeSheet;
    $('#rs-ok').onclick = () => {
      S = {
        ...S,
        items: parsed.items.map((i) => ({ min: 0, unit: 'ea', ...i })),
        log: Array.isArray(parsed.log) ? parsed.log : [],
        cats: Array.isArray(parsed.cats) && parsed.cats.length ? parsed.cats : DEF_CATS.slice(),
        teams: Array.isArray(parsed.teams) && parsed.teams.length ? parsed.teams : DEFAULT_TEAMS.map((t) => ({ ...t })),
        conexes: Array.isArray(parsed.conexes) && parsed.conexes.length ? parsed.conexes : [],
        photoLib: Array.isArray(parsed.photoLib) ? parsed.photoLib : S.photoLib
      };
      migrateState();
      cat = 'All';
      statusFilter = 'all';
      save();
      closeSheet();
      render();
      toast(`Restored ${S.items.length} items`);
    };
  }

  function openReset() {
    if (!isMainAdmin()) {
      toast('Main Admin access required');
      return;
    }
    openSheet('Reset everything', `
      <div class="callout is-danger">
        ${ICON.alert}
        <div>This permanently deletes all ${S.items.length} item${S.items.length === 1 ? '' : 's'} and ${S.log.length} history entr${S.log.length === 1 ? 'y' : 'ies'} across all Conex boxes. This cannot be undone. Back up first if you want a copy.</div>
      </div>
      <div class="field">
        <label for="r-in">Type <strong style="color:var(--color-text)">Delete</strong> to confirm</label>
        <input id="r-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Delete">
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="r-cancel">Cancel</button>
     <button type="button" class="btn btn-danger" style="flex:2;opacity:.45" id="r-ok" disabled>Delete everything</button>`);

    const inp = $('#r-in');
    const ok = $('#r-ok');
    inp.oninput = () => {
      const matched = inp.value.trim().toLowerCase() === 'delete';
      ok.disabled = !matched;
      ok.style.opacity = matched ? '1' : '0.45';
      ok.classList.toggle('btn-danger-solid', matched);
      ok.classList.toggle('btn-danger', !matched);
    };
    $('#r-cancel').onclick = closeSheet;
    ok.onclick = () => {
      if (inp.value.trim().toLowerCase() !== 'delete') return;
      S.items = [];
      S.log = [];
      S.cats = DEF_CATS.slice();
      cat = 'All';
      statusFilter = 'all';
      save();
      closeSheet();
      render();
      toast('All items and history deleted');
    };
    setTimeout(() => inp.focus(), 260);
  }

  // ---------- Export & Sharing ----------
  function download(name, text, type) {
    const b = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  const csvCell = (v) => {
    v = String(v ?? '');
    return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  };
  const stamp = () => new Date().toISOString().slice(0, 10);

  function exportCSV(items, name, withOrder) {
    const head = ['Team', 'Conex', 'Name', 'Category', 'Size', 'Material', 'Type/Rating', 'Bin', 'SKU', 'On Hand', 'Unit', 'Reorder At', 'Status']
      .concat(withOrder ? ['Order Qty'] : [])
      .concat(['Notes']);
    const rows = items.map((i) => {
      const cx = conexById(i.conexId);
      const tm = cx ? teamById(cx.teamId) : null;
      return [tm?.name || '', cx?.name || '', i.name, i.category, i.size, i.material, i.type, i.bin, i.sku, i.qty, i.unit, i.min, { ok: 'In stock', low: 'Low', out: 'Out' }[statusOf(i)]]
        .concat(withOrder ? [needQty(i)] : [])
        .concat([i.notes]);
    });
    download(name, [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n'), 'text/csv;charset=utf-8');
  }

  function reorderText() {
    const hdr = S.activeConex === 'all'
      ? 'Pipefitter Inventory — All Conex Reorder List'
      : S.activeConex.startsWith('team:')
        ? `Pipefitter Inventory — ${teamById(S.activeConex.slice(5)).name} Reorder List`
        : `Pipefitter Inventory — ${conexById(S.activeConex).name} (${teamById(conexById(S.activeConex).teamId).name}) Reorder List`;
    return hdr + ' (' + new Date().toLocaleDateString() + ')\n\n' +
      lowItems().map((i) => {
        const cx = conexById(i.conexId);
        return `• ${needQty(i)} ${i.unit || 'ea'} — ${i.name}${specLine(i) ? ' (' + specLine(i) + ')' : ''} [${cx.name}]${i.bin ? ' [Bin ' + i.bin + ']' : ''}${i.sku ? ' #' + i.sku : ''}  (on hand ${i.qty})`;
      }).join('\n');
  }

  async function copyText(str, btn) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(str);
      } else {
        const ta = document.createElement('textarea');
        ta.value = str;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      if (btn) {
        const prev = btn.innerHTML;
        btn.innerHTML = `${ICON.check}Copied`;
        setTimeout(() => { if (btn.isConnected) btn.innerHTML = prev; }, 1600);
      }
      toast('Reorder list copied');
    } catch (_) { toast('Could not copy automatically'); }
  }

  // ---------- Event Delegation ----------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button,[data-edit]');
    if (!t) return;

    if (t.dataset.v) { view = t.dataset.v; render(); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    if (t.dataset.cat) { cat = t.dataset.cat; renderStock(); return; }
    if (t.dataset.st) { statusFilter = t.dataset.st; renderStock(); return; }
    if (t.dataset.af) { actFilter = t.dataset.af; renderActivity(); return; }
    if (t.dataset.unlockTeam) { openUnlockTeam(t.dataset.unlockTeam); return; }
    if (t.dataset.adj) {
      const card = t.closest('.item-card');
      const i = S.items.find((x) => x.id === card?.dataset.id);
      if (i) setQty(i, i.qty + Number(t.dataset.adj));
      return;
    }
    if (t.dataset.count) { openCount(t.dataset.count); return; }
    if (t.dataset.receive) {
      const i = S.items.find((x) => x.id === t.dataset.receive);
      const q = Number(t.dataset.qty) || 1;
      if (i) setQty(i, i.qty + q, 'adj', 'Restocked');
      return;
    }
    if (t.dataset.edit) { openEdit(t.dataset.edit); return; }
    if (t.dataset.editconex) { openConexEditor(t.dataset.editconex); return; }
    if (t.dataset.editteam) { openTeamEditor(t.dataset.editteam); return; }
    if (t.dataset.editlib) { openLibPhotoEditor(t.dataset.editlib); return; }
    if (t.dataset.delcat) {
      const c = t.dataset.delcat;
      const used = S.items.filter((i) => i.category === c).length;
      if (used) { toast(`${used} part${used > 1 ? 's' : ''} still use "${c}"`); return; }
      S.cats = S.cats.filter((x) => x !== c);
      if (cat === c) cat = 'All';
      save();
      render();
      toast(`Category "${c}" removed`);
      return;
    }

    switch (t.id) {
      case 'teamSwitchBtn': openConexSwitcher(); break;
      case 'teamAllBtn': {
        if (S.activeConex === 'all') {
          const mine = conexesForTeam(S.myTeamId);
          S.activeConex = mine.length ? mine[0].id : S.conexes[0].id;
        } else {
          S.activeConex = 'all';
        }
        cat = 'All';
        statusFilter = 'all';
        save();
        render();
        break;
      }
      case 'cloudPrimaryBtn':
        if (!Cloud.configured) openFirebaseSetup();
        else openAuthSheet();
        break;
      case 'superViewBtn':
      case 'toolsSuperViewBtn': openSuperView(); break;
      case 'adminPanelBtn': openAdminPanel(); break;
      case 'cloudConfigBtn': openFirebaseSetup(); break;
      case 'setMyTeamBtn': openSetMyTeam(); break;
      case 'setPinBtn': openSetPin(); break;
      case 'relockBtn':
        unlockedTeams.clear();
        render();
        toast('Other teams locked to view-only');
        break;
      case 'addConexBtn': openConexEditor(null); break;
      case 'addTeamBtn': openAddTeam(); break;
      case 'addLibPhotoBtn': openLibPhotoEditor(null); break;
      case 'restoreLibBtn': openRestoreDefaultPhotos(); break;
      case 'fab':
      case 'desktopAddBtn':
      case 'emptyAddBtn':
        openEdit(null);
        break;
      case 'clearFiltersBtn':
        query = '';
        $('#q').value = '';
        cat = 'All';
        statusFilter = 'all';
        renderStock();
        break;
      case 'sortBtn': openSortSheet(); break;
      case 'addCat': openAddCategory(); break;
      case 'bk':
        S.lastBackup = Date.now();
        save();
        download(`pipefitter-inventory-backup-${stamp()}.json`, JSON.stringify({ app: 'Pipefitter Inventory', v: 5, ...S }), 'application/json');
        renderTools();
        toast('Full backup saved');
        break;
      case 'rs':
        if (!isMainAdmin()) { toast('Main Admin access required'); break; }
        $('#fileIn').click();
        break;
      case 'csv': exportCSV(S.items, `pipefitter-inventory-${stamp()}.csv`, false); toast('CSV exported'); break;
      case 'clrS': openClearSamples(); break;
      case 'rst': openReset(); break;
      case 'roCopy': copyText(reorderText(), t); break;
      case 'roCsv': exportCSV(lowItems(), `pipefitter-inventory-reorder-${stamp()}.csv`, true); toast('Reorder CSV exported'); break;
      case 'roShare':
        if (navigator.share) {
          navigator.share({ title: 'Pipefitter Inventory — Reorder List', text: reorderText() }).catch(() => {});
        } else {
          copyText(reorderText());
        }
        break;
    }
  });

  $('#q').oninput = (e) => { query = e.target.value; renderStock(); };
  $('#qClear').onclick = () => { query = ''; $('#q').value = ''; renderStock(); $('#q').focus(); };
  $('#themeBtn').onclick = () => {
    const cur = document.documentElement.dataset.theme;
    S.theme = cur === 'dark' ? 'light' : 'dark';
    save();
    applyTheme();
  };
  $('#toastUndo').onclick = () => {
    if (undoState) { undoState(); undoState = null; $('#toast').classList.remove('is-open'); }
  };
  $('#fileIn').onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!Array.isArray(d.items)) throw new Error('Invalid');
        openRestoreConfirm(d);
      } catch (_) { toast('That file is not a valid backup'); }
    };
    r.readAsText(f);
    e.target.value = '';
  };

  // ---------- Firebase Spark Setup, Auth & Admin Panel ----------
  function openFirebaseSetup() {
    const cur = Cloud.getSavedConfig();
    openSheet('Firebase Spark Cloud Sync', `
      <div class="info-callout" style="margin-bottom:14px">
        <span>Connect a free <strong>Firebase Spark</strong> project ($0/mo) for real usernames, Admin Panel, and live offline-first sync across phones.</span>
      </div>
      <div class="field" id="fg-fbcfg">
        <label for="fb-cfg">Firebase Web Config (JSON)</label>
        <textarea id="fb-cfg" rows="6" placeholder='{"apiKey":"...","authDomain":"...","projectId":"...","appId":"..."}' style="font-family:var(--font-mono);font-size:12px">${cur ? esc(JSON.stringify(cur, null, 2)) : ''}</textarea>
        <div class="field-error">Paste valid JSON with apiKey and projectId.</div>
      </div>
      ${cur ? `<button type="button" class="btn btn-danger" style="width:100%" id="fb-disc">Disconnect Firebase (stay local offline)</button>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="fb-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="fb-save">Save &amp; Connect</button>`);

    $('#fb-cancel').onclick = closeSheet;
    $('#fb-cfg').oninput = () => $('#fg-fbcfg').classList.remove('has-error');
    if ($('#fb-disc')) {
      $('#fb-disc').onclick = async () => {
        await Cloud.signOut();
        Cloud.saveConfig(null);
        Cloud.configured = false;
        Cloud.ready = false;
        closeSheet();
        render();
        toast('Disconnected — running in local offline mode');
      };
    }
    $('#fb-save').onclick = async () => {
      try {
        const parsed = JSON.parse($('#fb-cfg').value.trim());
        if (!parsed.apiKey || !parsed.projectId) throw new Error('missing');
        Cloud.saveConfig(parsed);
        closeSheet();
        toast('Connecting to Firebase Spark...');
        const ok = await bootCloud();
        if (ok) openAuthSheet();
        else toast('Could not initialize Firebase — check config');
      } catch (_) {
        $('#fg-fbcfg').classList.add('has-error');
      }
    };
  }

  function openChangePasswordSheet() {
    if (!Cloud.user) return;
    openSheet('Change Password', `
      <div class="field">
        <label for="cp-cur">Current Password</label>
        <input id="cp-cur" type="password" placeholder="Enter current password" autocomplete="current-password">
      </div>
      <div class="field">
        <label for="cp-new">New Password (min 6 chars)</label>
        <input id="cp-new" type="password" placeholder="Enter new password" autocomplete="new-password">
      </div>
      <div class="field">
        <label for="cp-conf">Confirm New Password</label>
        <input id="cp-conf" type="password" placeholder="Re-enter new password" autocomplete="new-password">
      </div>
      <div class="field-error" id="cp-err" style="display:none"></div>
    `,
    `<button type="button" class="btn" style="flex:1" id="cp-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="cp-save">Update Password</button>`);

    $('#cp-cancel').onclick = () => { closeSheet(); openAuthSheet(); };
    $('#cp-save').onclick = async () => {
      const cur = $('#cp-cur').value;
      const next = $('#cp-new').value;
      const conf = $('#cp-conf').value;
      const errEl = $('#cp-err');
      errEl.style.display = 'none';
      if (!cur) {
        errEl.textContent = 'Enter your current password.';
        errEl.style.display = 'block';
        $('#cp-cur').focus();
        return;
      }
      if (next.length < 6) {
        errEl.textContent = 'New password must be at least 6 characters.';
        errEl.style.display = 'block';
        $('#cp-new').focus();
        return;
      }
      if (next !== conf) {
        errEl.textContent = 'New passwords do not match.';
        errEl.style.display = 'block';
        $('#cp-conf').focus();
        return;
      }
      const btn = $('#cp-save');
      btn.disabled = true;
      btn.textContent = 'Updating...';
      try {
        await Cloud.changePassword(cur, next);
        closeSheet();
        toast('Password updated');
      } catch (err) {
        const msg = (err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential')
          ? 'Current password is incorrect.'
          : (err?.message || 'Could not update password.');
        errEl.textContent = msg;
        errEl.style.display = 'block';
      } finally {
        btn.disabled = false;
        btn.textContent = 'Update Password';
      }
    };
    setTimeout(() => $('#cp-cur')?.focus(), 200);
  }

  function openAuthSheet() {
    if (Cloud.user && Cloud.profile) {
      const roleLbl = Cloud.profile.role === 'admin'
        ? 'Main Admin'
        : Cloud.profile.role === 'supervisor' ? 'Supervisor' : 'Crew';
      openSheet('Account', `
        <div class="panel" style="margin-bottom:14px">
          <div class="list-item">
            <span class="li-icon">${ICON.shield}</span>
            <span class="li-text">
              <span class="li-label"><strong>${esc(Cloud.profile.displayName)}</strong> (${esc(Cloud.profile.username)})</span>
              <span class="li-desc">Role: ${roleLbl}${Cloud.profile.role === 'crew' ? ` · Team: ${esc(teamDisplayName(Cloud.profile.teamId) || 'Unassigned')}` : ''}</span>
            </span>
          </div>
        </div>
        ${Cloud.profile.role === 'admin' || Cloud.profile.role === 'supervisor' ? `<button type="button" class="btn btn-primary" style="width:100%;margin-bottom:10px" id="au-admin">${Cloud.profile.role === 'admin' ? 'Open Main Admin Panel' : 'Open Supervisor Panel'}</button>` : ''}
        <button type="button" class="btn btn-outline" style="width:100%;margin-bottom:10px" id="au-chpw">${ICON.lock}Change Password</button>
        <button type="button" class="btn btn-danger" style="width:100%" id="au-out">Sign out</button>
      `, `<button type="button" class="btn" style="flex:1" id="au-close">Done</button>`);
      $('#au-close').onclick = closeSheet;
      if ($('#au-admin')) $('#au-admin').onclick = () => { closeSheet(); openAdminPanel(); };
      if ($('#au-chpw')) $('#au-chpw').onclick = () => { closeSheet(); openChangePasswordSheet(); };
      $('#au-out').onclick = async () => {
        await Cloud.signOut();
        closeSheet();
        render();
        toast('Signed out');
      };
      return;
    }

    let mode = 'signin';
    const renderAuth = () => {
      openSheet(mode === 'signin' ? 'Sign in to Pipefitter Inventory' : 'Create Crew Account', `
        <div class="info-callout" style="margin-bottom:14px">
          <span>${mode === 'signin' ? 'Sign in with your username and password to sync your team\'s Conex inventory.' : 'The first account created automatically becomes Admin. Additional accounts start as Crew.'}</span>
        </div>
        <div class="field" id="fg-au-u">
          <label for="au-u">Username or Email</label>
          <input id="au-u" type="text" placeholder="e.g. jsmith" autocomplete="username">
        </div>
        ${mode === 'register' ? `
          <div class="field">
            <label for="au-n">Display Name</label>
            <input id="au-n" type="text" placeholder="e.g. J. Smith">
          </div>
          <div class="field">
            <label for="au-t">Team</label>
            <select id="au-t">${S.teams.map((t) => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('')}</select>
          </div>` : ''}
        <div class="field" id="fg-au-p">
          <label for="au-p">Password (min 6 chars)</label>
          <input id="au-p" type="password" placeholder="••••••" autocomplete="current-password">
          <div class="field-error" id="au-err">Invalid credentials.</div>
        </div>
        <button type="button" class="btn" style="width:100%" id="au-toggle">
          ${mode === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>
      `,
      `<button type="button" class="btn" style="flex:1" id="au-cancel">Cancel</button>
       <button type="button" class="btn btn-primary" style="flex:2" id="au-go">${mode === 'signin' ? 'Sign in' : 'Create Account'}</button>`);

      $('#au-cancel').onclick = closeSheet;
      $('#au-toggle').onclick = () => { mode = mode === 'signin' ? 'register' : 'signin'; renderAuth(); };
      $('#au-go').onclick = async () => {
        const u = $('#au-u').value.trim();
        const p = $('#au-p').value;
        if (!u || p.length < 6) {
          $('#au-err').textContent = 'Enter a username and a password (6+ characters).';
          $('#fg-au-p').classList.add('has-error');
          return;
        }
        try {
          if (mode === 'signin') {
            await Cloud.signIn(u, p);
          } else {
            await Cloud.register(u, p, $('#au-n').value.trim() || u, $('#au-t').value);
            await Cloud.seedCloudIfEmpty(S);
          }
          closeSheet();
          render();
          toast('Signed in as ' + (Cloud.profile?.displayName || u));
        } catch (err) {
          $('#au-err').textContent = err?.message || 'Sign-in failed.';
          $('#fg-au-p').classList.add('has-error');
        }
      };
    };
    renderAuth();
  }

  function openCreateAccountSheet(defaultRole) {
    const isAdmin = Cloud.profile?.role === 'admin';
    const isSup = Cloud.profile?.role === 'supervisor';
    if (!isAdmin && !isSup) return;
    const role = isAdmin ? (defaultRole || 'crew') : 'crew';
    const sups = Cloud.supervisors ? Cloud.supervisors() : [];
    const nextLetter = String.fromCharCode(65 + S.teams.length);
    const nextConexNum = S.conexes.length + 1;
    const teamOpts = S.teams.map((t) => `<option value="${esc(t.id)}">${esc(teamDisplayName(t))}</option>`).join('')
      + `<option value="__new__" ${!S.teams.length ? 'selected' : ''}>+ Create new team (e.g. Crew ${esc(nextLetter)})</option>`;

    openSheet(role === 'supervisor' ? 'Create Supervisor Account' : 'Create Crew Account', `
      <div class="field">
        <label for="ca-u">Username</label>
        <input id="ca-u" type="text" placeholder="e.g. mgarcia">
      </div>
      <div class="field">
        <label for="ca-n">Display Name</label>
        <input id="ca-n" type="text" placeholder="e.g. M. Garcia">
      </div>
      <div class="field">
        <label for="ca-p">Temporary Password (min 6 chars)</label>
        <input id="ca-p" type="password" placeholder="••••••">
      </div>
      ${role === 'crew' ? `
        ${isAdmin && sups.length ? `
          <div class="field">
            <label for="ca-sup">Supervisor</label>
            <select id="ca-sup">
              <option value="">Unassigned</option>
              ${sups.map((s) => `<option value="${esc(s.uid)}">${esc(s.displayName || s.username)}</option>`).join('')}
            </select>
          </div>` : ''}
        <div class="field">
          <label for="ca-tm">Assigned Team</label>
          <select id="ca-tm">${teamOpts}</select>
        </div>
        <div class="field" id="fg-ca-newtm" style="display:${!S.teams.length ? 'block' : 'none'}">
          <label for="ca-newtm">New Team Name</label>
          <input id="ca-newtm" type="text" value="Crew ${esc(nextLetter)}" placeholder="e.g. Crew ${esc(nextLetter)}, Turnaround" autocomplete="off">
        </div>
        <div class="field">
          <label for="ca-newcx">New Conex Box (optional)</label>
          <input id="ca-newcx" type="text" placeholder="Leave blank to skip, or e.g. Conex ${nextConexNum}" autocomplete="off">
        </div>` : ''}
      <div class="field-error" id="ca-err" style="display:none"></div>
    `,
    `<button type="button" class="btn" style="flex:1" id="ca-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="ca-go">Create ${role === 'supervisor' ? 'Supervisor' : 'Crew'}</button>`);

    if ($('#ca-tm') && $('#fg-ca-newtm')) {
      $('#ca-tm').onchange = () => {
        const creating = $('#ca-tm').value === '__new__';
        $('#fg-ca-newtm').style.display = creating ? 'block' : 'none';
        if (creating) $('#ca-newtm')?.focus();
      };
    }

    $('#ca-cancel').onclick = () => { closeSheet(); openAdminPanel(); };
    $('#ca-go').onclick = async () => {
      const username = $('#ca-u').value.trim();
      const displayName = $('#ca-n').value.trim() || username;
      const password = $('#ca-p').value;
      if (!username || password.length < 6) {
        $('#ca-err').textContent = 'Enter a username and a password (6+ characters).';
        $('#ca-err').style.display = 'block';
        return;
      }
      const supId = role === 'crew' ? (isSup ? Cloud.user.uid : ($('#ca-sup')?.value || '')) : '';
      let teamId = role === 'crew' ? ($('#ca-tm')?.value || S.teams[0]?.id || '') : '';
      const newTeamName = ($('#ca-newtm')?.value || '').trim();
      const newConexName = ($('#ca-newcx')?.value || '').trim();

      if (role === 'crew' && teamId === '__new__' && !newTeamName) {
        $('#ca-err').textContent = 'Enter a name for the new team.';
        $('#ca-err').style.display = 'block';
        $('#ca-newtm')?.focus();
        return;
      }

      try {
        if (role === 'crew' && teamId === '__new__') {
          const nt = { id: 'team-' + uid(), name: newTeamName, supervisorId: supId };
          S.teams.push(nt);
          await Cloud.pushTeam(nt);
          teamId = nt.id;
        }
        if (role === 'crew' && newConexName && teamId) {
          const nc = { id: 'conex-' + uid(), name: newConexName, teamId, supervisorId: supId };
          S.conexes.push(nc);
          await Cloud.pushConex(nc);
        }
        await Cloud.createManagedAccount({
          username,
          password,
          displayName,
          role,
          supervisorId: supId,
          teamId
        });
        save();
        closeSheet();
        render();
        toast(`Created ${role === 'supervisor' ? 'Supervisor' : 'Crew'} account: ${displayName}`);
        openAdminPanel();
      } catch (err) {
        $('#ca-err').textContent = err?.message || 'Could not create account.';
        $('#ca-err').style.display = 'block';
      }
    };
  }

  function openTransferTeamSupervisorSheet() {
    if (Cloud.profile?.role !== 'admin') return;
    const sups = Cloud.supervisors ? Cloud.supervisors() : [];
    if (!sups.length) { toast('Create a Supervisor first'); return; }
    openSheet('Transfer Team to Supervisor', `
      <div class="info-callout" style="margin-bottom:14px">
        <span>Only the <strong>Main Admin</strong> can move a Team (along with its Conex boxes, inventory, and crew) to a different Supervisor.</span>
      </div>
      <div class="field">
        <label for="tts-tm">Team to transfer</label>
        <select id="tts-tm">${S.teams.map((t) => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label for="tts-sup">New Supervisor</label>
        <select id="tts-sup">${sups.map((s) => `<option value="${esc(s.uid)}">${esc(s.displayName || s.username)}</option>`).join('')}</select>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="tts-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="tts-go">Transfer Team</button>`);

    $('#tts-cancel').onclick = () => { closeSheet(); openAdminPanel(); };
    $('#tts-go').onclick = async () => {
      const tid = $('#tts-tm').value;
      const sid = $('#tts-sup').value;
      await Cloud.transferTeamToSupervisor(tid, sid, S.conexes, S.items);
      closeSheet();
      toast('Team transferred to new Supervisor');
    };
  }

  function openSuperView() {
    const isAdmin = Boolean(Cloud.user && Cloud.profile?.role === 'admin');
    const isSup = Boolean(Cloud.user && Cloud.profile?.role === 'supervisor');
    if (!isAdmin && !isSup) {
      toast('Admin or Supervisor access required');
      return;
    }
    const sups = isAdmin && Cloud.supervisors ? Cloud.supervisors() : [];
    const supNameById = (sid) => {
      if (!sid) return 'Main Yard';
      if (isSup && sid === Cloud.user.uid) return Cloud.profile?.displayName || Cloud.profile?.username || 'My Group';
      const u = sups.find((x) => x.uid === sid);
      return u ? (u.displayName || u.username) : 'Supervisor';
    };

    let svQuery = '';
    let svSup = 'all';
    const expandedConex = new Set();

    const itemMatches = (it, q) => {
      if (!q) return true;
      const hay = [it.name, it.size, it.material, it.type, it.bin, it.sku, it.category, it.notes]
        .filter(Boolean).join(' ').toLowerCase();
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    };

    openSheet(isAdmin ? 'Admin Super View' : 'Supervisor Super View', `
      <div class="sv-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <input id="sv-q" type="search" placeholder="Search material, size, bin, crew, or Conex…" autocomplete="off">
      </div>
      ${isAdmin && sups.length ? `<div class="sv-chips" id="sv-chips"></div>` : ''}
      <div id="sv-meta" class="sv-crew-meta" style="margin-bottom:10px"></div>
      <div id="sv-body"></div>
    `,
    `<button type="button" class="btn btn-primary" style="flex:1" id="sv-done">Done</button>`);

    $('#sv-done').onclick = closeSheet;

    const renderSuperView = () => {
      const q = svQuery.trim().toLowerCase();
      const scopeTeams = isAdmin
        ? S.teams
        : S.teams.filter((t) => t.supervisorId === Cloud.user.uid);

      if (isAdmin && sups.length && $('#sv-chips')) {
        const hasUnassigned = scopeTeams.some((t) => !t.supervisorId);
        const chips = [
          { id: 'all', label: `All (${scopeTeams.length})` },
          ...sups.map((s) => ({
            id: s.uid,
            label: `${s.displayName || s.username} (${scopeTeams.filter((t) => t.supervisorId === s.uid).length})`
          })),
          ...(hasUnassigned ? [{ id: '__none__', label: `Unassigned (${scopeTeams.filter((t) => !t.supervisorId).length})` }] : [])
        ];
        $('#sv-chips').innerHTML = chips.map((c) => `
          <button type="button" class="sv-chip ${svSup === c.id ? 'is-active' : ''}" data-sv-sup="${esc(c.id)}">${esc(c.label)}</button>
        `).join('');
        $('#sv-chips').querySelectorAll('[data-sv-sup]').forEach((b) => {
          b.onclick = () => { svSup = b.dataset.svSup; renderSuperView(); };
        });
      }

      const filteredTeams = scopeTeams.filter((t) => {
        if (!isAdmin || svSup === 'all') return true;
        if (svSup === '__none__') return !t.supervisorId;
        return t.supervisorId === svSup;
      });

      let totalMatchedCrews = 0;
      let totalMatchedConex = 0;
      let totalMatchedItems = 0;

      const cards = filteredTeams.map((tm) => {
        const crewName = teamDisplayName(tm);
        const supLabel = supNameById(tm.supervisorId);
        const boxes = conexesForTeam(tm.id);
        const crewMatch = q && (crewName.toLowerCase().includes(q) || tm.name.toLowerCase().includes(q) || supLabel.toLowerCase().includes(q));

        const boxBlocks = boxes.map((cx) => {
          const allItems = S.items.filter((i) => i.conexId === cx.id);
          const conexMatch = q && cx.name.toLowerCase().includes(q);
          const matchedItems = (!q || crewMatch || conexMatch)
            ? allItems
            : allItems.filter((i) => itemMatches(i, q));

          if (q && !crewMatch && !conexMatch && !matchedItems.length) return '';

          totalMatchedConex += 1;
          totalMatchedItems += matchedItems.length;
          const lowCount = matchedItems.filter((i) => statusOf(i) !== 'ok').length;
          const isOpen = Boolean(q) || expandedConex.has(cx.id);

          return `
            <div class="sv-conex-block">
              <div class="sv-conex-row">
                <div class="sv-conex-info">
                  <div class="sv-conex-title">
                    <span>${esc(cx.name)}</span>
                    <span class="conex-pill">${matchedItems.length} ${q ? 'MATCH' : 'PART'}${matchedItems.length === 1 ? '' : (q ? 'ES' : 'S')}</span>
                    ${lowCount ? `<span class="lock-pill">${lowCount} low/out</span>` : ''}
                  </div>
                  <div class="sv-conex-sub">${allItems.length} total material${allItems.length === 1 ? '' : 's'} in box</div>
                </div>
                <div class="sv-conex-actions">
                  ${!q && allItems.length ? `<button type="button" class="sv-mini-btn" data-sv-toggle="${esc(cx.id)}">${isOpen ? 'Hide' : 'Materials'}</button>` : ''}
                  <button type="button" class="sv-mini-btn primary" data-sv-open="${esc(cx.id)}">Open</button>
                </div>
              </div>
              ${isOpen ? (matchedItems.length ? `
                <div class="sv-items">
                  ${matchedItems.map((it) => {
                    const st = statusOf(it);
                    const spec = [it.size, it.material, it.bin ? `Bin ${it.bin}` : ''].filter(Boolean).join(' · ');
                    return `
                      <button type="button" class="sv-item-row" data-sv-item="${esc(it.id)}" data-sv-item-conex="${esc(cx.id)}">
                        <div class="sv-item-copy">
                          <div class="sv-item-name">${esc(it.name)}</div>
                          <div class="sv-item-spec">${esc(spec || it.category || 'Material')}</div>
                        </div>
                        <span class="sv-item-qty ${st === 'out' ? 'is-out' : st === 'low' ? 'is-low' : ''}">${it.qty} ${esc(it.unit || 'ea')}</span>
                      </button>`;
                  }).join('')}
                </div>` : '<div class="sv-conex-sub" style="margin-top:6px">No materials in this Conex yet.</div>') : ''}
            </div>`;
        }).filter(Boolean);

        if (q && !crewMatch && !boxBlocks.length) return '';
        totalMatchedCrews += 1;

        return `
          <div class="sv-crew-card">
            <div class="sv-crew-head">
              <div>
                <div class="sv-crew-name">${esc(crewName)}</div>
                <div class="sv-crew-meta">${esc(supLabel)} · ${boxes.length} Conex box${boxes.length === 1 ? '' : 'es'}</div>
              </div>
              ${boxes.length ? `<button type="button" class="sv-mini-btn" data-sv-team="${esc(tm.id)}">View Crew</button>` : ''}
            </div>
            ${boxBlocks.length ? boxBlocks.join('') : '<div class="sv-conex-sub">No Conex box assigned to this crew yet.</div>'}
          </div>`;
      }).filter(Boolean);

      $('#sv-meta').textContent = q
        ? `${totalMatchedItems} matching material${totalMatchedItems === 1 ? '' : 's'} across ${totalMatchedConex} Conex box${totalMatchedConex === 1 ? '' : 'es'} (${totalMatchedCrews} crew${totalMatchedCrews === 1 ? '' : 's'})`
        : `${totalMatchedCrews} crew${totalMatchedCrews === 1 ? '' : 's'} · ${totalMatchedConex} Conex box${totalMatchedConex === 1 ? '' : 'es'} · ${totalMatchedItems} total materials`;

      $('#sv-body').innerHTML = cards.length
        ? cards.join('')
        : `<div class="empty-note" style="padding:18px 8px;text-align:center">${q ? `No crews, Conex boxes, or materials match "${esc(svQuery)}".` : 'No crews in the yard yet.'}</div>`;

      $('#sv-body').querySelectorAll('[data-sv-toggle]').forEach((b) => {
        b.onclick = () => {
          const id = b.dataset.svToggle;
          if (expandedConex.has(id)) expandedConex.delete(id);
          else expandedConex.add(id);
          renderSuperView();
        };
      });
      $('#sv-body').querySelectorAll('[data-sv-open]').forEach((b) => {
        b.onclick = () => {
          S.activeConex = b.dataset.svOpen;
          view = 'stock';
          cat = 'All';
          statusFilter = 'all';
          save();
          closeSheet();
          render();
        };
      });
      $('#sv-body').querySelectorAll('[data-sv-team]').forEach((b) => {
        b.onclick = () => {
          S.activeConex = 'team:' + b.dataset.svTeam;
          view = 'stock';
          cat = 'All';
          statusFilter = 'all';
          save();
          closeSheet();
          render();
        };
      });
      $('#sv-body').querySelectorAll('[data-sv-item]').forEach((b) => {
        b.onclick = () => {
          const itemId = b.dataset.svItem;
          const cxId = b.dataset.svItemConex;
          if (cxId) S.activeConex = cxId;
          view = 'stock';
          save();
          closeSheet();
          render();
          openEdit(itemId);
        };
      });
    };

    $('#sv-q').oninput = (e) => { svQuery = e.target.value; renderSuperView(); };
    renderSuperView();
    setTimeout(() => $('#sv-q')?.focus(), 200);
  }

  function openAdminPanel() {
    const isAdmin = Cloud.user && Cloud.profile?.role === 'admin';
    const isSup = Cloud.user && Cloud.profile?.role === 'supervisor';
    if (!isAdmin && !isSup) {
      toast('Admin or Supervisor access required');
      return;
    }
    const visibleUsers = isAdmin
      ? Cloud.users
      : Cloud.users.filter((u) => u.role === 'crew' && u.supervisorId === Cloud.user.uid);

    const actionsHtml = isAdmin ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <button type="button" class="btn btn-primary" id="adm-new-sup">+ New Supervisor</button>
        <button type="button" class="btn" id="adm-new-crew">+ New Crew</button>
      </div>
      <button type="button" class="btn" style="width:100%;margin-bottom:14px" id="adm-xfer-team">⇄ Transfer Team to Supervisor</button>
    ` : `
      <button type="button" class="btn btn-primary" style="width:100%;margin-bottom:14px" id="adm-new-crew">+ Create Crew Account</button>
    `;

    const rows = visibleUsers.map((u) => `
      <div class="panel" style="margin-bottom:10px;padding:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div>
            <strong>${esc(u.displayName || u.username)}</strong>
            <div style="font-size:12px;color:var(--muted)">@${esc(u.username)}</div>
          </div>
          <span class="badge">${u.role === 'admin' ? 'Main Admin' : u.role === 'supervisor' ? 'Supervisor' : 'Crew'}</span>
        </div>
        <div style="display:grid;grid-template-columns:${isAdmin ? '1fr 1fr' : '1fr'};gap:8px">
          ${isAdmin ? `
            <select class="adm-role" data-uid="${esc(u.uid)}">
              <option value="crew" ${u.role === 'crew' ? 'selected' : ''}>Crew (Own Team)</option>
              <option value="supervisor" ${u.role === 'supervisor' ? 'selected' : ''}>Supervisor (Own Group)</option>
              <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Main Admin (Full Yard)</option>
            </select>` : ''}
          ${u.role === 'crew' ? `
            <select class="adm-team" data-uid="${esc(u.uid)}">
              ${S.teams.map((t) => `<option value="${esc(t.id)}" ${u.teamId === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}
            </select>` : '<div style="font-size:12px;color:var(--muted);align-self:center">Manages own teams</div>'}
        </div>
        ${u.uid !== Cloud.user.uid ? `
          <button type="button" class="btn btn-danger adm-del-user" data-uid="${esc(u.uid)}" data-name="${esc(u.displayName || u.username)}" style="width:100%;margin-top:8px;padding:7px 10px;font-size:12px">Delete username</button>` : ''}
      </div>
    `).join('') || '<div class="empty-note">No accounts in this group yet.</div>';

    openSheet(isAdmin ? 'Main Admin Panel' : 'Supervisor Panel', actionsHtml + rows,
      `<button type="button" class="btn btn-primary" style="flex:1" id="adm-done">Done</button>`);
    $('#adm-done').onclick = closeSheet;
    if ($('#adm-new-sup')) $('#adm-new-sup').onclick = () => { closeSheet(); openCreateAccountSheet('supervisor'); };
    if ($('#adm-new-crew')) $('#adm-new-crew').onclick = () => { closeSheet(); openCreateAccountSheet('crew'); };
    if ($('#adm-xfer-team')) $('#adm-xfer-team').onclick = () => { closeSheet(); openTransferTeamSupervisorSheet(); };
    document.querySelectorAll('.adm-role').forEach((sel) => {
      sel.onchange = async () => {
        const patch = { role: sel.value };
        if (sel.value === 'supervisor') patch.supervisorId = sel.dataset.uid;
        await Cloud.updateUserProfile(sel.dataset.uid, patch);
        toast('Updated account role');
      };
    });
    document.querySelectorAll('.adm-team').forEach((sel) => {
      sel.onchange = async () => {
        await Cloud.updateUserProfile(sel.dataset.uid, { teamId: sel.value });
        toast('Updated crew team');
      };
    });
    document.querySelectorAll('.adm-del-user').forEach((btn) => {
      btn.onclick = () => {
        const uid = btn.dataset.uid;
        const nm = btn.dataset.name || 'this user';
        openSheet('Delete username?', `
          <div class="info-callout">
            <span>Remove <strong>${esc(nm)}</strong> from Pipefitter Inventory? They will immediately lose access to all teams and Conex boxes.</span>
          </div>
        `,
        `<button type="button" class="btn" style="flex:1" id="du-cancel">Cancel</button>
         <button type="button" class="btn btn-danger" style="flex:2" id="du-ok">Delete username</button>`);
        $('#du-cancel').onclick = () => { closeSheet(); openAdminPanel(); };
        $('#du-ok').onclick = async () => {
          try {
            await Cloud.deleteUserProfile(uid);
            closeSheet();
            toast(`Deleted ${nm}`);
            openAdminPanel();
          } catch (err) {
            toast(err?.message || 'Could not delete username');
          }
        };
      };
    });
  }

  function updateAuthGate() {
    const gate = $('#authGate');
    const shell = $('.app-shell');
    const dock = $('.bottom-dock');
    if (!gate || !shell) return;
    const mustSignIn = Boolean(Cloud.configured && !Cloud.user);
    gate.classList.toggle('hidden', !mustSignIn);
    shell.classList.toggle('hidden', mustSignIn);
    if (dock) dock.classList.toggle('hidden', mustSignIn);
    if (mustSignIn) closeSheet();
  }

  async function bootCloud() {
    const submitBtn = $('#ag-submit');
    if (submitBtn && !submitBtn.dataset.bound) {
      submitBtn.dataset.bound = '1';
      const doLogin = async () => {
        const u = ($('#ag-u')?.value || '').trim();
        const p = $('#ag-p')?.value || '';
        if (!u || p.length < 6) {
          $('#ag-err').textContent = 'Enter your username and password.';
          $('#fg-ag-p').classList.add('has-error');
          return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';
        try {
          await Cloud.signIn(u, p);
          $('#fg-ag-p').classList.remove('has-error');
          $('#ag-p').value = '';
          updateAuthGate();
          render();
        } catch (err) {
          $('#ag-err').textContent = 'Invalid username or password.';
          $('#fg-ag-p').classList.add('has-error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign in';
        }
      };
      submitBtn.onclick = doLogin;
      $('#ag-p').onkeydown = (e) => { if (e.key === 'Enter') doLogin(); };
      $('#ag-u').oninput = () => $('#fg-ag-p').classList.remove('has-error');
      $('#ag-p').oninput = () => $('#fg-ag-p').classList.remove('has-error');
    }

    return Cloud.init({
      onStateChange: () => {
        if (Cloud.profile && Cloud.profile.teamId) {
          S.myTeamId = Cloud.profile.teamId;
        }
        updateAuthGate();
        render();
      },
      onRemoteData: (patch) => {
        if (patch.meta && Array.isArray(patch.meta.photoLibrary) && patch.meta.photoLibrary.length) {
          S.photoLib = patch.meta.photoLibrary;
        }
        if (patch.hasRemoteTeams && Array.isArray(patch.teams)) S.teams = patch.teams;
        if (patch.hasRemoteConexes && Array.isArray(patch.conexes)) S.conexes = patch.conexes;
        if (patch.hasRemoteItems && Array.isArray(patch.items)) S.items = patch.items;
        if (Array.isArray(patch.logs)) S.log = patch.logs;
        save();
        render();
      }
    });
  }

  // ---------- Boot ----------
  (async () => {
    await openDB();
    const d = await loadState();
    if (d && Array.isArray(d.items)) {
      S = { ...S, ...d };
      migrateState();
    } else {
      seed();
      save();
    }
    if (Cloud.getSavedConfig && Cloud.getSavedConfig()) {
      Cloud.configured = true;
      updateAuthGate();
    }
    render();
    bootCloud().catch(() => {});
    try {
      if (navigator.storage && navigator.storage.persist) {
        window._persisted = (await navigator.storage.persisted()) || (await navigator.storage.persist());
      }
    } catch (_) {}
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  })();
})();
