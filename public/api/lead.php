<?php
// Primește formularul de înscriere și îl trimite pe email la hallo@germanlingua.md.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function out($code, $ok) { http_response_code($code); echo json_encode(['ok' => $ok]); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, false);

$raw = file_get_contents('php://input');
if (strlen($raw) > 10000) out(413, false);
$d = json_decode($raw, true);
if (!is_array($d)) out(400, false);

function clean($v, $max) {
    $v = is_string($v) ? trim($v) : '';
    $v = str_replace(["\r", "\n"], ' ', $v);
    return mb_substr($v, 0, $max);
}

$name    = clean($d['name'] ?? '', 120);
$phone   = clean($d['phone'] ?? '', 40);
$comment = is_string($d['comment'] ?? null) ? mb_substr(trim($d['comment']), 0, 2000) : '';
$lang    = clean($d['lang'] ?? '', 5);
$source  = clean($d['source'] ?? '', 60);
$course  = clean($d['course'] ?? '', 60);

if (mb_strlen($name) < 2 || strlen(preg_replace('/\D/', '', $phone)) < 6) out(400, false);

// Limită simplă anti-spam: maxim 5 cereri pe oră de la aceeași adresă IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
$f = sys_get_temp_dir() . '/gl_rate_' . md5($ip);
$hits = [];
if (is_file($f)) $hits = array_filter(array_map('intval', explode(',', (string)file_get_contents($f))), fn($t) => $t > time() - 3600);
if (count($hits) >= 5) out(429, false);
$hits[] = time();
@file_put_contents($f, implode(',', $hits));

$to = 'hallo@germanlingua.md';
$subject = '=?UTF-8?B?' . base64_encode('Cerere nouă de pe site: ' . $name) . '?=';
$body = "Cerere nouă de pe germanlingua.md\n\n"
      . "Nume: $name\nTelefon: $phone\n"
      . ($course ? "Curs: $course\n" : '')
      . "Limba site: $lang\nSecțiune: $source\n\nMesaj:\n" . ($comment ?: '-') . "\n";
$headers = "From: GermanLingua <noreply@germanlingua.md>\r\n"
         . "Reply-To: $to\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

if (!@mail($to, $subject, $body, $headers, '-f noreply@germanlingua.md')) out(500, false);
out(200, true);
