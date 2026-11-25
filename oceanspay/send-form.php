<?php
declare(strict_types=1);

/*
 * OCEAN ACROSS — UNIVERSAL SMTP FORM HANDLER
 *
 * Upload as: public_html/send-form.php
 * Every HTML form can use this same file:
 *   <form action="/send-form.php" method="post">
 *
 * REQUIREMENT: PHP 8+ with OpenSSL enabled.
 */

// --------------------------------------------------------------------------
// 1. ENTER YOUR SMTP DETAILS HERE
// --------------------------------------------------------------------------
$smtpHost     = 'smtp-relay.brevo.com'; // Replace if your SMTP provider differs.
$smtpPort     = 587;                     // Usually 587 for TLS or 465 for SSL.
$smtpSecurity = 'tls';                   // tls, ssl or none
$smtpUsername = 'PASTE_SMTP_USERNAME_HERE';
$smtpPassword = 'PASTE_SMTP_PASSWORD_HERE';

$fromEmail = 'info@ocean-across.com';
$fromName  = 'Ocean Across Website';
$toEmail   = 'info@ocean-across.com';
$toName    = 'Ocean Across';

// --------------------------------------------------------------------------
// 2. INTERNAL FUNCTIONS — NO CHANGES NEEDED BELOW THIS LINE
// --------------------------------------------------------------------------

function smtpRead($socket): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') break;
    }
    return $response;
}

function smtpExpect($socket, array $allowedCodes): string
{
    $response = smtpRead($socket);
    $code = (int)substr($response, 0, 3);
    if (!in_array($code, $allowedCodes, true)) {
        throw new RuntimeException('SMTP rejected the request with code ' . $code);
    }
    return $response;
}

function smtpCommand($socket, string $command, array $allowedCodes): string
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('Could not write to SMTP server');
    }
    return smtpExpect($socket, $allowedCodes);
}

function cleanHeader(string $value, int $limit = 200): string
{
    $value = preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $value) ?? '';
    return substr(trim($value), 0, $limit);
}

function cleanValue(mixed $value, int $limit = 5000): string
{
    if (is_array($value)) {
        $items = [];
        foreach (array_slice($value, 0, 20) as $item) {
            if (is_scalar($item)) $items[] = cleanValue((string)$item, 300);
        }
        return implode(', ', array_filter($items, static fn($item) => $item !== ''));
    }
    if (!is_scalar($value)) return '';
    $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', (string)$value) ?? '';
    return substr(trim($text), 0, $limit);
}

function displayLabel(string $key): string
{
    $key = preg_replace('/([a-z])([A-Z])/', '$1 $2', $key) ?? $key;
    $key = str_replace(['_', '-'], ' ', $key);
    return ucwords(trim($key));
}

function safeReturnPath(string $path): string
{
    $path = trim($path);
    if ($path === '' || $path[0] !== '/' || str_starts_with($path, '//')) return '/';
    $parts = parse_url($path);
    if ($parts === false || isset($parts['scheme']) || isset($parts['host'])) return '/';
    return $path;
}

function finishRequest(bool $success, string $returnPath): void
{
    $fragment = '';
    $hashPosition = strpos($returnPath, '#');
    if ($hashPosition !== false) {
        $fragment = substr($returnPath, $hashPosition);
        $returnPath = substr($returnPath, 0, $hashPosition);
    }
    $separator = str_contains($returnPath, '?') ? '&' : '?';
    header('Location: ' . $returnPath . $separator . 'lead=' . ($success ? 'sent' : 'error') . $fragment, true, 303);
    exit;
}

function formatAddress(string $name, string $email): string
{
    $name = cleanHeader($name);
    return $name !== '' ? '"' . addcslashes($name, '"\\') . '" <' . $email . '>' : '<' . $email . '>';
}

function sendUsingSmtp(
    string $host,
    int $port,
    string $security,
    string $username,
    string $password,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $replyEmail,
    string $replyName,
    string $subject,
    string $body
): void {
    $security = strtolower($security);
    if (!in_array($security, ['tls', 'ssl', 'none'], true)) {
        throw new RuntimeException('Invalid SMTP security setting');
    }

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
            'peer_name' => $host,
        ],
    ]);

    $transport = $security === 'ssl' ? 'ssl://' : 'tcp://';
    $socket = @stream_socket_client(
        $transport . $host . ':' . $port,
        $errorNumber,
        $errorMessage,
        20,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!is_resource($socket)) {
        throw new RuntimeException('Could not connect to SMTP server');
    }

    stream_set_timeout($socket, 20);

    try {
        smtpExpect($socket, [220]);
        $hostname = preg_replace('/[^A-Za-z0-9.-]/', '', gethostname() ?: 'ocean-across.com');
        smtpCommand($socket, 'EHLO ' . ($hostname ?: 'ocean-across.com'), [250]);

        if ($security === 'tls') {
            smtpCommand($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Could not start encrypted SMTP connection');
            }
            smtpCommand($socket, 'EHLO ' . ($hostname ?: 'ocean-across.com'), [250]);
        }

        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($username), [334]);
        smtpCommand($socket, base64_encode($password), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        $messageIdDomain = substr(strrchr($fromEmail, '@') ?: '@ocean-across.com', 1);
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: ' . formatAddress($fromName, $fromEmail),
            'To: ' . formatAddress($toName, $toEmail),
            'Reply-To: ' . formatAddress($replyName, $replyEmail),
            'Subject: ' . cleanHeader($subject, 180),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $messageIdDomain . '>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];

        $message = implode("\r\n", $headers) . "\r\n\r\n";
        $message .= str_replace(["\r\n", "\r"], "\n", $body);
        $message = str_replace("\n", "\r\n", $message);
        $message = preg_replace('/^\./m', '..', $message) ?? $message;

        if (fwrite($socket, $message . "\r\n.\r\n") === false) {
            throw new RuntimeException('Could not send email content');
        }
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

// --------------------------------------------------------------------------
// 3. PROCESS THE FORM
// --------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method not allowed');
}

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) {
    http_response_code(413);
    exit('Form submission is too large');
}

$returnPath = safeReturnPath(cleanValue($_POST['return_to'] ?? '/', 500));

// Honeypot: add a hidden field named website to every form. Humans leave it blank.
if (cleanValue($_POST['website'] ?? '', 300) !== '') {
    finishRequest(true, $returnPath);
}

$visitorName = cleanValue($_POST['name'] ?? $_POST['full_name'] ?? '', 120);
$visitorEmail = cleanValue($_POST['email'] ?? '', 254);
$formName = cleanHeader(cleanValue($_POST['form_name'] ?? 'Website Enquiry', 100));

if ($visitorName === '' || !filter_var($visitorEmail, FILTER_VALIDATE_EMAIL)) {
    finishRequest(false, $returnPath);
}

$ignoredFields = ['website', 'return_to', 'form_name', 'submit'];
$lines = [
    'A new Ocean Across website form has been submitted.',
    '',
    'Form: ' . $formName,
    'Submitted: ' . date('d M Y, H:i T'),
    '',
];

foreach ($_POST as $key => $value) {
    if (!is_string($key) || in_array($key, $ignoredFields, true)) continue;
    $label = displayLabel(substr($key, 0, 100));
    $clean = cleanValue($value);
    $lines[] = $label . ': ' . ($clean !== '' ? $clean : '(not provided)');
    $lines[] = '';
}

$subject = '[Ocean Across] New ' . ($formName !== '' ? $formName : 'Website Enquiry');
$body = implode("\n", $lines);

try {
    foreach ([$fromEmail, $toEmail] as $configuredEmail) {
        if (!filter_var($configuredEmail, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('Invalid configured email address');
        }
    }
    if ($smtpUsername === 'PASTE_SMTP_USERNAME_HERE' || $smtpPassword === 'PASTE_SMTP_PASSWORD_HERE') {
        throw new RuntimeException('SMTP credentials have not been configured');
    }

    sendUsingSmtp(
        $smtpHost,
        $smtpPort,
        $smtpSecurity,
        $smtpUsername,
        $smtpPassword,
        $fromEmail,
        $fromName,
        $toEmail,
        $toName,
        $visitorEmail,
        $visitorName,
        $subject,
        $body
    );
    finishRequest(true, $returnPath);
} catch (Throwable $error) {
    // The detailed error is written to Hostinger's PHP error log, never shown publicly.
    error_log('Ocean Across form email failed: ' . $error->getMessage());
    finishRequest(false, $returnPath);
}

