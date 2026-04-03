# Security Policy for iLSATEC Website

## Overview
This document outlines the security measures implemented for the iLSATEC website and guidelines for maintaining security as the project evolves.

## Implemented Security Features

### 1. **Content Security Policy (CSP)**
- **Meta Tag**: Strict CSP configured to prevent XSS attacks
- **Allowed Sources**:
  - Scripts: `'self'` only (no inline scripts)
  - Styles: `'self'` and Google Fonts (with `'unsafe-inline'` for critical styles)
  - Fonts: Google Fonts via `fonts.gstatic.com`
  - Images: `'self'`, data URIs, and HTTPS sources
- **Restrictions**:
  - `frame-ancestors 'none'`: Prevents clickjacking (cannot be embedded in iframes)
  - `base-uri 'self'`: Restricts base URL to same origin
  - `form-action 'self'`: Forms can only submit to same origin

### 2. **HTTP Security Headers**
- **X-UA-Compatible**: Forces modern IE/Edge rendering
- **X-Content-Type-Options: nosniff**: Prevents MIME type sniffing attacks
- **X-Frame-Options: DENY**: Blocks embedding in frames/iframes
- **Referrer-Policy: strict-origin-when-cross-origin**: Controls referrer information
- **Permissions-Policy**: Explicitly denies access to sensitive browser APIs (camera, microphone, geolocation, etc.)

### 3. **HTTPS**
- Website is hosted on GitHub Pages, which provides free HTTPS
- All external resources (Google Fonts) are loaded over HTTPS
- Automatic HTTP → HTTPS redirect is enabled

### 4. **Input & Output Handling**
- No direct use of `innerHTML`, `eval()`, or `document.write()`
- DOM manipulation uses safe methods: `textContent`, `classList`, `addEventListener`
- All user-generated content properly escaped (if forms are added in the future)

### 5. **External Resources**
- Google Fonts loaded with `crossorigin="anonymous"` attribute
- All external resources use HTTPS
- Consider adding Subresource Integrity (SRI) hashes if additional resources are added

### 6. **Dependencies**
- Minimal external dependencies (only Google Fonts)
- No npm packages or third-party libraries with potential vulnerabilities
- CSS and JavaScript are custom-built and reviewed

---

## Security Best Practices for Future Development

### When Adding New Features:

#### 1. **Forms & User Input**
```javascript
// ✅ SAFE: Sanitize and escape user input
const userInput = document.getElementById('input').value;
const sanitized = userInput.replace(/[<>]/g, ''); // Basic sanitization
element.textContent = sanitized; // Use textContent, not innerHTML

// ❌ WRONG: Direct innerHTML assignment
element.innerHTML = userInput; // VULNERABLE to XSS
```

#### 2. **External Scripts**
```html
<!-- ✅ SAFE: Use SRI hashes for external scripts -->
<script src="https://example.com/lib.js" integrity="sha384-..." crossorigin="anonymous"></script>

<!-- ❌ WRONG: No integrity check -->
<script src="https://example.com/lib.js"></script>
```

#### 3. **API Calls**
```javascript
// ✅ SAFE: Validate & sanitize server responses
fetch('/api/data')
  .then(r => r.json())
  .then(data => {
    // Validate data structure
    if (data && typeof data.content === 'string') {
      element.textContent = data.content; // Safe
    }
  });

// ❌ WRONG: Trust untrusted data
fetch('/api/data')
  .then(r => r.json())
  .then(data => {
    element.innerHTML = data.html; // VULNERABLE
  });
```

#### 4. **Update CSP if New Resources Needed**
Edit the CSP meta tag in `index.html` `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' https://new-trusted-source.com; ...">
```

---

## Security Checklist

- [x] HTTPS enabled (GitHub Pages)
- [x] Content Security Policy configured
- [x] Security headers implemented
- [x] No dangerous JavaScript patterns (eval, innerHTML with user input)
- [x] External resources use HTTPS and crossorigin
- [x] Sensitive APIs disabled via Permissions-Policy
- [x] Clickjacking protection enabled
- [x] MIME type sniffing prevention
- [x] No sensitive data in version control (API keys, passwords)
- [x] Regular security audits recommended

---

## Vulnerability Reporting

If you discover a security vulnerability, please:

1. **Do NOT** open a public GitHub issue
2. Email: [contact@ilsatec.com] (when contact form is added)
3. Include details of the vulnerability and steps to reproduce
4. Allow reasonable time for patching before public disclosure

---

## Regular Security Maintenance

### Monthly Tasks:
- Check for outdated dependencies (if using any)
- Review access logs for unusual patterns
- Scan website with OWASP ZAP or similar tools

### Quarterly Tasks:
- Security audit of code changes
- Review CSP and update if needed
- Test browser compatibility and security headers

### Annual Tasks:
- Comprehensive security assessment
- Penetration testing (if expanded)
- Update security policies

---

## Security Tools & Resources

### Testing Tools:
- **OWASP ZAP**: https://www.zaproxy.org/
- **Burp Suite Community**: https://portswigger.net/burp/communitydownload
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **SSL Labs**: https://www.ssllabs.com/ssltest/

### Security Guidelines:
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **CSP Guide**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- **MDN Security**: https://developer.mozilla.org/en-US/docs/Learn/Security

---

## Version History
- **v1.0** (April 3, 2026): Initial security setup with CSP and HTTP headers
