const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Projet Fin de Module — Infrastructure Cloud</title>
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
  .glow-cyan  { box-shadow: 0 0 24px rgba(0,229,255,0.2); }
  .glow-green { box-shadow: 0 0 8px rgba(16,185,129,0.6); }
  .card-hover { transition: all 0.3s; }
  .card-hover:hover {
    border-color: rgba(0,229,255,0.35) !important;
    box-shadow: 0 0 20px rgba(0,229,255,0.08);
    transform: translateY(-2px);
  }
  @keyframes fadein {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulse2 {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.4; transform:scale(1.5); }
  }
  .animate-fadein { animation: fadein 0.6s ease forwards; }
  .delay-1 { animation-delay:0.1s; opacity:0; }
  .delay-2 { animation-delay:0.2s; opacity:0; }
  .delay-3 { animation-delay:0.3s; opacity:0; }
  .delay-4 { animation-delay:0.4s; opacity:0; }
  .delay-5 { animation-delay:0.5s; opacity:0; }
  .dot-pulse { animation: pulse2 2s infinite; }
</style>
</head>
<body class="font-sans text-slate-200 min-h-screen">
<div class="relative z-10 max-w-5xl mx-auto px-6 py-10">

  <!-- Header -->
  <header class="flex items-center justify-between mb-12 pb-6 border-b border-slate-800 animate-fadein">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-2xl glow-cyan">⬡</div>
      <div>
        <h1 class="text-xl font-extrabold tracking-tight">Projet Fin de Module</h1>
        <p class="text-xs font-mono text-slate-500 tracking-widest uppercase mt-0.5">OpenShift Virtualization · Dakar</p>
      </div>
    </div>
    <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-4 py-2 rounded-full">
      <span class="w-2 h-2 rounded-full bg-emerald-400 dot-pulse"></span>
      Système opérationnel
    </div>
  </header>

  <!-- Hero -->
  <div class="animate-fadein delay-1 text-center mb-14">
    <div class="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
      Infrastructure as Code · GitHub CI/CD
    </div>
    <h2 class="text-4xl font-extrabold tracking-tight mb-4 leading-tight">
      Architecture <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Virtualisée</span><br/>sur OpenShift
    </h2>
    <p class="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
      Déploiement automatisé de 3 serveurs via GitHub Actions.<br/>
      Firewall pfSense · Serveur Web · Base de données MySQL.
    </p>
  </div>

  <!-- Infrastructure nodes -->
  <div class="animate-fadein delay-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Infrastructure · 3 Nœuds</span>
      <span class="text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded">namespace: fallilou-dev</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

      <!-- VM1 -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl">🔥</div>
          <span class="text-xs font-mono bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">VM · KubeVirt</span>
        </div>
        <p class="font-bold text-sm mb-1">VM1 · Firewall</p>
        <p class="text-xs font-mono text-slate-500 mb-3">Fedora Linux · iptables</p>
        <div class="space-y-1.5 text-xs font-mono text-slate-500">
          <div class="flex justify-between"><span>OS</span><span class="text-slate-300">Fedora 39</span></div>
          <div class="flex justify-between"><span>Rôle</span><span class="text-violet-400">Passerelle NAT</span></div>
          <div class="flex justify-between"><span>Réseau</span><span class="text-slate-300">WAN · DMZ · LAN</span></div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-green"></span>
          pfSense · iptables
        </div>
      </div>

      <!-- VM2 -->
      <div class="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-5 card-hover relative">
        <div class="absolute top-3 right-3 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">VOUS ÊTES ICI</div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">🌐</div>
          <span class="text-xs font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">Pod · Conteneur</span>
        </div>
        <p class="font-bold text-sm mb-1">VM2 · Serveur Web</p>
        <p class="text-xs font-mono text-slate-500 mb-3">Node.js 18 · Express</p>
        <div class="space-y-1.5 text-xs font-mono text-slate-500">
          <div class="flex justify-between"><span>Runtime</span><span class="text-slate-300">Node.js 18</span></div>
          <div class="flex justify-between"><span>Zone</span><span class="text-cyan-400">DMZ</span></div>
          <div class="flex justify-between"><span>Port</span><span class="text-slate-300">:3000 → :80</span></div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400" style="box-shadow:0 0 6px #00e5ff"></span>
          Running · OpenShift Route
        </div>
      </div>

      <!-- VM3 -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">🗄</div>
          <span class="text-xs font-mono bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">VM · KubeVirt</span>
        </div>
        <p class="font-bold text-sm mb-1">VM3 · Base de données</p>
        <p class="text-xs font-mono text-slate-500 mb-3">Fedora Linux · MySQL 8.0</p>
        <div class="space-y-1.5 text-xs font-mono text-slate-500">
          <div class="flex justify-between"><span>OS</span><span class="text-slate-300">Fedora 39</span></div>
          <div class="flex justify-between"><span>Zone</span><span class="text-amber-400">LAN (isolé)</span></div>
          <div class="flex justify-between"><span>Port</span><span class="text-slate-300">:3306</span></div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Accès LAN uniquement
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
        { from:'Internet', to:'VM2 Web',  port:'80, 443',  allow:true,  desc:'Accès public au site web' },
        { from:'Internet', to:'VM3 DB',   port:'tous',     allow:false, desc:'DB jamais exposée' },
        { from:'LAN',      to:'Internet', port:'tous',     allow:true,  desc:'VM3 peut se mettre à jour' },
        { from:'LAN',      to:'DMZ',      port:'tous',     allow:true,  desc:'VM3 peut joindre VM2' },
        { from:'DMZ',      to:'LAN',      port:'tous',     allow:false, desc:'VM2 ne peut pas joindre VM3' },
        { from:'DMZ',      to:'Internet', port:'80, 443',  allow:true,  desc:'Mises à jour VM2' },
      ].map(r => `
        <div class="flex items-center gap-3 px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition-colors">
          <span class="text-xs font-mono bg-slate-700 text-slate-300 px-2.5 py-1 rounded min-w-[80px] text-center">${r.from}</span>
          <span class="text-slate-600 text-sm">→</span>
          <span class="text-xs font-mono bg-slate-700 text-slate-300 px-2.5 py-1 rounded min-w-[80px] text-center">${r.to}</span>
          <span class="text-xs font-mono text-cyan-400 hidden md:block">:${r.port}</span>
          <span class="text-xs font-mono text-slate-600 hidden lg:block flex-1">${r.desc}</span>
          <span class="ml-auto text-xs font-mono px-3 py-1 rounded-full border ${r.allow
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'}">
            ${r.allow ? '✓ AUTORISÉ' : '✕ BLOQUÉ'}
          </span>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Architecture réseau -->
  <div class="animate-fadein delay-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Architecture Réseau</span>
      <span class="text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded">DMZ · LAN · WAN</span>
    </div>
    <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        <p class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Zone WAN</p>
        <p class="text-sm font-semibold mb-1">Internet · NAT</p>
        <p class="text-xs font-mono text-slate-500">IP publique → pfSense</p>
        <div class="mt-3 text-xs font-mono text-violet-400">DHCP · NAT masquerade</div>
      </div>
      <div class="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
        <p class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Zone DMZ</p>
        <p class="text-sm font-semibold mb-1">192.168.100.0/24</p>
        <p class="text-xs font-mono text-slate-500">VM2 Web · Port 80/443</p>
        <div class="mt-3 text-xs font-mono text-cyan-400">NetworkAttachmentDef</div>
      </div>
      <div class="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
        <p class="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Zone LAN</p>
        <p class="text-sm font-semibold mb-1">192.168.10.0/24</p>
        <p class="text-xs font-mono text-slate-500">VM3 DB · Port 3306</p>
        <div class="mt-3 text-xs font-mono text-amber-400">Isolé · LAN uniquement</div>
      </div>
    </div>
  </div>

  <!-- Tech stack -->
  <div class="animate-fadein delay-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
    <div class="px-6 py-4 border-b border-slate-800 bg-cyan-500/5">
      <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Stack Technologique</span>
    </div>
    <div class="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      ${[
        { icon:'⎈', label:'OpenShift', sub:'Virtualization' },
        { icon:'⬡', label:'KubeVirt', sub:'VMs sur K8s' },
        { icon:'🐙', label:'GitHub', sub:'CI/CD Actions' },
        { icon:'🔥', label:'pfSense', sub:'Firewall NAT' },
        { icon:'🌐', label:'Node.js 18', sub:'Express · API' },
        { icon:'🗄', label:'MySQL 8.0', sub:'Base de données' },
        { icon:'🐧', label:'Fedora 39', sub:'OS des VMs' },
        { icon:'☁️', label:'AWS EBS', sub:'gp3 Storage' },
      ].map(t => `
        <div class="flex items-center gap-3 bg-slate-800/40 border border-slate-700/50 rounded-lg px-3 py-3 card-hover">
          <span class="text-xl">${t.icon}</span>
          <div>
            <p class="text-xs font-semibold">${t.label}</p>
            <p class="text-xs font-mono text-slate-500">${t.sub}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Footer -->
  <footer class="animate-fadein delay-5 flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-800 text-xs font-mono text-slate-600 gap-2">
    <span>Projet Fin de Module · OpenShift Virtualization · Université · Dakar 2026</span>
    <span id="clock"></span>
  </footer>

</div>
<script>
  setInterval(() => {
    document.getElementById('clock').textContent =
      new Date().toLocaleString('fr-FR', {
        weekday:'short', day:'numeric', month:'short',
        hour:'2-digit', minute:'2-digit', second:'2-digit'
      });
  }, 1000);
</script>
</body>
</html>`;

app.get('/', (_req, res) => res.send(HTML));
app.get('/health', (_req, res) => res.json({ status: 'UP', vm: 'vm2-web', zone: 'DMZ' }));
app.listen(PORT, () => console.log('App on port ' + PORT));
