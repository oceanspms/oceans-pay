# Oceans Pay website by Ocean Across

This folder is the complete deployable website. Ocean Across is the company; Oceans Pay is the payroll software product.

## Deploy by FTP

1. Extract the ZIP.
2. Open the single folder named `Ocean-Across-Oceans-Pay-Website`.
3. Copy everything inside that folder into the desired server folder, for example `public_html/payroll-software/`.
4. Keep the `assets` folder beside the HTML files. Do not move or rename individual assets.

There is no build step and no package manager. `index.html` is the homepage.

## Book-a-demo email setup

The Book a Demo form submits to `send-form.php` and returns to the same page with an inline success or error message.

Before using this copy on another server, enter the SMTP username and password near the top of `send-form.php`. The supplied file deliberately contains placeholders and no private credentials. The server requires PHP 8+ with OpenSSL and outbound SMTP access.

If the live server already has a working, credential-configured `send-form.php`, keep a secure copy of those settings before replacing the file.

## Included

- All public HTML pages
- All hero artwork and supporting image assets
- Ocean Across light and reverse wordmark SVGs
- Oceans Pay product mark
- Shared, page-specific, responsive and readability stylesheets
- Mobile navigation and form-result JavaScript
- SMTP form handler

## Current temporary behaviour

All “watch demo” calls to action route to the Book a Demo page until video content is available.

