# iLSATEC Security Checklist

## Current Security Status ✅

### Infrastructure
- [x] HTTPS enabled via GitHub Pages
- [x] Custom domain auto-redirects to HTTPS
- [x] No direct server management needed

### Code Security
- [x] No eval() or dangerous functions
- [x] No innerHTML with user input
- [x] No hardcoded secrets/keys
- [x] Safe DOM manipulation practices
- [x] No unnecessary external scripts

### Headers & Policies
- [x] Content Security Policy (CSP) meta tag
- [x] X-Frame-Options: DENY (clickjacking protection)
- [x] X-Content-Type-Options: nosniff (MIME sniffing protection)
- [x] Referrer-Policy configured
- [x] Permissions-Policy restricts browser APIs
- [x] External resources (fonts) use HTTPS + crossorigin

### Documentation
- [x] SECURITY.md created with full guidelines
- [x] security.txt file for vulnerability reporting
- [x] robots.txt to control crawlers
- [x] .gitignore to prevent accidental commits

### File Structure
```
ilsatec/
├── plain/
│   ├── index.html          (includes CSP headers)
│   ├── style.css
│   ├── script.js           (safe DOM practices)
│   └── .well-known/
│       └── security.txt    (vulnerability reporting)
├── SECURITY.md             (full security policy)
├── robots.txt              (crawler control)
├── .gitignore              (prevent secrets)
└── README.md
```

---

## Monthly Security Tasks

- [ ] Run OWASP ZAP scan: https://www.zaproxy.org/
- [ ] Check Mozilla Observatory: https://observatory.mozilla.org/
- [ ] Review git history for accidental commits: `git log -p --all -S 'password\|key\|secret'`

## When Adding Features

1. **Forms**: Always sanitize & escape user input
2. **External Scripts**: Use Subresource Integrity (SRI) hashes
3. **API Integration**: Validate all server responses
4. **Updates**: Test new code against CSP policy
5. **Dependencies**: Audit with `npm audit` (if using npm)

---

## Useful Security Tools

| Tool | Purpose | Link |
|------|---------|------|
| OWASP ZAP | Automated vulnerability scanning | https://www.zaproxy.org/ |
| Mozilla Observatory | Security header analysis | https://observatory.mozilla.org/ |
| SSL Labs | HTTPS/SSL testing | https://www.ssllabs.com/ssltest/ |
| npm audit | Dependency vulnerability scanning | Built into npm |
| Snyk | Continuous vulnerability monitoring | https://snyk.io/ |

---

## Security Headers Explained

### Content-Security-Policy
Prevents inline scripts and restricts where resources can load from. Blocks most XSS attacks.

### X-Frame-Options: DENY
Prevents your site from being embedded in `<iframe>` on other sites (clickjacking protection).

### X-Content-Type-Options: nosniff
Tells browsers not to guess MIME types - attackers can't trick browsers into executing content.

### Referrer-Policy: strict-origin-when-cross-origin
Controls how much referrer info is shared when navigating between sites.

### Permissions-Policy
Explicitly denies permission to use sensitive APIs (camera, microphone, geolocation, payment request, etc.).

---

## Next Steps (Optional)

- [ ] Add HSTS header (HTTP Strict Transport Security) via GitHub Pages settings
- [ ] Configure GitHub Dependabot for security updates
- [ ] Set up branch protection rules
- [ ] Enable GitHub security scanning
- [ ] Add Privacy Policy and Terms of Service

---

Last Updated: April 3, 2026
