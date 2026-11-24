<?php
// Pagina de statistici: câte cereri, apeluri și mesaje au venit și de unde.
// Se deschide cu cheia din /home/<user>/gl-config.php ('stats_key'):  /api/stats.php?k=CHEIA
date_default_timezone_set('Europe/Chisinau');
header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
$root = dirname($_SERVER['DOCUMENT_ROOT']);
$cfg = is_file("$root/gl-config.php") ? (include "$root/gl-config.php") : [];
if (empty($cfg['stats_key']) || !hash_equals((string)$cfg['stats_key'], (string)($_GET['k'] ?? ''))) {
    http_response_code(404); echo 'Not found'; exit;
}
$days = max(1, min(365, (int)($_GET['zile'] ?? 30)));
$since = date('Y-m-d H:i:s', time() - $days * 86400);
$names = [
    'form_submit' => 'Formulare trimise', 'phone_click' => 'Apăsări pe telefon', 'whatsapp_click' => 'WhatsApp',
    'telegram_click' => 'Telegram', 'email_click' => 'Email', 'social_click' => 'Facebook / Instagram',
];
$byEvent = array_fill_keys(array_keys($names), 0);
$bySource = [];
$byDay = [];
$f = "$root/gl-events.csv";
if (is_file($f)) {
    foreach (file($f, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $p = explode(';', $line);
        if (count($p) < 4 || $p[0] < $since || !isset($names[$p[1]])) continue;
        $byEvent[$p[1]]++;
        $src = $p[3] !== '' ? $p[3] : 'necunoscut';
        $bySource[$src][$p[1]] = ($bySource[$src][$p[1]] ?? 0) + 1;
        $byDay[substr($p[0], 0, 10)][$p[1]] = ($byDay[substr($p[0], 0, 10)][$p[1]] ?? 0) + 1;
    }
}
uasort($bySource, fn($a, $b) => array_sum($b) <=> array_sum($a));
krsort($byDay);
$h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
$k = $h($_GET['k']);
?><!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Statistici GermanLingua</title>
<style>body{font-family:system-ui,sans-serif;margin:24px;color:#2d2018;background:#fffaf0}h1{color:#c4122f}
table{border-collapse:collapse;margin:12px 0 28px;background:#fff;min-width:320px}th,td{border:1px solid #eadfcf;padding:8px 12px;text-align:left}
th{background:#ffd25a}.n{text-align:right}.tabs a{margin-right:10px;color:#c4122f}.cards{display:flex;flex-wrap:wrap;gap:12px}
.card{background:#fff;border:1px solid #eadfcf;border-radius:14px;padding:14px 18px;min-width:150px}.card b{font-size:28px;display:block}</style></head><body>
<h1>Statistici GermanLingua — ultimele <?= $days ?> zile</h1>
<p class="tabs">Perioada: <a href="?k=<?= $k ?>&zile=7">7 zile</a><a href="?k=<?= $k ?>&zile=30">30 zile</a><a href="?k=<?= $k ?>&zile=90">90 zile</a><a href="?k=<?= $k ?>&zile=365">1 an</a></p>
<div class="cards"><?php foreach ($names as $e => $n): ?><div class="card"><?= $h($n) ?><b><?= $byEvent[$e] ?></b></div><?php endforeach; ?></div>
<h2>De unde vin</h2>
<table><tr><th>Sursa</th><?php foreach ($names as $n): ?><th><?= $h($n) ?></th><?php endforeach; ?></tr>
<?php foreach ($bySource as $src => $row): ?><tr><td><?= $h($src) ?></td><?php foreach ($names as $e => $n): ?><td class="n"><?= $row[$e] ?? 0 ?></td><?php endforeach; ?></tr><?php endforeach; ?>
<?php if (!$bySource): ?><tr><td colspan="7">Încă nimic în această perioadă.</td></tr><?php endif; ?></table>
<h2>Pe zile</h2>
<table><tr><th>Ziua</th><?php foreach ($names as $n): ?><th><?= $h($n) ?></th><?php endforeach; ?></tr>
<?php foreach ($byDay as $day => $row): ?><tr><td><?= $h($day) ?></td><?php foreach ($names as $e => $n): ?><td class="n"><?= $row[$e] ?? 0 ?></td><?php endforeach; ?></tr><?php endforeach; ?></table>
<p style="color:#6b5d52">„Apăsări pe telefon” = câți au apăsat pe număr pe site (pe telefon pornește apelul). Apelurile făcute de pe numărul văzut în reclamă sau pe hartă nu apar aici.</p>
</body></html>
