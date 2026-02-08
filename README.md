# Luxe Films - Premium Film Production Website

A modern, high-performance website built with Next.js 14 for a luxury film production company specializing in documentaries, commercials, and music videos.

## 🎬 Features

### Core Features
- **Modern Design System**: Luxury film industry aesthetic with gold/brass color palette
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Advanced Animations**: Framer Motion powered transitions and scroll-triggered animations
- **Video Integration**: YouTube API integration with custom video player
- **Content Management**: Sanity CMS for easy content updates
- **SEO Optimized**: Comprehensive SEO with structured data and metadata
- **Performance Optimized**: Lighthouse score 90+ with image/video optimization

### Advanced Features
- **Dark/Light Mode**: System preference detection with manual toggle
- **Global Search**: Command+K instant search functionality
- **Interactive Gallery**: Lightbox with filtering and infinite scroll
- **Newsletter Integration**: Email validation with GDPR compliance
- **Live Chat**: WhatsApp Business integration
- **Social Proof**: Instagram feeds and testimonial management
- **PWA Support**: Offline functionality and app-like experience
- **Analytics**: Google Analytics 4 integration

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: React Context + Hooks

### Backend & CMS
- **CMS**: Sanity.io
- **Database**: Sanity Studio
- **API**: RESTful APIs with Next.js API routes
- **Image Optimization**: Next.js Image + Sanity Image URLs

### Development & Testing
- **Testing**: Jest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Error Tracking**: Sentry
- **CI/CD**: GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Email Services (Optional)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
CONVERTKIT_API_KEY=your_convertkit_api_key

# Error Tracking
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project

# Social Media APIs (Optional)
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
TWITTER_BEARER_TOKEN=your_twitter_token
```

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd production-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. **Set up Sanity CMS**
```bash
cd sanity
npm install
npm run dev
```

5. **Start development server**
```bash
npm run dev
```

6. **Install Playwright browsers (for E2E tests)**
```bash
npx playwright install
```

## 🛠 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
npm run test:e2e       # Run E2E tests
npm run test:e2e:ui    # Run E2E tests with UI
npm run test:all       # Run all tests

# Quality Assurance
npm run type-check     # TypeScript type checking
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
```

### Project Structure

```
production-web/
├── app/                    # Next.js 14 App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── animations/       # Animation components
│   ├── video/            # Video components
│   ├── gallery/          # Gallery components
│   ├── newsletter/       # Newsletter components
│   ├── chat/             # Chat components
│   ├── search/           # Search components
│   ├── theme/            # Theme components
│   └── social/           # Social components
├── lib/                  # Utility functions
│   ├── animations.ts     # Animation utilities
│   ├── utils.ts          # General utilities
│   ├── theme.ts          # Theme management
│   └── sanity.ts         # Sanity client
├── public/               # Static assets
├── sanity/               # Sanity CMS setup
├── __tests__/            # Unit tests
├── e2e/                  # E2E tests
├── docs/                 # Documentation
└── .github/              # GitHub workflows
```

### Component Guidelines

#### UI Components
- Located in `components/ui/`
- Built with composition pattern
- Fully typed with TypeScript
- Include proper accessibility attributes
- Support theme variants (light/dark)

#### Animation Components
- Use Framer Motion for animations
- Implement scroll-triggered reveals
- Include reduced motion support
- Performance optimized with `will-change`

#### Video Components
- Support multiple video sources
- Include accessibility controls
- Lazy loading implementation
- Error handling and fallbacks

### Styling Guidelines

#### Tailwind CSS
- Use design tokens for consistency
- Mobile-first responsive design
- Dark mode support with `dark:` prefix
- Custom animations in `tailwind.config.js`

#### Color Palette
```css
/* Primary Colors */
--primary: #D4AF37;      /* Gold */
--primary-dark: #B8942D; /* Dark Gold */

/* Accent Colors */
--accent: #C9A961;       /* Brass */
--accent-dark: #A8894E;  /* Dark Brass */

/* Neutral Colors */
--background: #FFFFFF;    /* Light Mode */
--background-dark: #0A0A0A; /* Dark Mode */
--foreground: #1A1A1A;   /* Light Mode */
--foreground-dark: #FFFFFF; /* Dark Mode */
```

## 🧪 Testing

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: Minimum 70% coverage required
- **Location**: `__tests__/` directory
- **Mocks**: Comprehensive mocking for external dependencies

### E2E Testing
- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari (desktop + mobile)
- **Location**: `e2e/` directory
- **Features**: Form validation, navigation, responsive design

### Testing Best Practices
- Write tests before implementing features (TDD)
- Test user interactions, not implementation details
- Use accessibility queries when possible
- Mock external APIs and services
- Include error scenarios and edge cases

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Docker
```bash
# Build Docker image
docker build -t luxe-films .

# Run container
docker run -p 3000:3000 luxe-films
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Setup
- **Development**: `.env.local`
- **Staging**: Vercel environment variables
- **Production**: Vercel environment variables

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimization Features
- **Image Optimization**: Next.js Image with Sanity CDN
- **Video Optimization**: Lazy loading and adaptive streaming
- **Bundle Optimization**: Code splitting and tree shaking
- **Caching**: ISR (Incremental Static Regeneration)
- **CDN**: Vercel Edge Network

## 🔧 Configuration

### Sanity CMS
- **Studio**: Accessible at `/studio`
- **Schema**: Defined in `sanity/schemas/`
- **Preview**: Real-time preview mode
- **Assets**: Image and video management

### Analytics
- **Google Analytics 4**: Page views, events, conversions
- **Custom Events**: Video plays, form submissions, downloads
- **Privacy**: GDPR compliant with consent management

### SEO Configuration
- **Metadata**: Dynamic meta tags per page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives

## 🔒 Security

### Best Practices
- **Environment Variables**: Sensitive data in env files
- **HTTPS**: Enforced in production
- **CORS**: Configured for API endpoints
- **CSP**: Content Security Policy headers
- **Input Validation**: Server-side validation for all forms

### Error Handling
- **Sentry Integration**: Real-time error tracking
- **Custom Error Pages**: 404, 500 error pages
- **Error Boundaries**: React error boundaries
- **Graceful Degradation**: Fallbacks for failed features

## 📱 Accessibility

### WCAG 2.1 Compliance
- **Level AA**: Target compliance level
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Management**: Visible focus indicators

### Testing Tools
- **axe-core**: Automated accessibility testing
- **React Testing Library**: Accessibility-first testing
- **Lighthouse**: Accessibility audits
- **Manual Testing**: Screen reader testing

## 🌐 Browser Support

### Supported Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Progressive Enhancement
- **JavaScript**: Graceful degradation
- **CSS**: Fallbacks for modern features
- **Images**: WebP with JPEG fallbacks
- **Animations**: Respect reduced motion preference

## 📖 Documentation

### Additional Resources
- [API Documentation](./docs/api.md)
- [CMS User Guide](./docs/cms-guide.md)
- [Video Upload Guide](./docs/video-guide.md)
- [SEO Checklist](./docs/seo-checklist.md)
- [Performance Tips](./docs/performance.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:
- Code of conduct
- Development process
- Pull request guidelines
- Code style requirements

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: dev@luxefilms.com
- **Documentation**: [./docs/](./docs/)
- **Issues**: GitHub Issues (for development team)

---

Built with ❤️ by the Luxe Films development team