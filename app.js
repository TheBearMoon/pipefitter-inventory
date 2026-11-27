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

  // Default built-in studio white-background hardware photo library (editable in Tools)
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
    { id: 'team-1', name: 'Crew A', conex: 'Conex 1' },
    { id: 'team-2', name: 'Crew B', conex: 'Conex 2' }
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
    activeTeam: 'team-1',
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
    S.activeTeam = 'team-1';
    S.photoLib = DEFAULT_PHOTO_LIB.map((p) => ({ ...p }));
    const mk = (name, category, size, material, type, bin, qty, min, unit, sku, photo, teamId) => ({
      id: uid(), name, category, size, material, type, bin, qty, min, unit, sku,
      notes: '', photo, teamId, updated: Date.now(), sample: true
    });
    S.items = [
      mk('Green Fiber Flange Gasket', 'Gaskets', '4"', 'Green Compressed Fiber', '150# Full Face', 'A-1', 24, 10, 'ea', 'GFG-4-150', './assets/parts/green-gasket.jpg', 'team-1'),
      mk('Grey Ring Gasket', 'Gaskets', '4"', 'Flexible Graphite', '150# RF Ring', 'A-2', 16, 10, 'ea', 'GRG-4-150', './assets/parts/grey-gasket.jpg', 'team-1'),
      mk('B7 Stud Bolt w/ 2H Nuts', 'Bolts', '3/4" × 4-1/2"', 'ASTM A193 B7', 'Black Oxide', 'B-1', 6, 20, 'ea', 'B7-34-412', './assets/parts/b7-stud-bolt.jpg', 'team-1'),
      mk('L7 Low-Temp Stud Bolt', 'Bolts', '3/4" × 4-1/2"', 'ASTM A320 L7', 'Alloy Steel', 'B-2', 32, 16, 'ea', 'L7-34-412', './assets/parts/l7-stud-bolt.jpg', 'team-2'),
      mk('B8 Stainless Stud Bolt', 'Bolts', '5/8" × 3-3/4"', '304 Stainless (B8)', 'Heavy Hex Nuts', 'B-3', 14, 12, 'ea', 'B8-58-334', './assets/parts/b8-stainless-stud-bolt.jpg', 'team-1'),
      mk('Galvanized Pipe U-Bolt', 'U-Bolts', '2" Pipe', 'Hot-Dip Galv', '3/8" Rod', 'C-2', 40, 15, 'ea', 'UB-2-HDG', './assets/parts/u-bolt.jpg', 'team-2'),
      mk('J-Bolt Anchor', 'J-Bolts', '1/2" × 12"', 'Hot-Dip Galv', '3" Thread', 'C-5', 0, 10, 'ea', 'JB-12-12', './assets/parts/j-bolt.jpg', 'team-1'),
      mk('Hex Head Pipe Plug', 'Pipe Plugs', '1/2" NPT', '316 Stainless', 'Hex Head', 'D-1', 18, 8, 'ea', 'PP-12-316', './assets/parts/pipe-plug.jpg', 'team-1'),
      mk('Full Port Ball Valve', 'Valves', '2" NPT', '316 Stainless', '1000 WOG', 'E-4', 3, 4, 'ea', 'BV-2-316', './assets/parts/ball-valve.jpg', 'team-2')
    ];
    S.seeded = true;
  }

  function migrateState() {
    let changed = false;
    if (!Array.isArray(S.teams) || !S.teams.length) {
      S.teams = DEFAULT_TEAMS.map((t) => ({ ...t }));
      changed = true;
    }
    if (!S.activeTeam || (S.activeTeam !== 'all' && !S.teams.some((t) => t.id === S.activeTeam))) {
      S.activeTeam = S.teams[0].id;
      changed = true;
    }
    if (!Array.isArray(S.photoLib)) {
      S.photoLib = DEFAULT_PHOTO_LIB.map((p) => ({ ...p }));
      changed = true;
    }
    const defaultTeamId = S.teams[0].id;
    const matchPhoto = (i) => {
      const hay = (i.name + ' ' + i.material + ' ' + i.category).toLowerCase();
      if (hay.includes('green') && hay.includes('gasket')) return './assets/parts/green-gasket.jpg';
      if (hay.includes('gasket')) return './assets/parts/grey-gasket.jpg';
      if (hay.includes('b8')) return './assets/parts/b8-stainless-stud-bolt.jpg';
      if (hay.includes('l7')) return './assets/parts/l7-stud-bolt.jpg';
      if (hay.includes('u-bolt') || hay.includes('u bolt')) return './assets/parts/u-bolt.jpg';
      if (hay.includes('j-bolt') || hay.includes('j bolt')) return './assets/parts/j-bolt.jpg';
      if (hay.includes('bolt') || hay.includes('stud')) return './assets/parts/b7-stud-bolt.jpg';
      if (hay.includes('plug')) return './assets/parts/pipe-plug.jpg';
      if (hay.includes('valve')) return './assets/parts/ball-valve.jpg';
      return '';
    };
    S.items.forEach((i) => {
      if (i.min == null) { i.min = 0; changed = true; }
      if (!i.teamId || !S.teams.some((t) => t.id === i.teamId)) {
        i.teamId = defaultTeamId;
        changed = true;
      }
      if (i.sample && !i.photo) {
        const p = matchPhoto(i);
        if (p) { i.photo = p; changed = true; }
      }
    });
    if (changed) save();
  }

  // ---------- Helpers ----------
  const teamById = (id) => S.teams.find((t) => t.id === id) || S.teams[0];
  const activeTeamObj = () => (S.activeTeam === 'all' ? null : teamById(S.activeTeam));
  const teamItems = () => (S.activeTeam === 'all' ? S.items : S.items.filter((i) => i.teamId === S.activeTeam));
  const statusOf = (i) => (i.qty <= 0 ? 'out' : (i.min > 0 && i.qty <= i.min ? 'low' : 'ok'));
  const statusRank = (i) => ({ out: 0, low: 1, ok: 2 }[statusOf(i)]);
  const specLine = (i) => [i.size, i.material, i.type].filter(Boolean).join(' · ');
  const needQty = (i) => Math.max((i.min || 0) * 2 - i.qty, (i.min || 0) - i.qty, 1);
  const lowItems = (items = teamItems()) => items
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
      if (note && !['Edited', 'Restocked'].includes(note) && !note.startsWith('→ ') && !seen.includes(note)) {
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
        } catch (_) {
          cb(r.result);
        }
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

    const cur = activeTeamObj();
    const sw = $('#teamSwitchBtn');
    if (cur) {
      sw.innerHTML = `${ICON.conex}<span class="team-switch-name">${esc(cur.name)}</span><span class="conex-pill">${esc(cur.conex)}</span>${ICON.chevDown}`;
    } else {
      sw.innerHTML = `${ICON.conex}<span class="team-switch-name">All Teams</span><span class="conex-pill">${S.teams.length} CONEX</span>${ICON.chevDown}`;
    }

    const allBtn = $('#teamAllBtn');
    allBtn.classList.toggle('hidden', S.teams.length <= 1);
    allBtn.classList.toggle('is-active', S.activeTeam === 'all');
    allBtn.setAttribute('aria-pressed', String(S.activeTeam === 'all'));
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

    const scoped = teamItems();
    const lows = lowItems(scoped);
    const n = lows.length;
    ['#roDot', '#roDotDesktop'].forEach((sel) => {
      const el = $(sel);
      if (el) {
        el.textContent = n;
        el.classList.toggle('hidden', !n);
      }
    });

    const cur = activeTeamObj();
    const scopeLogs = cur
      ? S.log.filter((l) => l.teamId === cur.id || l.toTeamId === cur.id)
      : S.log;

    const stockSub = n
      ? `${scoped.length} part${scoped.length === 1 ? '' : 's'} · ${n} need${n === 1 ? 's' : ''} reorder`
      : `${scoped.length} part${scoped.length === 1 ? '' : 's'} · All stocked`;

    const titles = {
      stock: ['Pipefitter Inventory', stockSub],
      reorder: ['Reorder List', n ? `${n} part${n === 1 ? '' : 's'} at or below minimum` : 'Everything above minimum'],
      activity: ['Activity Log', `${scopeLogs.length} recorded update${scopeLogs.length === 1 ? '' : 's'}`],
      tools: ['Tools & Settings', 'Teams, photo library, categories & backup']
    };
    $('#pageTitle').textContent = titles[view][0];
    $('#pageSub').textContent = titles[view][1];

    ({ stock: renderStock, reorder: renderReorder, activity: renderActivity, tools: renderTools })[view]();
    lastPopId = null;
  }

  function renderStock() {
    const baseItems = teamItems();
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
      const tm = teamById(i.teamId);
      return [i.name, i.size, i.material, i.type, i.bin, i.sku, i.category, i.notes, tm?.name, tm?.conex]
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

    if (!items.length) {
      const hasAny = baseItems.length > 0;
      const cur = activeTeamObj();
      $('#list').innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-icon">${ICON.box}</div>
          <h3>${hasAny ? 'No matching parts' : (cur ? `${esc(cur.conex)} is empty` : 'Your inventory is empty')}</h3>
          <p>${hasAny ? 'Try clearing your search or switching back to All categories and stock levels.' : `Add your first gasket, stud bolt, plug, or valve${cur ? ` to ${esc(cur.name)} (${esc(cur.conex)})` : ''}.`}</p>
          ${hasAny
            ? `<button type="button" class="btn btn-outline" id="clearFiltersBtn">Show all parts</button>`
            : `<button type="button" class="btn btn-primary" id="emptyAddBtn">${ICON.plus}Add first item</button>`}
        </div>`;
      return;
    }

    $('#list').innerHTML = items.map(renderCard).join('');
  }

  function renderCard(i) {
    const st = statusOf(i);
    const lbl = { ok: 'In stock', low: 'Low', out: 'Out' }[st];
    const pct = i.min > 0 ? Math.min(100, Math.round((i.qty / (i.min * 2)) * 100)) : (i.qty > 0 ? 100 : 0);
    const details = [i.material, i.type].filter(Boolean).join(' · ');
    const popCls = lastPopId === i.id ? 'is-pop' : '';
    const tm = teamById(i.teamId);
    const showConex = S.activeTeam === 'all' && tm;

    return `
      <article class="item-card" data-id="${i.id}">
        <button type="button" class="item-card-top" data-edit="${i.id}" aria-label="Edit ${esc(i.name)}">
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
              ${showConex ? `<span class="conex-tag">${esc(tm.conex)}</span>` : ''}
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
            <button type="button" class="step-btn is-minus" data-adj="-5" ${i.qty <= 0 ? 'disabled' : ''} aria-label="Remove 5 ${esc(i.name)}">−5</button>
            <button type="button" class="step-btn is-minus" data-adj="-1" ${i.qty <= 0 ? 'disabled' : ''} aria-label="Remove 1 ${esc(i.name)}">−1</button>
            <button type="button" class="qty-btn is-${st}" data-count="${i.id}" aria-label="Adjust or transfer ${esc(i.name)}, currently ${i.qty} ${esc(i.unit || 'ea')}">
              <span class="qty-val ${popCls}">${i.qty}</span>
              <span class="qty-unit">${esc(i.unit || 'ea')}</span>
            </button>
            <button type="button" class="step-btn is-plus" data-adj="1" aria-label="Add 1 ${esc(i.name)}">+1</button>
            <button type="button" class="step-btn is-plus" data-adj="5" aria-label="Add 5 ${esc(i.name)}">+5</button>
          </div>
        </div>
      </article>`;
  }

  function renderReorder() {
    const items = lowItems();
    if (!items.length) {
      const cur = activeTeamObj();
      $('#v-reorder').innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${ICON.checkCircle}</div>
          <h3>All stocked up</h3>
          <p>${cur ? `Nothing in ${esc(cur.name)} (${esc(cur.conex)}) is at or below its reorder point.` : 'Nothing is at or below its reorder point.'} Set a Reorder at count on any part to track it automatically here.</p>
          <button type="button" class="btn btn-outline" data-v="stock">Back to Stock</button>
        </div>`;
      return;
    }

    const outCount = items.filter((i) => i.qty <= 0).length;
    const lowCount = items.length - outCount;
    const totalOrder = items.reduce((sum, i) => sum + needQty(i), 0);

    $('#v-reorder').innerHTML = `
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
          const tm = teamById(i.teamId);
          return `
            <div class="reorder-card ${isOut ? 'is-out' : ''}">
              <div class="part-thumb ${i.photo ? '' : 'is-empty'}" style="width:52px;height:52px">
                ${i.photo ? `<img src="${esc(i.photo)}" alt="${esc(i.name)}" loading="lazy" width="46" height="46">` : ICON.box}
              </div>
              <button type="button" class="reorder-info" data-edit="${i.id}">
                <div class="item-name" style="font-size:var(--text-sm)">${esc(i.name)}</div>
                <div class="spec-line" style="margin-top:3px">
                  ${i.size ? `<span class="spec-size">${esc(i.size)}</span>` : ''}
                  ${S.activeTeam === 'all' && tm ? `<span class="conex-tag">${esc(tm.conex)}</span>` : ''}
                  ${i.bin ? `<span class="bin-tag">BIN ${esc(i.bin)}</span>` : ''}
                </div>
                <div class="loc-line" style="margin-top:4px">
                  <span>On hand <strong style="color:var(--color-text)">${i.qty}</strong> ${esc(i.unit || 'ea')}</span>
                  <span>Min ${i.min}</span>
                </div>
              </button>
              <div class="reorder-right">
                <span class="order-badge">Order ${order} ${esc(i.unit || 'ea')}</span>
                <button type="button" class="receive-btn" data-receive="${i.id}" data-qty="${order}">
                  ${ICON.check}Receive +${order}
                </button>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderActivity() {
    const cur = activeTeamObj();
    const scoped = cur ? S.log.filter((l) => l.teamId === cur.id || l.toTeamId === cur.id) : S.log;

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
      if (actFilter === 'xfer') return l.kind === 'xfer';
      if (actFilter === 'out') return l.kind !== 'set' && l.kind !== 'xfer' && l.delta < 0;
      if (actFilter === 'in') return l.kind !== 'set' && l.kind !== 'xfer' && l.delta > 0;
      return l.kind === 'set' || l.kind === 'add' || l.kind === 'del';
    });

    if (!entries.length) {
      $('#v-activity').innerHTML = `${scoped.length ? filterBar : ''}
        <div class="empty-state">
          <div class="empty-icon">${ICON.clock}</div>
          <h3>${scoped.length ? 'No matching activity' : 'No activity logged yet'}</h3>
          <p>${scoped.length ? 'Try switching the activity filter back to All.' : 'Every check-in, check-out, Conex transfer, restock, and count edit appears here automatically.'}</p>
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
      const k = l.kind === 'xfer' ? 'xfer' : (l.kind === 'set' ? 'set' : (l.delta >= 0 ? 'in' : 'out'));
      const sign = l.kind === 'xfer' ? `⇄${Math.abs(l.delta)}`
        : l.kind === 'set' ? `=${l.to}`
        : (l.delta > 0 ? `+${l.delta}` : `${l.delta}`);
      const verb = l.kind === 'xfer' ? 'Transferred'
        : l.kind === 'set' ? 'Count set'
        : l.kind === 'add' ? 'Added'
        : l.kind === 'del' ? 'Removed'
        : (l.delta > 0 ? 'Checked in' : 'Checked out');
      const tm = l.teamId ? teamById(l.teamId) : null;
      const toTm = l.toTeamId ? teamById(l.toTeamId) : null;
      const routeTag = l.kind === 'xfer' && tm && toTm
        ? `<span class="act-note">${esc(tm.conex)} → ${esc(toTm.conex)}</span>`
        : (S.activeTeam === 'all' && tm ? `<span class="act-note">${esc(tm.conex)}</span>` : '');

      html += `
        <div class="act-row">
          <div class="act-delta ${k}">${esc(sign)}</div>
          <div class="act-copy">
            <div class="act-title">${esc(l.name)}</div>
            <div class="act-sub">
              <span>${verb} · ${l.from} → ${l.to}</span>
              ${routeTag}
              ${l.note ? `<span class="act-note">${esc(l.note)}</span>` : ''}
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
    const cur = activeTeamObj();
    const libModified = DEFAULT_PHOTO_LIB.some((def) => {
      const curP = S.photoLib.find((p) => p.id === def.id);
      return !curP || curP.label !== def.label || curP.src !== def.src;
    });

    $('#v-tools').innerHTML = `
      <div class="tools-grid">
        <div class="panel">
          <h2 class="panel-title">Teams &amp; Conex Boxes</h2>
          ${S.teams.map((t) => {
            const cnt = S.items.filter((i) => i.teamId === t.id).length;
            const low = S.items.filter((i) => i.teamId === t.id && statusOf(i) !== 'ok').length;
            return `
              <button type="button" class="list-item" data-editteam="${esc(t.id)}">
                <span class="li-icon">${ICON.conex}</span>
                <span class="li-text">
                  <span class="li-label">${esc(t.name)} <span class="conex-pill" style="margin-left:6px">${esc(t.conex)}</span></span>
                  <span class="li-desc">${cnt} part${cnt === 1 ? '' : 's'}${low ? ` · ${low} low/out` : ''}${S.activeTeam === t.id ? ' · Active' : ''}</span>
                </span>
                <span class="li-chev">${ICON.chev}</span>
              </button>`;
          }).join('')}
          <button type="button" class="list-item" id="addTeamBtn">
            <span class="li-icon">${ICON.plus}</span>
            <span class="li-text">
              <span class="li-label">Add team &amp; Conex box</span>
              <span class="li-desc">Each team gets its own dedicated Conex inventory</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
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
          ${cur ? `
            <button type="button" class="list-item" id="bkTeam">
              <span class="li-icon">${ICON.share}</span>
              <span class="li-text">
                <span class="li-label">Export ${esc(cur.name)} · ${esc(cur.conex)} (JSON)</span>
                <span class="li-desc">Share just this Conex box offline with another phone</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          <button type="button" class="list-item" id="rs">
            <span class="li-icon">${ICON.ul}</span>
            <span class="li-text">
              <span class="li-label">Restore from backup</span>
              <span class="li-desc">Load a previously saved full or single-Conex backup</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
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
          <h2 class="panel-title">Device &amp; Storage</h2>
          <div class="list-item">
            <span class="li-icon">${ICON.shield}</span>
            <span class="li-text">
              <span class="li-label">Offline storage</span>
              <span class="li-desc">${engineLabel} · ${persisted ? 'Protected' : 'Back up regularly'} · ${S.teams.length} team${S.teams.length === 1 ? '' : 's'} · ${S.items.length} part${S.items.length === 1 ? '' : 's'} · ${S.log.length} log${S.log.length === 1 ? '' : 's'}</span>
            </span>
          </div>
        </div>

        <div class="panel">
          <h2 class="panel-title">Reset</h2>
          ${hasSamples ? `
            <button type="button" class="list-item" id="clrS">
              <span class="li-icon">${ICON.trash}</span>
              <span class="li-text">
                <span class="li-label">Clear sample items</span>
                <span class="li-desc">Removes starter parts while keeping everything you added</span>
              </span>
              <span class="li-chev">${ICON.chev}</span>
            </button>` : ''}
          <button type="button" class="list-item is-danger" id="rst">
            <span class="li-icon">${ICON.trash}</span>
            <span class="li-text">
              <span class="li-label">Reset everything</span>
              <span class="li-desc">Permanently delete all items and history</span>
            </span>
            <span class="li-chev">${ICON.chev}</span>
          </button>
        </div>
      </div>
      <div class="tools-footer">Pipefitter Inventory · Works 100% offline · Data stays on your device</div>`;
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
    toastTimer = setTimeout(() => {
      $('#toast').classList.remove('is-open');
    }, undo ? 4400 : 2800);
  }

  function logIt(i, kind, from, to, note, extra) {
    S.log.unshift({
      t: Date.now(),
      id: i.id,
      teamId: i.teamId,
      name: i.name,
      kind,
      delta: to - from,
      from,
      to,
      note: note || '',
      ...(extra || {})
    });
    if (S.log.length > 1000) S.log.length = 1000;
  }

  function setQty(i, to, kind, note) {
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

  function transferQty(srcItem, toTeamId, amount, note) {
    const qty = Math.min(srcItem.qty, Math.max(0, Math.round(amount)));
    if (qty <= 0) {
      toast('Enter a quantity greater than 0');
      return;
    }
    const destTeam = teamById(toTeamId);
    if (!destTeam || destTeam.id === srcItem.teamId) return;

    const prevSrcQty = srcItem.qty;
    const prevLogLen = S.log.length;
    const matchKey = (x) => [x.name, x.size, x.material, x.category].map((s) => String(s || '').trim().toLowerCase()).join('|');
    const key = matchKey(srcItem);

    let destItem = S.items.find((x) => x.teamId === toTeamId && matchKey(x) === key);
    let createdDest = false;
    let prevDestQty = destItem ? destItem.qty : 0;

    srcItem.qty = Math.max(0, srcItem.qty - qty);
    srcItem.updated = Date.now();

    if (destItem) {
      destItem.qty += qty;
      destItem.updated = Date.now();
    } else {
      destItem = {
        ...srcItem,
        id: uid(),
        teamId: toTeamId,
        qty,
        updated: Date.now()
      };
      delete destItem.sample;
      S.items.push(destItem);
      createdDest = true;
    }

    lastPopId = srcItem.id;
    logIt(srcItem, 'xfer', prevSrcQty, srcItem.qty, note, { toTeamId });
    save();
    render();
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (_) {}

    toast(`Transferred ${qty} ${srcItem.unit || 'ea'} to ${destTeam.conex}`, () => {
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

  // Switch Team / Conex Sheet
  function openTeamSwitcher() {
    const totalLow = lowItems(S.items).length;
    openSheet('Switch Team / Conex', `
      <div>
        ${S.teams.map((t) => {
          const items = S.items.filter((i) => i.teamId === t.id);
          const lows = items.filter((i) => statusOf(i) !== 'ok').length;
          const active = S.activeTeam === t.id;
          return `
            <button type="button" class="team-option ${active ? 'is-active' : ''}" data-pick-team="${esc(t.id)}">
              <div class="team-option-copy">
                <div class="team-option-title">
                  <span>${esc(t.name)}</span>
                  <span class="conex-pill">${esc(t.conex)}</span>
                </div>
                <div class="team-option-meta">${items.length} part${items.length === 1 ? '' : 's'}${lows ? ` · ${lows} low/out` : ' · All stocked'}</div>
              </div>
              ${active ? ICON.check : ''}
            </button>`;
        }).join('')}

        ${S.teams.length > 1 ? `
          <button type="button" class="team-option ${S.activeTeam === 'all' ? 'is-active' : ''}" data-pick-team="all">
            <div class="team-option-copy">
              <div class="team-option-title">
                <span>All Teams</span>
                <span class="conex-pill">${S.teams.length} CONEX</span>
              </div>
              <div class="team-option-meta">${S.items.length} total part${S.items.length === 1 ? '' : 's'}${totalLow ? ` · ${totalLow} low/out` : ''}</div>
            </div>
            ${S.activeTeam === 'all' ? ICON.check : ''}
          </button>` : ''}
      </div>
    `,
    `<button type="button" class="btn btn-outline" style="flex:1" id="swAddTeam">${ICON.plus}Add team &amp; Conex</button>`);

    document.querySelectorAll('[data-pick-team]').forEach((b) => {
      b.onclick = () => {
        S.activeTeam = b.dataset.pickTeam;
        cat = 'All';
        statusFilter = 'all';
        save();
        closeSheet();
        render();
      };
    });
    $('#swAddTeam').onclick = () => openTeamEditor(null);
  }

  // Add / Edit Team & Conex Sheet
  function openTeamEditor(teamId) {
    const existing = teamId ? S.teams.find((t) => t.id === teamId) : null;
    const nextNum = S.teams.length + 1;
    const itemCount = existing ? S.items.filter((i) => i.teamId === existing.id).length : 0;

    openSheet(existing ? 'Edit team & Conex' : 'New team & Conex', `
      <div class="field" id="fg-tname">
        <label for="t-name">Team / Crew name</label>
        <input id="t-name" value="${esc(existing ? existing.name : '')}" placeholder="e.g. Crew ${String.fromCharCode(64 + nextNum)}, Turnaround, Fab Shop" autocomplete="off">
        <div class="field-error">Enter a team name.</div>
      </div>
      <div class="field" id="fg-tconex">
        <label for="t-conex">Assigned Conex box</label>
        <input id="t-conex" value="${esc(existing ? existing.conex : `Conex ${nextNum}`)}" placeholder="e.g. Conex ${nextNum}" autocomplete="off">
        <div class="field-error">Enter a Conex box label.</div>
      </div>
      ${existing && S.teams.length > 1 ? `
        <div class="btn-row" id="teamDelRow" style="margin-top:var(--space-2)">
          <button type="button" class="btn btn-danger" style="flex:1" id="t-del">${ICON.trash}Remove team</button>
        </div>
        <div class="inline-confirm hidden" id="teamDelConfirm">
          <span>${itemCount ? `Move ${itemCount} part${itemCount === 1 ? '' : 's'} first` : `Remove ${esc(existing.name)}?`}</span>
          <div class="btn-row">
            <button type="button" class="btn btn-sm btn-outline" id="t-del-no">Cancel</button>
            ${itemCount ? '' : `<button type="button" class="btn btn-sm btn-danger-solid" id="t-del-yes">Remove</button>`}
          </div>
        </div>` : ''}
    `,
    `<button type="button" class="btn" style="flex:1" id="t-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="t-save">${existing ? 'Save changes' : 'Add team'}</button>`);

    $('#t-name').oninput = () => $('#fg-tname').classList.remove('has-error');
    $('#t-conex').oninput = () => $('#fg-tconex').classList.remove('has-error');
    $('#t-cancel').onclick = closeSheet;
    $('#t-save').onclick = () => {
      const name = $('#t-name').value.trim();
      const conex = $('#t-conex').value.trim();
      if (!name) { $('#fg-tname').classList.add('has-error'); $('#t-name').focus(); return; }
      if (!conex) { $('#fg-tconex').classList.add('has-error'); $('#t-conex').focus(); return; }
      if (existing) {
        existing.name = name;
        existing.conex = conex;
        toast(`Updated ${name} (${conex})`);
      } else {
        const nt = { id: 'team-' + uid(), name, conex };
        S.teams.push(nt);
        S.activeTeam = nt.id;
        toast(`Added ${name} (${conex})`);
      }
      save();
      closeSheet();
      render();
    };

    if (existing && S.teams.length > 1) {
      $('#t-del').onclick = () => {
        if (itemCount) {
          toast(`Transfer or remove ${itemCount} part${itemCount > 1 ? 's' : ''} in ${existing.conex} first`);
          return;
        }
        $('#teamDelRow').classList.add('hidden');
        $('#teamDelConfirm').classList.remove('hidden');
      };
      $('#t-del-no').onclick = () => {
        $('#teamDelConfirm').classList.add('hidden');
        $('#teamDelRow').classList.remove('hidden');
      };
      if ($('#t-del-yes')) {
        $('#t-del-yes').onclick = () => {
          S.teams = S.teams.filter((t) => t.id !== existing.id);
          if (S.activeTeam === existing.id) S.activeTeam = S.teams[0].id;
          save();
          closeSheet();
          render();
          toast(`Removed ${existing.name}`);
        };
      }
    }
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
        // Propagate replaced photo cleanly to any items using that exact library photo
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
      $('#lp-del').onclick = () => {
        $('#lpDelRow').classList.add('hidden');
        $('#lpDelConfirm').classList.remove('hidden');
      };
      $('#lp-del-no').onclick = () => {
        $('#lpDelConfirm').classList.add('hidden');
        $('#lpDelRow').classList.remove('hidden');
      };
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
    compressImage(f, (dataUrl) => {
      libEditSrc = dataUrl;
      updateLibPhotoPreview();
    });
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
      b.onclick = () => {
        S.sort = b.dataset.pickSort;
        save();
        closeSheet();
        renderStock();
      };
    });
  }

  // Add / Edit Item Sheet
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
    editing = id || null;
    const defaultTeamId = S.activeTeam !== 'all' ? S.activeTeam : S.teams[0].id;
    const i = src
      ? { ...src }
      : {
          name: '',
          category: cat !== 'All' ? cat : (S.cats[0] || 'Gaskets'),
          teamId: defaultTeamId,
          size: '', material: '', type: '', bin: '', sku: '',
          unit: 'ea', qty: 0, min: 0, notes: '', photo: ''
        };
    if (dupFrom) {
      i.name = `${i.name} (copy)`;
      i.qty = 0;
    }
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
        <label for="f-team">Team &amp; Conex box</label>
        <select id="f-team">${S.teams.map((t) => `<option value="${esc(t.id)}" ${t.id === i.teamId ? 'selected' : ''}>${esc(t.name)} — ${esc(t.conex)}</option>`).join('')}</select>
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
      btn.onclick = () => {
        editPhoto = btn.dataset.libSrc;
        updatePhotoPreview();
      };
    });
    $('#f-cancel').onclick = closeSheet;
    $('#f-save').onclick = saveEdit;

    if (id) {
      $('#f-dup').onclick = () => {
        const it = S.items.find((x) => x.id === id);
        openEdit(null, it);
      };
      $('#f-del').onclick = () => {
        $('#editExtraActions').classList.add('hidden');
        $('#delConfirmBar').classList.remove('hidden');
      };
      $('#f-del-no').onclick = () => {
        $('#delConfirmBar').classList.add('hidden');
        $('#editExtraActions').classList.remove('hidden');
      };
      $('#f-del-yes').onclick = () => {
        const idx = S.items.findIndex((x) => x.id === id);
        if (idx < 0) return;
        const it = S.items[idx];
        S.items.splice(idx, 1);
        logIt(it, 'del', it.qty, 0);
        save();
        closeSheet();
        render();
        toast(`Deleted ${it.name}`, () => {
          S.items.splice(idx, 0, it);
          S.log.shift();
          save();
          render();
        });
      };
    }

    if (!id && !dupFrom) setTimeout(() => $('#f-name')?.focus(), 260);
  }

  function saveEdit() {
    const nameEl = $('#f-name');
    const name = nameEl.value.trim();
    if (!name) {
      $('#fg-name').classList.add('has-error');
      nameEl.focus();
      return;
    }
    const data = {
      name,
      teamId: $('#f-team').value,
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
    compressImage(f, (dataUrl) => {
      editPhoto = dataUrl;
      updatePhotoPreview();
    });
    e.target.value = '';
  };

  // Precision Count / Check-out / Check-in / One-Tap Conex Transfer Sheet
  function openCount(id) {
    const i = S.items.find((x) => x.id === id);
    if (!i) return;
    let mode = i.qty > 0 ? 'out' : 'in';
    const srcTeam = teamById(i.teamId);
    const otherTeams = S.teams.filter((t) => t.id !== i.teamId);
    const notes = recentNotes();

    openSheet('Adjust or transfer', `
      <div class="count-header">
        <div class="part-thumb ${i.photo ? '' : 'is-empty'}" style="width:50px;height:50px">
          ${i.photo ? `<img src="${esc(i.photo)}" alt="${esc(i.name)}">` : ICON.box}
        </div>
        <div style="min-width:0;flex:1">
          <div class="item-name" style="font-size:var(--text-sm)">${esc(i.name)}</div>
          <div class="loc-line" style="margin-top:2px">
            ${srcTeam ? `<span class="conex-tag">${esc(srcTeam.conex)}</span>` : ''}
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
        ${otherTeams.length ? `
          <label for="c-dest">Transfer from ${esc(srcTeam.conex)} to:</label>
          <select id="c-dest">${otherTeams.map((t) => `<option value="${esc(t.id)}">${esc(t.name)} — ${esc(t.conex)}</option>`).join('')}</select>
        ` : `
          <div style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-bottom:8px">Add a second Team &amp; Conex box in Tools to transfer stock between boxes.</div>
          <button type="button" class="btn btn-outline btn-sm" id="xferAddTeam">${ICON.plus}Add another team</button>
        `}
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
        const destTeam = destSel ? teamById(destSel.value) : null;
        const moveQty = Math.min(i.qty, v);
        const rem = i.qty - moveQty;
        okBtn.disabled = !destTeam || moveQty <= 0;
        okBtn.style.opacity = okBtn.disabled ? '0.5' : '1';
        $('#c-hint').innerHTML = destTeam
          ? `<span>${esc(srcTeam.conex)}: ${i.qty} → <strong style="color:var(--color-text)">${rem} ${esc(i.unit || 'ea')}</strong> · ${esc(destTeam.conex)}: <strong style="color:var(--color-ok)">+${moveQty}</strong></span>`
          : `<span>No destination Conex box available yet</span>`;
        okBtn.textContent = destTeam ? `Transfer ${moveQty} to ${destTeam.conex}` : 'Transfer';
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
    if ($('#xferAddTeam')) $('#xferAddTeam').onclick = () => openTeamEditor(null);

    document.querySelectorAll('.preset-btn').forEach((b) => {
      b.onclick = () => { nEl.value = b.dataset.preset; updateHint(); };
    });
    document.querySelectorAll('.note-chip').forEach((b) => {
      b.onclick = () => { $('#c-note').value = b.dataset.note; };
    });

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
        if (destId) transferQty(i, destId, v, note);
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
      <div class="field-hint">New categories appear immediately in your Stock filter strip and item form.</div>
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

  // Clear Sample Items Sheet
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

  // Restore Backup Confirmation Sheet (supports both full backups & single-Conex backups!)
  function openRestoreConfirm(parsed) {
    const isSingleTeam = parsed.scope === 'team' && parsed.team;
    openSheet(isSingleTeam ? 'Import Conex box' : 'Restore backup', `
      <div class="callout is-warn">
        ${ICON.alert}
        <div>${isSingleTeam
          ? `Import <strong>${parsed.items.length} parts</strong> for <strong>${esc(parsed.team.name)} (${esc(parsed.team.conex)})</strong>? Existing items in that Conex will be updated; other teams stay untouched.`
          : `Replace your current inventory (${S.items.length} parts) with <strong>${parsed.items.length} parts</strong> from this backup file?`}</div>
      </div>
    `,
    `<button type="button" class="btn" style="flex:1" id="rs-cancel">Cancel</button>
     <button type="button" class="btn btn-primary" style="flex:2" id="rs-ok">${isSingleTeam ? 'Import Conex' : 'Restore backup'}</button>`);

    $('#rs-cancel').onclick = closeSheet;
    $('#rs-ok').onclick = () => {
      if (isSingleTeam) {
        let tm = S.teams.find((t) => t.id === parsed.team.id || (t.name === parsed.team.name && t.conex === parsed.team.conex));
        if (!tm) {
          tm = { id: parsed.team.id || ('team-' + uid()), name: parsed.team.name, conex: parsed.team.conex };
          S.teams.push(tm);
        }
        S.items = S.items.filter((i) => i.teamId !== tm.id);
        parsed.items.forEach((i) => S.items.push({ min: 0, unit: 'ea', ...i, teamId: tm.id }));
        S.activeTeam = tm.id;
        toast(`Imported ${parsed.items.length} parts into ${tm.conex}`);
      } else {
        S = {
          ...S,
          items: parsed.items.map((i) => ({ min: 0, unit: 'ea', ...i })),
          log: Array.isArray(parsed.log) ? parsed.log : [],
          cats: Array.isArray(parsed.cats) && parsed.cats.length ? parsed.cats : DEF_CATS.slice(),
          teams: Array.isArray(parsed.teams) && parsed.teams.length ? parsed.teams : DEFAULT_TEAMS.map((t) => ({ ...t })),
          photoLib: Array.isArray(parsed.photoLib) ? parsed.photoLib : S.photoLib
        };
        migrateState();
        toast(`Restored ${S.items.length} items`);
      }
      cat = 'All';
      statusFilter = 'all';
      save();
      closeSheet();
      render();
    };
  }

  // Reset Everything Sheet — Typed "Delete" Confirmation
  function openReset() {
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
      const tm = teamById(i.teamId);
      return [tm?.name || '', tm?.conex || '', i.name, i.category, i.size, i.material, i.type, i.bin, i.sku, i.qty, i.unit, i.min, { ok: 'In stock', low: 'Low', out: 'Out' }[statusOf(i)]]
        .concat(withOrder ? [needQty(i)] : [])
        .concat([i.notes]);
    });
    download(name, [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n'), 'text/csv;charset=utf-8');
  }

  function reorderText() {
    const cur = activeTeamObj();
    const hdr = cur ? `Pipefitter Inventory — ${cur.name} (${cur.conex}) Reorder List` : 'Pipefitter Inventory — All Conex Reorder List';
    return hdr + ' (' + new Date().toLocaleDateString() + ')\n\n' +
      lowItems().map((i) => {
        const tm = teamById(i.teamId);
        const cx = !cur && tm ? ` [${tm.conex}]` : '';
        return `• ${needQty(i)} ${i.unit || 'ea'} — ${i.name}${specLine(i) ? ' (' + specLine(i) + ')' : ''}${cx}${i.bin ? ' [Bin ' + i.bin + ']' : ''}${i.sku ? ' #' + i.sku : ''}  (on hand ${i.qty})`;
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
    } catch (_) {
      toast('Could not copy automatically');
    }
  }

  // ---------- Event Delegation ----------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button,[data-edit]');
    if (!t) return;

    if (t.dataset.v) { view = t.dataset.v; render(); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    if (t.dataset.cat) { cat = t.dataset.cat; renderStock(); return; }
    if (t.dataset.st) { statusFilter = t.dataset.st; renderStock(); return; }
    if (t.dataset.af) { actFilter = t.dataset.af; renderActivity(); return; }
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
      case 'teamSwitchBtn':
        openTeamSwitcher();
        break;
      case 'teamAllBtn':
        S.activeTeam = S.activeTeam === 'all' ? S.teams[0].id : 'all';
        cat = 'All';
        statusFilter = 'all';
        save();
        render();
        break;
      case 'addTeamBtn':
        openTeamEditor(null);
        break;
      case 'addLibPhotoBtn':
        openLibPhotoEditor(null);
        break;
      case 'restoreLibBtn':
        openRestoreDefaultPhotos();
        break;
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
      case 'sortBtn':
        openSortSheet();
        break;
      case 'addCat':
        openAddCategory();
        break;
      case 'bk':
        S.lastBackup = Date.now();
        save();
        download(`pipefitter-inventory-backup-${stamp()}.json`, JSON.stringify({ app: 'Pipefitter Inventory', v: 4, ...S }), 'application/json');
        renderTools();
        toast('Full backup saved');
        break;
      case 'bkTeam': {
        const cur = activeTeamObj();
        if (!cur) break;
        const slug = cur.conex.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const items = S.items.filter((i) => i.teamId === cur.id);
        download(`pipefitter-${slug}-${stamp()}.json`, JSON.stringify({ app: 'Pipefitter Inventory', v: 4, scope: 'team', team: cur, items }), 'application/json');
        toast(`Exported ${cur.conex}`);
        break;
      }
      case 'rs':
        $('#fileIn').click();
        break;
      case 'csv':
        exportCSV(S.items, `pipefitter-inventory-${stamp()}.csv`, false);
        toast('CSV exported');
        break;
      case 'clrS':
        openClearSamples();
        break;
      case 'rst':
        openReset();
        break;
      case 'roCopy':
        copyText(reorderText(), t);
        break;
      case 'roCsv':
        exportCSV(lowItems(), `pipefitter-inventory-reorder-${stamp()}.csv`, true);
        toast('Reorder CSV exported');
        break;
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
    if (undoState) {
      undoState();
      undoState = null;
      $('#toast').classList.remove('is-open');
    }
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
      } catch (_) {
        toast('That file is not a valid backup');
      }
    };
    r.readAsText(f);
    e.target.value = '';
  };

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
    render();
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
