<?php
/**
 * Qutaifan ERP - Security Headers
 * Include this file early in main.inc.php for CSP and security headers
 */

// Content Security Policy - Prevents XSS and injection attacks
$csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Required for Dolibarr inline scripts
    "style-src 'self' 'unsafe-inline'",                  // Required for dynamic CSS
    "img-src 'self' data: blob: https:",                 // Allow images from various sources
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'self'",                            // Prevent clickjacking
    "form-action 'self'",
    "base-uri 'self'",
];

header("Content-Security-Policy: " . implode('; ', $csp));

// Other Security Headers
header("X-Content-Type-Options: nosniff");              // Prevent MIME sniffing
header("X-Frame-Options: SAMEORIGIN");                  // Prevent clickjacking
header("X-XSS-Protection: 1; mode=block");              // XSS filter (legacy browsers)
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: camera=(), microphone=(), geolocation=()");

// HSTS - Strict Transport Security (only if HTTPS)
if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
}

// Cache control for sensitive pages
if (isset($_SERVER['REQUEST_URI']) && preg_match('/(login|admin|passwd|conf)/i', $_SERVER['REQUEST_URI'])) {
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Pragma: no-cache");
}
