const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host:     process.env.DB_HOST     || 'vm3-db-svc',
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'appuser',
  password: process.env.DB_PASSWORD || 'AppPassword123x',
  database: process.env.DB_NAME     || 'appdb',
};

const HTML = `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Infrastructure Dashboard</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        bg:      '#0a0e1a',
        surface: '#111827',
        cyan:    { DEFAULT: '#00e5ff', dim: 'rgba(0,229,255,0.15)' },
        violet:  { DEFAULT: '#7c3aed', dim: 'rgba(124,58,237,0.2)' },
      },
      animation: {
        pulse2: 'pulse2 2s infinite',
        fadein: 'fadein 0.6s ease forwards',
      },
      keyframes: {
        pulse2: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(1.5)' },
        },
        fadein: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  }
}
</script>
<style>
  body { background: #0a0e1a; }
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none; z-index: 0;
  }
  .glow-cyan  { box-shadow: 0 0 20px rgba(0,229,255,0.2); }
  .glow-green { box-shadow: 0 0 8px rgba(16,185,129,0.6); }
  .glow-blue  { box-shadow: 0 0 8px rgba(0,229,255,0.6); }
  .card-hover { transition: all 0.3s; }
  .card-hover:hover {
    border-color: rgba(0,229,255,0.4) !important;
    box-shadow: 0 0 20px rgba(0,229,255,0.1);
    transform: translateY(-2px);
  }
  .delay-1 { animation-delay: 0.1s; opacity:0; }
  .delay-2 { animation-delay: 0.2s; opacity:0; }
  .delay-3 { animation-delay: 0.3s; opacity:0; }
  .delay-4 { animation-delay: 0.4s; opacity:0; }
  .delay-5 { animation-delay: 0.5s; opacity:0; }
</style>
</head>
<body class="font-sans text-slate-200 min-h-screen">
<div class="relative z-10 max-w-5xl mx-auto px-6 py-10">

  <!-- Header -->
  <header class="flex items-center justify-between mb-12 pb-6 border-b border-slate-800 animate-fadein">
    <div class="flex items-center gap-4">
      <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-xl glow-cyan">⬡</div>
      <div>
        <h1 class="text-lg font-extrabold tracking-tight">Projet Fin de Module</h1>
        <p class="text-xs font-mono text-slate-500 tracking-widest uppercase">OpenShift Virtualization · Dakar</p>
      </div>
    </div>
    <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-4 py-2 rounded-full">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse2"></span>
      Système opérationnel
    </div>
  </header>

  <!-- Status cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="animate-fadein delay-1 bg-slate-900 border border-slate-800 rounded-xl p-5 card-hover">
      <p class="text-xs font-mono text-slate-500 tracking-widest uppercase mb-2">Statut global</p>
      <p class="text-lg font-bold text-emerald-400">● EN LIGNE</p>
      <p class="text-xs font-mono text-slate-600 mt-1">Tous les services actifs</p>
    </div>
    <div class="animate-fadein delay-2 bg-slate-900 border border-slate-800 rounded-xl p-5 card-hover">
      <p class="text-xs font-mono text-slate-500 tracking-widest uppercase mb-2">Base de données</p>
      <p class="text-lg font-bold text-amber-400" id="db-status">◌ Connexion...</p>
      <p class="text-xs font-mono text-slate-600 mt-1" id="db-version">MySQL · vm3-db</p>
    </div>
    <div class="animate-fadein delay-3 bg-slate-900 border border-slate-800 rounded-xl p-5 card-hover">
      <p class="text-xs font-mono text-slate-500 tracking-widest uppercase mb-2">Heure serveur</p>
      <p class="text-lg font-bold font-mono" id="server-time">--:--:--</p>
      <p class="text-xs font-mono text-slate-600 mt-1" id="server-date">UTC · Sandbox</p>
    </div>
  </div>

  <!-- Infrastructure nodes -->
  <div class="animate-fadein delay-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Infrastructure · Nœuds</span>
      <span class="text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded">fallilou-dev · OpenShift</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

      <!-- VM1 pfSense -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-lg">🔥</div>
          <span class="text-xs font-mono bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">VM</span>
        </div>
        <p class="font-semibold text-sm mb-1">VM1 · pfSense</p>
        <p class="text-xs font-mono text-slate-500">Fedora · Firewall</p>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-green"></span>
          iptables · NAT · WAN
        </div>
      </div>

      <!-- VM2 Web -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-lg">🌐</div>
          <span class="text-xs font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">POD</span>
        </div>
        <p class="font-semibold text-sm mb-1">VM2 · Web</p>
        <p class="text-xs font-mono text-slate-500">Node.js 18 · Express</p>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 glow-blue"></span>
          port 3000 · DMZ
        </div>
      </div>

      <!-- VM3 DB -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-lg">🗄</div>
          <span class="text-xs font-mono bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">VM</span>
        </div>
        <p class="font-semibold text-sm mb-1">VM3 · MySQL</p>
        <p class="text-xs font-mono text-slate-500">Fedora · MySQL 8.0</p>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400" id="db-dot"></span>
          <span id="db-node-status">port 3306 · LAN</span>
        </div>
      </div>

    </div>
  </div>

  <!-- Firewall rules -->
  <div class="animate-fadein delay-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Règles Firewall · pfSense</span>
      <span class="text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded">iptables · NetworkPolicy</span>
    </div>
    <div class="p-6 flex flex-col gap-3">

      ${[
        { from:'INTERNET', to:'VM2-WEB',  port:':80 :443', allow:true },
        { from:'INTERNET', to:'VM3-DB',   port:':*',       allow:false },
        { from:'LAN',      to:'INTERNET', port:':*',       allow:true },
        { from:'LAN',      to:'DMZ',      port:':*',       allow:true },
        { from:'DMZ',      to:'LAN',      port:':*',       allow:false },
        { from:'DMZ',      to:'INTERNET', port:':80 :443', allow:true },
      ].map(r => `
        <div class="flex items-center gap-3 px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-xs font-mono hover:bg-slate-800 transition-colors">
          <span class="bg-slate-700 text-slate-400 px-2 py-0.5 rounded">${r.from}</span>
          <span class="text-slate-600">→</span>
          <span class="bg-slate-700 text-slate-400 px-2 py-0.5 rounded">${r.to}</span>
          <span class="text-cyan-400">${r.port}</span>
          <span class="ml-auto px-3 py-0.5 rounded-full text-xs font-mono ${r.allow
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
            : 'bg-red-500/15 text-red-400 border border-red-500/20'}">
            ${r.allow ? '✓ AUTORISÉ' : '✕ BLOQUÉ'}
          </span>
        </div>
      `).join('')}

    </div>
  </div>

  <!-- DB Response -->
  <div class="animate-fadein delay-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Réponse Base de Données</span>
      <span class="text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded" id="db-panel-tag">vm3-db-svc:3306</span>
    </div>
    <div class="p-6">
      <pre class="bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-xs leading-7 overflow-x-auto" id="db-response"><span class="text-slate-500">status    </span><span class="text-amber-400">⟳ Connexion en cours...</span></pre>
    </div>
  </div>

  <!-- Footer -->
  <footer class="animate-fadein delay-5 flex items-center justify-between pt-6 border-t border-slate-800 text-xs font-mono text-slate-600">
    <span>Projet Fin de Module · OpenShift Virtualization · Dakar</span>
    <span id="footer-time"></span>
  </footer>

</div>

<script>
async function fetchData() {
  try {
    const res  = await fetch('/api/status');
    const data = await res.json();
    if (data.status === 'OK') {
      document.getElementById('db-status').textContent  = '● CONNECTÉE';
      document.getElementById('db-status').className    = 'text-lg font-bold text-emerald-400';
      document.getElementById('db-version').textContent = 'MySQL · ' + (data.db?.version || '8.0');

      const t = new Date(data.db?.time);
      document.getElementById('server-time').textContent =
        t.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
      document.getElementById('server-date').textContent =
        t.toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});

      document.getElementById('db-dot').className         = 'w-1.5 h-1.5 rounded-full bg-emerald-400 glow-green';
      document.getElementById('db-node-status').textContent = 'connecté · port 3306';
      document.getElementById('db-panel-tag').textContent   = '✓ vm3-db-svc:3306';

      document.getElementById('db-response').innerHTML =
        '<span class="text-slate-500">status      </span><span class="text-emerald-400">✓ OK</span>\n' +
        '<span class="text-slate-500">server      </span><span class="text-cyan-400">' + data.vm + '</span>\n' +
        '<span class="text-slate-500">db_time     </span><span class="text-cyan-400">' + data.db?.time + '</span>\n' +
        '<span class="text-slate-500">db_version  </span><span class="text-cyan-400">' + data.db?.version + '</span>\n' +
        '<span class="text-slate-500">namespace   </span><span class="text-cyan-400">fallilou-dev</span>\n' +
        '<span class="text-slate-500">platform    </span><span class="text-cyan-400">OpenShift Virtualization</span>';
    } else {
      throw new Error(data.error || 'DB_ERROR');
    }
  } catch(e) {
    document.getElementById('db-status').textContent = '✕ ERREUR';
    document.getElementById('db-status').className   = 'text-lg font-bold text-red-400';
    document.getElementById('db-panel-tag').textContent = '✕ connexion échouée';
    document.getElementById('db-response').innerHTML =
      '<span class="text-slate-500">status  </span><span class="text-red-400">✕ ' + e.message + '</span>\n' +
      '<span class="text-slate-500">host    </span><span class="text-cyan-400">vm3-db-svc:3306</span>\n' +
      '<span class="text-slate-500">hint    </span><span class="text-amber-400">VM3 démarrage en cours...</span>';
  }
}

function clock() {
  document.getElementById('footer-time').textContent =
    'Mis à jour : ' + new Date().toLocaleTimeString('fr-FR');
}

fetchData();
setInterval(fetchData, 10000);
setInterval(clock, 1000);
clock();
</script>
</body>
</html>`;

app.get('/', (req, res) => res.send(HTML));

app.get('/api/status', async (req, res) => {
  try {
    const conn   = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT NOW() AS time, VERSION() AS version');
    await conn.end();
    res.json({ status: 'OK', vm: 'vm2-web (Node.js · OpenShift)', db: rows[0] });
  } catch(e) {
    res.status(500).json({ status: 'DB_ERROR', error: e.message });
  }
});

app.get('/health', (_, res) => res.json({ status: 'UP', vm: 'vm2-web' }));
app.listen(PORT, () => console.log('App on port ' + PORT));
