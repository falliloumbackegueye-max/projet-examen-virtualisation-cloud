# Projet Fin de Module — OpenShift Virtualization + GitHub CI/CD

## Architecture

```
Internet (NAT)
      │
      ▼
┌─────────────────────────────────────────────────────┐
│  VM1 — pfSense (Firewall/Passerelle)                │
│  WAN : NAT Internet                                  │
│  DMZ : 192.168.100.1                                 │
│  LAN : 192.168.10.1                                  │
└──────────────┬──────────────────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│  VM2 — Web  │  │  VM3 — DB   │
│  DMZ        │  │  LAN seul   │
│  Nginx+Node │──│  MySQL 8.0  │
│  .100.10    │  │  .10.20     │
└─────────────┘  └─────────────┘
```

## Parties du projet

| Partie | Contenu |
|--------|---------|
| **1 — Virtualisation** | VMs définies par YAML KubeVirt sur OpenShift Virtualization |
| **2 — Services** | Nginx + Node.js (VM2), MySQL (VM3) via cloud-init |
| **3 — Réseaux** | NAD DMZ/LAN, NetworkPolicies d'isolation |
| **4 — GitHub CI/CD** | Pipeline deploy.yml : `oc apply -f` à chaque git push |

## Structure du repo

```
projet-fin-module/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Pipeline CI/CD GitHub Actions
├── network/
│   ├── nad-dmz.yaml            ← Réseau DMZ 192.168.100.0/24
│   ├── nad-lan.yaml            ← Réseau LAN 192.168.10.0/24
│   └── networkpolicy.yaml      ← Isolation VM3 (DB)
├── vms/
│   ├── vm1-pfsense/
│   │   └── virtualmachine.yaml ← pfSense Firewall
│   ├── vm2-web/
│   │   └── virtualmachine.yaml ← Ubuntu 22.04 + Nginx + Node.js
│   └── vm3-db/
│       ├── virtualmachine.yaml ← Ubuntu 22.04 + MySQL
│       └── pvc.yaml            ← Stockage persistant MySQL (20Gi)
└── README.md
```

## Prérequis

- Cluster OpenShift Container Platform avec OpenShift Virtualization activé
- Trial 60 jours : https://console.redhat.com/openshift
- CLI `oc` installé localement
- Compte GitHub

## Déploiement manuel

```bash
# 1. Login au cluster
oc login --token=<TOKEN> --server=<SERVER>

# 2. Créer le namespace
oc new-project projet-fin-module

# 3. Appliquer le réseau
oc apply -f network/

# 4. Déployer les VMs (DB en premier)
oc apply -f vms/vm3-db/pvc.yaml
oc apply -f vms/vm3-db/virtualmachine.yaml
oc apply -f vms/vm2-web/virtualmachine.yaml
oc apply -f vms/vm1-pfsense/virtualmachine.yaml

# 5. Vérifier
oc get vm
oc get dv
```

## Déploiement automatique (GitHub Actions)

Configurer les secrets dans GitHub → Settings → Secrets → Actions :

| Secret | Commande pour obtenir la valeur |
|--------|---------------------------------|
| `OC_TOKEN` | `oc whoami -t` |
| `OC_SERVER` | `oc whoami --show-server` |

Ensuite, chaque `git push` sur `main` déclenche le pipeline automatiquement.

## Commandes utiles

```bash
# Voir les VMs
oc get vm -n projet-fin-module

# Démarrer/arrêter une VM
virtctl start vm2-web -n projet-fin-module
virtctl stop vm2-web -n projet-fin-module

# Console VNC (pfSense)
virtctl console vm1-pfsense -n projet-fin-module

# SSH vers VM2 ou VM3
virtctl ssh ubuntu@vm2-web -n projet-fin-module

# Logs cloud-init
virtctl ssh ubuntu@vm2-web -- sudo cat /var/log/cloud-init-output.log

# Vérifier les réseaux
oc get net-attach-def -n projet-fin-module
```

## Sécurité

- VM3 (MySQL) est accessible **uniquement** depuis VM2 via NetworkPolicy
- VM3 est sur le réseau LAN uniquement, jamais exposée sur Internet
- pfSense gère le NAT et filtre tout le trafic entrant/sortant
- Les mots de passe doivent être changés avant mise en production
# Déploiement alx 26 mar 2026 00:17:23 GMT
# Deploy alx 26 mar 2026 00:18:59 GMT
# Deploy alx 26 mar 2026 00:25:47 GMT
