#!/bin/bash
# =============================================================
# Script de configuration automatique pfSense
# Appliqué via la console série au premier démarrage
# =============================================================
# Ce script configure pfSense en ligne de commande via PHP shell
# (méthode officielle pfSense pour l'automatisation)
# =============================================================

cat << 'PFSENSE_SCRIPT' > /tmp/configure_pfsense.php
<?php
require_once("globals.inc");
require_once("config.inc");
require_once("functions.inc");
require_once("filter.inc");
require_once("shaper.inc");

// ── Chargement de la configuration actuelle ──────────────────
$config = parse_config();

// ═════════════════════════════════════════════════════════════
// 1. INTERFACES
// ═════════════════════════════════════════════════════════════
$config['interfaces']['wan']['descr']        = 'WAN';
$config['interfaces']['wan']['if']           = 'vtnet0';
$config['interfaces']['wan']['ipaddr']       = 'dhcp';
$config['interfaces']['wan']['blockpriv']    = true;
$config['interfaces']['wan']['blockbogons']  = true;

$config['interfaces']['opt1'] = [
    'enable'  => true,
    'if'      => 'vtnet1',
    'descr'   => 'DMZ',
    'ipaddr'  => '192.168.100.1',
    'subnet'  => '24',
];

$config['interfaces']['lan'] = [
    'enable'  => true,
    'if'      => 'vtnet2',
    'descr'   => 'LAN',
    'ipaddr'  => '192.168.10.1',
    'subnet'  => '24',
];

// ═════════════════════════════════════════════════════════════
// 2. NAT — Redirection WAN → VM2 (HTTP + HTTPS)
// ═════════════════════════════════════════════════════════════
$config['nat']['rule'] = [];

// NAT HTTP port 80 → VM2
$config['nat']['rule'][] = [
    'interface'          => 'wan',
    'protocol'           => 'tcp',
    'source'             => ['any' => true],
    'destination'        => ['network' => 'wanip', 'port' => '80'],
    'target'             => '192.168.100.10',
    'local-port'         => '80',
    'descr'              => 'NAT HTTP WAN vers VM2 Web',
    'associated-rule-id' => 'nat_http_to_vm2',
];

// NAT HTTPS port 443 → VM2
$config['nat']['rule'][] = [
    'interface'          => 'wan',
    'protocol'           => 'tcp',
    'source'             => ['any' => true],
    'destination'        => ['network' => 'wanip', 'port' => '443'],
    'target'             => '192.168.100.10',
    'local-port'         => '443',
    'descr'              => 'NAT HTTPS WAN vers VM2 Web',
    'associated-rule-id' => 'nat_https_to_vm2',
];

// ═════════════════════════════════════════════════════════════
// 3. RÈGLES DE FILTRAGE
// ═════════════════════════════════════════════════════════════
$config['filter']['rule'] = [];

// ── WAN : Autoriser HTTP → VM2 ─────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'wan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'tcp',
    'source'      => ['any' => true],
    'destination' => ['address' => '192.168.100.10', 'port' => '80'],
    'descr'       => 'WAN → VM2 : HTTP autorisé',
    'tracker'     => '101',
];

// ── WAN : Autoriser HTTPS → VM2 ────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'wan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'tcp',
    'source'      => ['any' => true],
    'destination' => ['address' => '192.168.100.10', 'port' => '443'],
    'descr'       => 'WAN → VM2 : HTTPS autorisé',
    'tracker'     => '102',
];

// ── WAN : Bloquer tout vers LAN ────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'block',
    'interface'   => 'wan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['any' => true],
    'destination' => ['network' => '192.168.10.0/24'],
    'descr'       => 'WAN → LAN : BLOQUÉ',
    'tracker'     => '103',
];

// ── WAN : Bloquer tout le reste vers DMZ ───────────────────
$config['filter']['rule'][] = [
    'type'        => 'block',
    'interface'   => 'wan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['any' => true],
    'destination' => ['network' => '192.168.100.0/24'],
    'descr'       => 'WAN → DMZ : tout sauf HTTP/HTTPS bloqué',
    'tracker'     => '104',
];

// ── LAN : Autoriser vers Internet ──────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'lan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['network' => '192.168.10.0/24'],
    'destination' => ['any' => true],
    'descr'       => 'LAN → Internet : autorisé',
    'tracker'     => '201',
];

// ── LAN : Autoriser vers DMZ ───────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'lan',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['network' => '192.168.10.0/24'],
    'destination' => ['network' => '192.168.100.0/24'],
    'descr'       => 'LAN → DMZ : autorisé',
    'tracker'     => '202',
];

// ── DMZ : BLOQUER vers LAN ─────────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'block',
    'interface'   => 'opt1',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['network' => '192.168.100.0/24'],
    'destination' => ['network' => '192.168.10.0/24'],
    'descr'       => 'DMZ → LAN : BLOQUÉ',
    'tracker'     => '301',
];

// ── DMZ : Autoriser HTTP/HTTPS vers Internet (mises à jour) ─
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'opt1',
    'ipprotocol'  => 'inet',
    'protocol'    => 'tcp',
    'source'      => ['network' => '192.168.100.0/24'],
    'destination' => ['any' => true, 'port' => '80'],
    'descr'       => 'DMZ → Internet HTTP : autorisé',
    'tracker'     => '302',
];
$config['filter']['rule'][] = [
    'type'        => 'pass',
    'interface'   => 'opt1',
    'ipprotocol'  => 'inet',
    'protocol'    => 'tcp',
    'source'      => ['network' => '192.168.100.0/24'],
    'destination' => ['any' => true, 'port' => '443'],
    'descr'       => 'DMZ → Internet HTTPS : autorisé',
    'tracker'     => '303',
];

// ── DMZ : Bloquer tout le reste ────────────────────────────
$config['filter']['rule'][] = [
    'type'        => 'block',
    'interface'   => 'opt1',
    'ipprotocol'  => 'inet',
    'protocol'    => 'any',
    'source'      => ['any' => true],
    'destination' => ['any' => true],
    'descr'       => 'DMZ → * : défaut bloqué',
    'tracker'     => '304',
];

// ═════════════════════════════════════════════════════════════
// 4. DHCP — IPs fixes pour VM2 et VM3
// ═════════════════════════════════════════════════════════════
$config['dhcpd']['opt1'] = [
    'enable' => true,
    'range'  => ['from' => '192.168.100.100', 'to' => '192.168.100.200'],
    'staticmap' => [[
        'ipaddr'   => '192.168.100.10',
        'hostname' => 'vm2-web',
        'descr'    => 'VM2 Serveur Web',
    ]],
];

$config['dhcpd']['lan'] = [
    'enable' => true,
    'range'  => ['from' => '192.168.10.100', 'to' => '192.168.10.200'],
    'staticmap' => [[
        'ipaddr'   => '192.168.10.20',
        'hostname' => 'vm3-db',
        'descr'    => 'VM3 Serveur DB',
    ]],
];

// ═════════════════════════════════════════════════════════════
// 5. Sauvegarde et rechargement
// ═════════════════════════════════════════════════════════════
write_config("Configuration initiale projet fin de module");
filter_configure();
echo "[OK] Configuration pfSense appliquée avec succès.\n";
echo "[OK] Règles de filtrage rechargées.\n";
?>
PFSENSE_SCRIPT

# Exécuter le script via pfSense PHP shell
/usr/local/bin/php /tmp/configure_pfsense.php
rm -f /tmp/configure_pfsense.php
