const express = require('express');
const mysql   = require('mysql2/promise');
const app     = express();
const PORT    = process.env.PORT || 3000;

const dbConfig = {
  host:     process.env.DB_HOST     || 'vm3-db-svc',
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'appuser',
  password: process.env.DB_PASSWORD || 'AppPassword123x',
  database: process.env.DB_NAME     || 'appdb',
};

app.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [etudiants] = await conn.execute('SELECT * FROM etudiants ORDER BY id');
    const [cours]     = await conn.execute('SELECT * FROM cours ORDER BY id');
    await conn.end();
    res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Projet Fin de Module</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  body{background:#060b18;font-family:'Syne',sans-serif}
  body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,229,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
  @keyframes fadein{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse2{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.6)}}
  .fi{animation:fadein .6s ease forwards}
  .d1{animation-delay:.1s;opacity:0}.d2{animation-delay:.2s;opacity:0}.d3{animation-delay:.3s;opacity:0}.d4{animation-delay:.4s;opacity:0}
  .dp{animation:pulse2 2s infinite}
  .card{background:rgba(15,23,42,.8);border:1px solid rgba(30,58,138,.4);backdrop-filter:blur(12px);transition:all .3s}
  .card:hover{border-color:rgba(0,229,255,.35);box-shadow:0 0 30px rgba(0,229,255,.08);transform:translateY(-3px)}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-thumb{background:rgba(0,229,255,.3);border-radius:2px}
</style>
</head>
<body class="text-slate-200 min-h-screen">
<div class="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-600 z-50"></div>
<div class="relative z-10 max-w-5xl mx-auto px-5 py-10">

  <header class="fi flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-6 border-b border-slate-800 gap-4">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-2xl" style="box-shadow:0 0 24px rgba(0,229,255,.25)">⬡</div>
      <div>
        <h1 class="text-xl font-extrabold tracking-tight">Projet Fin de Module</h1>
        <p class="text-xs text-slate-500 tracking-widest uppercase mt-0.5" style="font-family:'Space Mono',monospace">OpenShift Virtualization · Dakar 2026</p>
      </div>
    </div>
    <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-full" style="font-family:'Space Mono',monospace">
      <span class="w-2 h-2 rounded-full bg-emerald-400 dp"></span>
      DB Connectée · vm3-db-svc
    </div>
  </header>

  <div class="fi d1 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="card rounded-xl p-5">
      <div class="flex items-center justify-between mb-3">
        <div class="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl">🔥</div>
        <span class="text-xs bg-violet-500/15 text-violet-400 border border-violet-500/25 px-2 py-0.5 rounded-full" style="font-family:'Space Mono',monospace">VM · KubeVirt</span>
      </div>
      <p class="font-bold text-sm mb-1">VM1 · Firewall</p>
      <p class="text-xs text-slate-500 mb-3" style="font-family:'Space Mono',monospace">Fedora · iptables</p>
      <div class="text-xs space-y-1" style="font-family:'Space Mono',monospace">
        <div class="flex justify-between"><span class="text-slate-600">WAN</span><span class="text-violet-400">eth0 · Internet</span></div>
        <div class="flex justify-between"><span class="text-slate-600">DMZ</span><span class="text-cyan-400">dmz0 · 192.168.100.1</span></div>
        <div class="flex justify-between"><span class="text-slate-600">LAN</span><span class="text-amber-400">lan0 · 192.168.10.1</span></div>
      </div>
    </div>
    <div class="card rounded-xl p-5" style="border-color:rgba(0,229,255,.2)">
      <div class="flex items-center justify-between mb-3">
        <div class="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">🌐</div>
        <span class="text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded-full" style="font-family:'Space Mono',monospace">VM · KubeVirt</span>
      </div>
      <p class="font-bold text-sm mb-1">VM2 · Serveur Web</p>
      <p class="text-xs text-slate-500 mb-3" style="font-family:'Space Mono',monospace">Fedora · Nginx · Node.js</p>
      <div class="text-xs space-y-1" style="font-family:'Space Mono',monospace">
        <div class="flex justify-between"><span class="text-slate-600">Zone</span><span class="text-cyan-400">DMZ · 192.168.100.10</span></div>
        <div class="flex justify-between"><span class="text-slate-600">Gateway</span><span class="text-slate-300">192.168.100.1</span></div>
        <div class="flex justify-between"><span class="text-slate-600">Port</span><span class="text-slate-300">:80 / :3000</span></div>
      </div>
    </div>
    <div class="card rounded-xl p-5">
      <div class="flex items-center justify-between mb-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">🗄</div>
        <span class="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full" style="font-family:'Space Mono',monospace">Pod · MySQL</span>
      </div>
      <p class="font-bold text-sm mb-1">VM3 · Base de données</p>
      <p class="text-xs text-slate-500 mb-3" style="font-family:'Space Mono',monospace">MySQL 8.0 · appdb</p>
      <div class="text-xs space-y-1" style="font-family:'Space Mono',monospace">
        <div class="flex justify-between"><span class="text-slate-600">Zone</span><span class="text-amber-400">LAN · 192.168.10.20</span></div>
        <div class="flex justify-between"><span class="text-slate-600">Gateway</span><span class="text-slate-300">192.168.10.1</span></div>
        <div class="flex justify-between"><span class="text-slate-600">Tables</span><span class="text-emerald-400">${etudiants.length} étudiants · ${cours.length} cours</span></div>
      </div>
    </div>
  </div>

  <div class="fi d2 card rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800" style="background:rgba(0,229,255,.03)">
      <div class="flex items-center gap-3">
        <span class="w-2 h-2 rounded-full bg-emerald-400" style="box-shadow:0 0 8px rgba(16,185,129,.6)"></span>
        <span class="text-xs text-cyan-400 tracking-widest uppercase font-semibold" style="font-family:'Space Mono',monospace">Table · Étudiants (${etudiants.length})</span>
      </div>
      <span class="text-xs text-slate-600 bg-slate-800 px-3 py-1 rounded" style="font-family:'Space Mono',monospace">appdb · vm3-db-svc:3306</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" style="font-family:'Space Mono',monospace">
        <thead>
          <tr class="border-b border-slate-800" style="background:rgba(0,229,255,.03)">
            <th class="px-5 py-3 text-left text-slate-500 font-normal">ID</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Nom</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Prénom</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Email</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Filière</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Date</th>
          </tr>
        </thead>
        <tbody>
          ${etudiants.map((e, i) => `
          <tr class="border-b border-slate-800/50 hover:bg-cyan-500/5 transition-colors">
            <td class="px-5 py-3 text-slate-500">${e.id}</td>
            <td class="px-5 py-3 font-bold text-slate-200">${e.nom}</td>
            <td class="px-5 py-3 text-slate-300">${e.prenom}</td>
            <td class="px-5 py-3 text-cyan-400">${e.email}</td>
            <td class="px-5 py-3"><span class="bg-violet-500/15 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded-full">${e.filiere}</span></td>
            <td class="px-5 py-3 text-slate-600">${new Date(e.created_at).toLocaleDateString('fr-FR')}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="fi d3 card rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800" style="background:rgba(0,229,255,.03)">
      <div class="flex items-center gap-3">
        <span class="w-2 h-2 rounded-full bg-violet-400" style="box-shadow:0 0 8px rgba(139,92,246,.6)"></span>
        <span class="text-xs text-cyan-400 tracking-widest uppercase font-semibold" style="font-family:'Space Mono',monospace">Table · Cours (${cours.length})</span>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" style="font-family:'Space Mono',monospace">
        <thead>
          <tr class="border-b border-slate-800" style="background:rgba(0,229,255,.03)">
            <th class="px-5 py-3 text-left text-slate-500 font-normal">ID</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Titre</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Description</th>
            <th class="px-5 py-3 text-left text-slate-500 font-normal">Crédits</th>
          </tr>
        </thead>
        <tbody>
          ${cours.map(c => `
          <tr class="border-b border-slate-800/50 hover:bg-cyan-500/5 transition-colors">
            <td class="px-5 py-3 text-slate-500">${c.id}</td>
            <td class="px-5 py-3 font-bold text-slate-200">${c.titre}</td>
            <td class="px-5 py-3 text-slate-400">${c.description}</td>
            <td class="px-5 py-3"><span class="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">${c.credits} crédits</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="fi d4 card rounded-2xl overflow-hidden mb-6">
    <div class="px-6 py-4 border-b border-slate-800" style="background:rgba(0,229,255,.03)">
      <span class="text-xs text-cyan-400 tracking-widest uppercase font-semibold" style="font-family:'Space Mono',monospace">Règles Firewall · VM1 iptables</span>
    </div>
    <div class="p-5 flex flex-col gap-2">
      ${[
        {f:'Internet',t:'VM2 Web',p:'80,443',a:true,d:'Accès public site web'},
        {f:'Internet',t:'VM3 DB',p:'tous',a:false,d:'DB jamais exposée'},
        {f:'LAN',t:'Internet',p:'tous',a:true,d:'VM3 mises à jour'},
        {f:'LAN',t:'DMZ',p:'tous',a:true,d:'VM3 peut joindre VM2'},
        {f:'DMZ',t:'LAN',p:'tous',a:false,d:'VM2 isolée de VM3'},
        {f:'DMZ',t:'Internet',p:'80,443',a:true,d:'MAJ VM2'},
      ].map(r=>`
      <div class="flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-colors hover:bg-slate-800" style="background:rgba(15,23,42,.5);border-color:rgba(30,58,138,.3)">
        <span class="text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 min-w-[72px] text-center" style="font-family:'Space Mono',monospace">${r.f}</span>
        <span class="text-slate-600">→</span>
        <span class="text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 min-w-[72px] text-center" style="font-family:'Space Mono',monospace">${r.t}</span>
        <span class="text-xs text-cyan-400 hidden md:block" style="font-family:'Space Mono',monospace">:${r.p}</span>
        <span class="text-xs text-slate-500 hidden lg:block flex-1">${r.d}</span>
        <span class="ml-auto text-xs px-3 py-1 rounded-full border font-bold ${r.a?'bg-emerald-500/10 text-emerald-400 border-emerald-500/20':'bg-red-500/10 text-red-400 border-red-500/20'}" style="font-family:'Space Mono',monospace">${r.a?'✓ AUTORISÉ':'✕ BLOQUÉ'}</span>
      </div>`).join('')}
    </div>
  </div>

  <footer class="fi d4 flex flex-col md:flex-row items-center justify-between pt-5 border-t border-slate-800 text-xs text-slate-600 gap-2" style="font-family:'Space Mono',monospace">
    <span>Projet Fin de Module · OpenShift Virtualization · Dakar 2026</span>
    <span id="clk"></span>
  </footer>
</div>
<script>setInterval(()=>{document.getElementById('clk').textContent=new Date().toLocaleString('fr-FR',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit'})},1000)</script>
</body></html>`);
  } catch(e) {
    res.status(500).json({ status: 'DB_ERROR', error: e.message, host: dbConfig.host });
  }
});

app.get('/health', (_,res) => res.json({ status: 'UP', vm: 'vm2-web', zone: 'DMZ' }));
app.listen(PORT, () => console.log('App on port ' + PORT));
