const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fallilou Mb GUEYE | Ingénieur SI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root { --os-red: #ee0000; --bg-dark: #0b0b0f; }
        body { 
            background-color: var(--bg-dark); 
            font-family: 'Inter', sans-serif;
            color: #e2e8f0;
            overflow-x: hidden;
        }
        .mono { font-family: 'Fira Code', monospace; }
        .red-gradient { background: linear-gradient(135deg, #ee0000 0%, #b91c1c 100%); }
        .glass-panel { background: rgba(23, 23, 23, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.05); }
        
        /* Animation de pulsation pour le statut OpenShift */
        .status-dot {
            width: 10px; height: 10px;
            background-color: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 15px #10b981;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .hero-text { font-weight: 900; letter-spacing: -0.05em; line-height: 0.9; }
        .cli-window { border-top: 25px solid #1f2937; position: relative; }
        .cli-window::before {
            content: '● ● ●';
            position: absolute; top: -20px; left: 10px;
            color: #4b5563; font-size: 10px; letter-spacing: 2px;
        }
    </style>
</head>
<body class="p-4 md:p-8">

    <header class="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div class="flex items-center gap-3">
            <div class="status-dot"></div>
            <span class="mono text-xs uppercase tracking-widest text-emerald-400">Pod: Stable-Deployment-v1</span>
        </div>
        <div class="hidden md:block">
            <span class="mono text-xs text-slate-500">Infrastructure: Red Hat OpenShift 4.x</span>
        </div>
    </header>

    <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div class="lg:col-span-7">
            <h2 class="text-slate-500 mono text-sm mb-4 tracking-tighter uppercase">// Ingénieur en Systèmes d'Information</h2>
            <h1 class="hero-text text-6xl md:text-8xl mb-8">
                Fallilou <br/> <span class="text-white">Mb GUEYE.</span>
            </h1>
            <p class="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
                Expert en déploiement Cloud-Native, spécialisé dans l'automatisation d'infrastructures et la conteneurisation. 
                <span class="text-white italic">Ce site est hébergé dynamiquement sur un cluster OpenShift.</span>
            </p>
            
            <div class="flex flex-wrap gap-4 mb-12">
                <span class="glass-panel px-4 py-2 rounded-full text-xs mono">#Kubernetes</span>
                <span class="glass-panel px-4 py-2 rounded-full text-xs mono">#Docker</span>
                <span class="glass-panel px-4 py-2 rounded-full text-xs mono">#CI_CD</span>
                <span class="glass-panel px-4 py-2 rounded-full text-xs mono text-red-500 font-bold">#OpenShift</span>
            </div>
        </div>

        <div class="lg:col-span-5 space-y-6">
            <div class="cli-window glass-panel rounded-lg overflow-hidden shadow-2xl">
                <div class="p-6 mono text-sm leading-relaxed">
                    <p class="text-emerald-400">$ oc get pods</p>
                    <p class="text-slate-300">NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; READY &nbsp; STATUS</p>
                    <p class="text-slate-300">fallilou-web-1 &nbsp; 1/1 &nbsp;&nbsp; Running</p>
                    <p class="text-slate-300">mysql-db-v2 &nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp; Running</p>
                    <br/>
                    <p class="text-emerald-400">$ oc get route portfolio</p>
                    <p class="text-slate-300 italic">Exposed: fallilou-portfolio.openshift.com</p>
                    <br/>
                    <p class="text-yellow-400 animate-pulse">_ system check: all green</p>
                </div>
            </div>

            <div class="bg-red-600/10 border border-red-600/20 p-6 rounded-lg">
                <h3 class="text-red-500 font-bold uppercase text-xs mb-2 tracking-widest">Stack de ce projet</h3>
                <ul class="text-sm space-y-2 text-slate-300">
                    <li class="flex items-center gap-2">
                        <div class="w-1 h-1 bg-red-600"></div> Backend: Node.js / Express
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1 h-1 bg-red-600"></div> Orchestration: OpenShift Developer Sandbox
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1 h-1 bg-red-600"></div> Deployment: GitOps via GitHub
                    </li>
                </ul>
            </div>
        </div>
    </main>

    <footer class="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="mono text-[10px] text-slate-500">
            © 2026 FALLILOU Mb GUEYE — ENGINEERED IN DAKAR
        </div>
        <div class="flex gap-6">
            <a href="#" class="text-xs hover:text-red-500 transition-colors uppercase tracking-widest font-bold">LinkedIn</a>
            <a href="#" class="text-xs hover:text-red-500 transition-colors uppercase tracking-widest font-bold">GitHub</a>
            <a href="mailto:contact@fallilou.dev" class="text-xs hover:text-red-500 transition-colors uppercase tracking-widest font-bold">Contact</a>
        </div>
    </footer>

    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

</body>
</html>`;

app.get('/', (req, res) => {
    res.send(HTML);
});

app.listen(PORT, () => {
    console.log(`Serveur Portfolio lancé sur le port ${PORT}`);
});