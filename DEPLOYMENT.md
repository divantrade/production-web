# 🚀 Luxe Films - Production Deployment Guide

Comprehensive guide for deploying the Luxe Films website to production with monitoring, analytics, and maintenance procedures.

## 📋 Pre-Deployment Checklist

### ✅ Environment Validation
- [ ] All required environment variables set
- [ ] API keys valid and working
- [ ] Database connections tested
- [ ] Third-party integrations verified
- [ ] Security keys generated

### ✅ Code Quality
- [ ] All tests passing (`npm run test:all`)
- [ ] TypeScript compilation successful
- [ ] ESLint issues resolved
- [ ] Performance optimized (Lighthouse 90+)
- [ ] Security headers configured

### ✅ Content Readiness
- [ ] CMS content populated
- [ ] Images optimized and uploaded
- [ ] Videos configured and tested
- [ ] SEO metadata complete
- [ ] Social media tags verified

## 🌐 Vercel Deployment

### Step 1: Repository Setup
```bash
# Ensure clean repository
git status
git add .
git commit -m \"Production deployment preparation\"
git push origin main
```

### Step 2: Vercel Project Creation
1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click \"Import Project\"
   - Select your GitHub repository
   - Configure project settings

2. **Framework Settings**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Environment Variables
Configure in Vercel Dashboard → Settings → Environment Variables:

**Required:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

**Recommended:**
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**Email Services:**
```
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=contact@your-domain.com
```

**APIs (Optional):**
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_key
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
TWITTER_BEARER_TOKEN=your_twitter_token
```

### Step 4: Domain Configuration
1. **Add Domain**
   - Go to Vercel Dashboard → Domains
   - Add your custom domain
   - Configure DNS records

2. **DNS Settings**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Verify HTTPS is working
   - Check SSL rating with [SSL Labs](https://www.ssllabs.com/ssltest/)

## 📊 Analytics & Monitoring Setup

### Google Analytics 4
1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Enhanced Ecommerce** (if applicable)
   ```javascript
   // Already configured in lib/analytics.ts
   gtag('event', 'purchase', {
     transaction_id: 'T_12345',
     value: 25.42,
     currency: 'USD'
   })
   ```

3. **Custom Events**
   - Video plays tracked
   - Form submissions tracked
   - Newsletter signups tracked
   - Download events tracked

### Vercel Analytics
1. **Enable Web Analytics**
   - Go to Vercel Dashboard → Analytics
   - Enable Web Analytics
   - Configure audience tracking

2. **Speed Insights**
   - Enable Speed Insights
   - Monitor Core Web Vitals
   - Set up alerts for performance degradation

### Sentry Error Tracking
1. **Create Sentry Project**
   - Go to [Sentry.io](https://sentry.io)
   - Create new Next.js project
   - Get DSN URL

2. **Configuration**
   ```javascript
   // Already configured in sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs'
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 1.0,
   })
   ```

3. **Source Maps**
   ```bash
   # Upload source maps for better error tracking
   npx @sentry/cli releases files <version> upload-sourcemaps .next/static
   ```

## 🔐 Security Configuration

### SSL/TLS Setup
- [x] SSL certificate auto-provisioned by Vercel
- [x] HTTPS redirect enabled
- [x] HSTS headers configured
- [x] Security headers in middleware.ts

### Content Security Policy
- [x] CSP headers configured in middleware.ts
- [x] Trusted domains whitelisted
- [x] Inline scripts restricted
- [x] XSS protection enabled

### Security Headers Verification
Test security headers:
```bash
curl -I https://your-domain.com
```

Expected headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security`
- `Content-Security-Policy`

## 🚦 Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Checklist
- [x] Next.js Image optimization enabled
- [x] Dynamic imports for code splitting
- [x] Service worker for caching
- [x] Static generation where possible
- [x] CDN delivery via Vercel Edge Network

### Performance Monitoring
```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.com --output=html --output-path=./lighthouse-report.html

# Check Core Web Vitals
npx @lhci/cli autorun
```

## 📱 PWA Configuration

### Service Worker
- [x] Service worker configured in `public/sw.js`
- [x] Caching strategies implemented
- [x] Offline fallback pages
- [x] Background sync for forms

### Web App Manifest
- [x] Manifest file in `public/manifest.json`
- [x] App icons in multiple sizes
- [x] Splash screens configured
- [x] Display mode set to standalone

### PWA Testing
1. **Chrome DevTools**
   - Open DevTools → Application
   - Check Service Worker registration
   - Test offline functionality

2. **Lighthouse PWA Audit**
   ```bash
   npx lighthouse https://your-domain.com --only-categories=pwa
   ```

## 🗂️ Backup & Version Control

### Git Repository
1. **Branch Protection Rules**
   ```
   Branch: main
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date
   - Restrict pushes to administrators
   ```

2. **Automated Workflows**
   - [x] CI/CD pipeline in `.github/workflows/`
   - [x] Automated testing on PRs
   - [x] Security scanning
   - [x] Dependency updates

### CMS Backup
1. **Sanity Backup Script**
   ```bash
   # Create backup script
   cat > scripts/backup-sanity.sh << EOF
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   sanity dataset export production backup_\$DATE.tar.gz
   aws s3 cp backup_\$DATE.tar.gz s3://your-backup-bucket/sanity/
   EOF
   
   chmod +x scripts/backup-sanity.sh
   ```

2. **Automated Backups**
   - Set up daily automated backups
   - Store in secure cloud storage
   - Test restore procedures monthly

## 🔍 SEO Configuration

### Search Console Setup
1. **Verify Ownership**
   - Add property in [Google Search Console](https://search.google.com/search-console)
   - Verify via DNS or HTML tag
   - Submit sitemap.xml

2. **Sitemap Submission**
   ```
   Sitemap URL: https://your-domain.com/sitemap.xml
   ```

3. **Monitor Performance**
   - Track keyword rankings
   - Monitor click-through rates
   - Check for crawl errors
   - Review mobile usability

### Structured Data
- [x] Organization schema implemented
- [x] WebSite schema with search action
- [x] VideoObject schema for projects
- [x] BreadcrumbList schema
- [x] Review schema for testimonials

### SEO Testing
```bash
# Test structured data
curl \"https://search.google.com/test/rich-results?url=https://your-domain.com\"

# Check meta tags
curl -s https://your-domain.com | grep -i \"<meta\"
```

## 📧 Email Configuration

### SMTP Setup
1. **Gmail App Password**
   - Enable 2FA on Gmail account
   - Generate app-specific password
   - Use in SMTP_PASS environment variable

2. **Email Templates**
   - [x] Contact form confirmation
   - [x] Newsletter welcome email
   - [x] Admin notification emails

### Email Testing
```bash
# Test contact form
curl -X POST https://your-domain.com/api/contact \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"name\": \"Test User\",
    \"email\": \"test@example.com\",
    \"message\": \"Test message\"
  }'
```

## 🚀 Launch Checklist

### Pre-Launch (T-1 Week)
- [ ] **DNS Setup**: Configure domain DNS
- [ ] **SSL Certificate**: Verify HTTPS working
- [ ] **Content Review**: Final content approval
- [ ] **Performance Test**: Lighthouse audit 90+
- [ ] **Security Scan**: No vulnerabilities found
- [ ] **Cross-browser Test**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile Test**: iOS and Android devices
- [ ] **Form Testing**: All forms working correctly
- [ ] **Analytics Setup**: GA4 and other tracking verified
- [ ] **Backup Procedures**: Automated backups configured

### Launch Day (T-0)
- [ ] **Final Build**: Deploy latest code
- [ ] **DNS Propagation**: Verify domain resolving
- [ ] **SSL Verification**: HTTPS working globally
- [ ] **Monitoring Active**: All monitoring systems online
- [ ] **Team Notification**: Inform stakeholders
- [ ] **Search Console**: Submit sitemap
- [ ] **Social Media**: Update profile links
- [ ] **CDN**: Clear any cached content
- [ ] **Load Testing**: Verify performance under load

### Post-Launch (T+1 Day)
- [ ] **Error Monitoring**: Check for any issues
- [ ] **Performance Check**: Core Web Vitals green
- [ ] **Analytics Verification**: Data flowing correctly
- [ ] **User Testing**: Test critical user flows
- [ ] **SEO Check**: Verify indexing started
- [ ] **Backup Verification**: Confirm backups working
- [ ] **Uptime Monitoring**: Set up alerts
- [ ] **Documentation Update**: Update any changed procedures

## 📈 Post-Launch Monitoring

### Daily Monitoring
- [ ] **Uptime**: 99.9% target
- [ ] **Error Rate**: < 1% target
- [ ] **Response Time**: < 2s average
- [ ] **Core Web Vitals**: All green
- [ ] **Security Alerts**: No incidents

### Weekly Reporting
- [ ] **Analytics Review**: Traffic, conversions, user behavior
- [ ] **Performance Report**: Speed metrics and optimizations
- [ ] **Security Review**: Vulnerability scans and updates
- [ ] **Content Updates**: New projects, blog posts
- [ ] **Backup Verification**: Test restore procedures

### Monthly Tasks
- [ ] **Dependency Updates**: Security patches and updates
- [ ] **SEO Audit**: Rankings, technical SEO, content gaps
- [ ] **Performance Optimization**: Identify bottlenecks
- [ ] **User Experience Review**: Analyze user journeys
- [ ] **Competitor Analysis**: Monitor competitive landscape

## 🆘 Emergency Procedures

### Site Down
1. **Check Status**
   - Verify Vercel status page
   - Check DNS resolution
   - Test from multiple locations

2. **Immediate Actions**
   - Roll back recent deployments
   - Contact hosting provider
   - Activate maintenance page

3. **Communication**
   - Notify stakeholders
   - Update social media
   - Prepare status updates

### Security Incident
1. **Immediate Response**
   - Isolate affected systems
   - Change all passwords/API keys
   - Review access logs

2. **Investigation**
   - Document incident details
   - Identify attack vectors
   - Assess data impact

3. **Recovery**
   - Restore from clean backups
   - Apply security patches
   - Monitor for continued threats

## 📞 Support Contacts

### Technical Support
- **Primary**: [Developer Contact]
- **Hosting**: Vercel Support
- **CDN**: Vercel Edge Network
- **DNS**: Domain registrar support

### Service Providers
- **Analytics**: Google Analytics Support
- **Error Tracking**: Sentry Support
- **Email**: SMTP provider support
- **CMS**: Sanity Support

### Emergency Escalation
1. **Level 1**: Technical lead
2. **Level 2**: Project manager
3. **Level 3**: Senior management

---

## 🎯 Success Metrics

### Performance KPIs
- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: All metrics in green
- **Uptime**: 99.9% availability
- **Load Time**: < 2 seconds average

### Business KPIs
- **Traffic Growth**: Month-over-month increase
- **Conversion Rate**: Contact form submissions
- **SEO Performance**: Organic traffic growth
- **User Engagement**: Time on site, pages per session

---

*This deployment guide should be reviewed and updated regularly as the project evolves.*