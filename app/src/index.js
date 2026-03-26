const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloud Console — Architecture OpenShift</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    }
  }
}
</script>
<style>
  :root { --accent: #00e5ff; --bg: #030712; }
  body { background-color: var(--bg); background-image: radial-gradient(circle at 50% -20%, #1e293b 0%, transparent 50%); }
  
  /* Grille de fond animée */
  .grid-bg {
    position: fixed; inset: 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse at center, black, transparent 80%);
    pointer-events: none; z-index: 0;
  }

  /* Effet de scanline (Vibe Terminal) */
  .scanline {
    width: 100%; height: 2px; background: rgba(0, 229, 255, 0.1);
    position: fixed; top: 0; left: 0; z-index: 50; pointer-events: none;
    animation: scan 8s linear infinite;
  }

  .glass { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
  .card-glow:hover { border-color: var(--accent); box-shadow: 0 0 20px rgba(0, 229, 255, 0.15); transition: 0.4s; }
  
  @keyframes scan { from { top: -10%; } to { top: 110%; } }
  @keyframes pulse-soft { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.3; } }
  
  .status-pulse { animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
</style>
</head>
<body class="font-sans text-slate-300 min-h-screen selection:bg-cyan-500/30">
<div class="grid-bg"></div>
<div class="scanline"></div>

<div class="relative z-10 max-w-6xl mx-auto px-6 py-12">

  <nav class="flex items-center justify-between mb-16 animate-fade-in">
    <div class="flex items-center gap-4">
      <div class="relative">
        <div class="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25"></div>
        <div class="relative bg-slate-900 border border-slate-700 p-2 rounded-lg text-cyan-400 font-bold text-xl">
          OCP
        </div>
      </div>
      <div>
        <h1 class="text-sm font-bold text-white uppercase tracking-tighter">Infrastructure Console</h1>
        <div class="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span class="text-emerald-500">● LIVE</span> 
          <span>NODE: worker-01.dakar.openshift.local</span>
        </div>
      </div>
    </div>
    
    <div class="flex gap-4">
       <div class="hidden md:flex flex-col items-end justify-center px-4 border-r border-slate-800">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Latency</span>
          <span class="text-xs font-mono text-cyan-400">12ms</span>
       </div>
       <div class="bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></div>
          <span class="text-xs font-mono font-bold text-slate-200">ID: GUEYE-2026</span>
       </div>
    </div>
  </nav>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
    <div>
      <span class="inline-block text-cyan-400 text-[10px] font-mono border border-cyan-400/30 px-3 py-1 rounded-full mb-6 tracking-[0.2em]">PROJECT: MAAKO MOOM</span>
      <h2 class="text-5xl font-extrabold text-white leading-tight mb-6">
        Orchestration <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Virtualisée & Sécurisée</span>
      </h2>
      <p class="text-slate-400 leading-relaxed max-w-md">
        Interface de monitoring pour le cluster OpenShift. Visualisation en temps réel des règles pfSense, des flux réseau DMZ et de l'état des instances KubeVirt.
      </p>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="glass p-6 rounded-2xl border-l-4 border-l-cyan-500">
        <div class="text-3xl font-bold text-white mb-1 tracking-tighter">03</div>
        <div class="text-[10px] font-mono uppercase text-slate-500">Instances Actives</div>
      </div>
      <div class="glass p-6 rounded-2xl border-l-4 border-l-indigo-500">
        <div class="text-3xl font-bold text-white mb-1 tracking-tighter">99.9%</div>
        <div class="text-[10px] font-mono uppercase text-slate-500">Uptime Réseau</div>
      </div>
    </div>
  </div>

  <div class="mb-10">
    <div class="flex items-center gap-3 mb-6">
      <h3 class="text-xs font-mono uppercase tracking-[0.3em] text-slate-500">Cluster Topology</h3>
      <div class="h-[1px] flex-1 bg-slate-800"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass p-1 rounded-2xl group card-glow transition-all">
        <div class="p-6">
          <div class="flex justify-between items-start mb-8">
            <div class="p-3 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <span class="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded">GATEWAY</span>
          </div>
          <h4 class="text-white font-bold mb-1">pfSense Firewall</h4>
          <p class="text-xs text-slate-500 font-mono mb-4">Intel(R) Atom / 2GB RAM</p>
          <div class="space-y-2">
            <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div class="bg-red-500 h-full w-[45%]"></div>
            </div>
            <div class="flex justify-between text-[10px] font-mono uppercase">
              <span>Traffic Load</span>
              <span>45%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="glass p-1 rounded-2xl group card-glow transition-all relative overflow-hidden">
        <div class="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="p-6 relative z-10">
          <div class="flex justify-between items-start mb-8">
            <div class="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9"></path></svg>
            </div>
            <span class="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">DMZ ZONE</span>
          </div>
          <h4 class="text-white font-bold mb-1">Node.js Web App</h4>
          <p class="text-xs text-slate-500 font-mono mb-4">v18.x Cluster Mode</p>
          <div class="space-y-2">
            <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div class="bg-cyan-500 h-full w-[12%] animate-pulse"></div>
            </div>
            <div class="flex justify-between text-[10px] font-mono uppercase">
              <span>CPU Usage</span>
              <span>12.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="glass p-1 rounded-2xl group card-glow transition-all">
        <div class="p-6">
          <div class="flex justify-between items-start mb-8">
            <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            </div>
            <span class="text-[10px] font-mono text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">INTERNAL LAN</span>
          </div>
          <h4 class="text-white font-bold mb-1">MySQL Cluster</h4>
          <p class="text-xs text-slate-500 font-mono mb-4">Persistent Storage gp3</p>
          <div class="space-y-2">
            <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div class="bg-indigo-500 h-full w-[68%]"></div>
            </div>
            <div class="flex justify-between text-[10px] font-mono uppercase">
              <span>Disk I/O</span>
              <span>68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="glass rounded-2xl overflow-hidden mb-12 border border-slate-800">
    <div class="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
      <h3 class="text-xs font-mono font-bold text-white uppercase tracking-widest">Network Policy Engine</h3>
      <div class="flex gap-2">
        <div class="w-2 h-2 rounded-full bg-red-500"></div>
        <div class="w-2 h-2 rounded-full bg-amber-500"></div>
        <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
      </div>
    </div>
    <div class="p-4 overflow-x-auto">
      <table class="w-full text-left border-separate border-spacing-y-2">
        <thead class="text-[10px] font-mono text-slate-500 uppercase">
          <tr>
            <th class="px-4 py-2">Source</th>
            <th class="px-4 py-2">Target</th>
            <th class="px-4 py-2">Protocol</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody class="text-xs font-mono">
          <tr class="bg-slate-800/30">
            <td class="px-4 py-3 text-slate-300">0.0.0.0/0</td>
            <td class="px-4 py-3 text-cyan-400">VM2_WEB_80</td>
            <td class="px-4 py-3">TCP/HTTPS</td>
            <td class="px-4 py-3 text-emerald-400 font-bold">ALLOW</td>
          </tr>
          <tr class="bg-slate-800/30">
            <td class="px-4 py-3 text-slate-300">192.168.100.2</td>
            <td class="px-4 py-3 text-indigo-400">VM3_DB_3306</td>
            <td class="px-4 py-3">TCP/SQL</td>
            <td class="px-4 py-3 text-emerald-400 font-bold">ALLOW</td>
          </tr>
          <tr class="bg-slate-800/30">
            <td class="px-4 py-3 text-slate-300">0.0.0.0/0</td>
            <td class="px-4 py-3 text-slate-500">VM3_DB_ANY</td>
            <td class="px-4 py-3 text-slate-500">ANY</td>
            <td class="px-4 py-3 text-red-500 font-bold">REJECT</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <footer class="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-[10px] font-mono text-slate-500">
    <div class="flex gap-8">
      <span>LAT: 14.7167° N</span>
      <span>LONG: 17.4677° W</span>
      <span class="text-slate-700">|</span>
      <span>Dakar, SN</span>
    </div>
    <div id="clock" class="text-cyan-400 bg-cyan-400/5 px-4 py-1 rounded-full border border-cyan-400/20"></div>
    <div class="flex items-center gap-2">
      <span class="opacity-50 text-white font-sans">Developed by</span>
      <span class="text-white font-bold tracking-tighter">Colonel Gueye</span>
    </div>
  </footer>

</div>

<script>
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    }) + ' UTC';
  }
  setInterval(updateClock, 1000);
  updateClock();
</script>
</body>
</html>`;

app.get('/', (_req, res) => res.send(HTML));
app.get('/health', (_req, res) => res.json({ status: 'UP', timestamp: new Date().toISOString() }));
app.listen(PORT, () => console.log('Terminal ready on port ' + PORT));