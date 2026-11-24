<?php
// Numără clicurile pe telefon / WhatsApp / Telegram / email / rețele.
// Se scrie într-un fișier din afara site-ului public: /home/<user>/gl-events.csv
date_default_timezone_set('Europe/Chisinau');
header('X-Robots-Tag: noindex');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
$raw = file_get_contents('php://input');
if (strlen($raw) > 2000) { http_response_code(413); exit; }
$d = json_decode($raw, true);
if (!is_array($d)) { http_response_code(400); exit; }

$allowed = ['phone_click', 'whatsapp_click', 'telegram_click', 'email_click', 'social_click'];
$event = (string)($d['event'] ?? '');
if (!in_array($event, $allowed, true)) { http_response_code(400); exit; }

function c($v, $n) { return mb_substr(str_replace([';', "\r", "\n"], [',', ' ', ' '], is_string($v) ? trim($v) : ''), 0, $n); }

// cel mult 30 de evenimente pe oră de la aceeași adresă IP
$f = sys_get_temp_dir() . '/gl_ev_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x');
$hits = is_file($f) ? array_filter(explode(',', (string)file_get_contents($f)), fn($t) => (int)$t > time() - 3600) : [];
if (count($hits) >= 30) { http_response_code(429); exit; }
$hits[] = time();
@file_put_contents($f, implode(',', $hits));

@file_put_contents(dirname($_SERVER['DOCUMENT_ROOT']) . '/gl-events.csv',
    implode(';', [date('Y-m-d H:i:s'), $event, c($d['page'] ?? '', 120), c($d['src'] ?? '', 200), c($d['network'] ?? '', 20)]) . "\n",
    FILE_APPEND | LOCK_EX);
http_response_code(204);
