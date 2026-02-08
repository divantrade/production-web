# Contributing to Luxe Films Website

Thank you for your interest in contributing to the Luxe Films website! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Documentation](#documentation)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or political arguments
- Publishing private information without permission
- Any behavior that would be inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ installed
- Git configured with your name and email
- A code editor with TypeScript support (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/production-web.git
   cd production-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your test values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Run tests to ensure everything works**
   ```bash
   npm run test
   npm run test:e2e
   ```

### Branch Naming Convention

Create descriptive branch names using this format:
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring
- `test/description` - for adding tests

Examples:
- `feature/dark-mode-toggle`
- `fix/video-player-autoplay`
- `docs/api-documentation`

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the established patterns in the codebase
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Check TypeScript types
npm run type-check

# Run linting
npm run lint

# Check formatting
npm run format:check
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
git add .
git commit -m "feat: add dark mode toggle functionality"
```

Commit message types:
- `feat:` - new features
- `fix:` - bug fixes
- `docs:` - documentation changes
- `style:` - formatting changes
- `refactor:` - code refactoring
- `test:` - adding tests
- `chore:` - maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## 💻 Code Style Guidelines

### TypeScript

- **Use TypeScript for all new code**
- **Define proper interfaces and types**
- **Avoid `any` type - use specific types**
- **Use type assertions sparingly**

```typescript
// ✅ Good
interface VideoProps {
  title: string
  duration: number
  thumbnail: string
  isPlaying?: boolean
}

// ❌ Bad
interface VideoProps {
  title: any
  duration: any
  thumbnail: any
  isPlaying: any
}
```

### React Components

- **Use functional components with hooks**
- **Implement proper prop typing**
- **Use composition over inheritance**
- **Keep components focused and single-purpose**

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### CSS and Styling

- **Use Tailwind CSS classes**
- **Follow mobile-first responsive design**
- **Use design tokens from theme**
- **Support dark mode with `dark:` prefix**

```typescript
// ✅ Good
<div className="
  flex flex-col 
  px-4 py-6 
  bg-white dark:bg-gray-900 
  rounded-lg shadow-md 
  md:px-6 md:py-8
">

// ❌ Bad - avoid custom CSS
<div style={{ display: 'flex', padding: '24px' }}>
```

### File Organization

- **Use descriptive file names**
- **Group related components**
- **Follow the established folder structure**
- **Export components from index files**

```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts
├── video/
│   ├── VideoPlayer/
│   └── VideoModal/
└── index.ts
```

## 🧩 Component Guidelines

### Component Structure

Follow this structure for new components:

```typescript
'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Types and interfaces
interface ComponentProps {
  // Define props here
}

// Component implementation
export const Component: React.FC<ComponentProps> = ({
  // Destructure props
}) => {
  // Hooks
  // Event handlers
  // Render logic
  
  return (
    // JSX
  )
}

// Default export
export default Component
```

### Accessibility Requirements

- **Include proper ARIA labels**
- **Support keyboard navigation**
- **Provide focus indicators**
- **Use semantic HTML elements**

```typescript
// ✅ Good
<button
  aria-label="Play video"
  aria-describedby="video-description"
  onKeyDown={handleKeyDown}
  className="focus:ring-2 focus:ring-primary"
>
  <PlayIcon aria-hidden="true" />
  Play
</button>

// ❌ Bad
<div onClick={handleClick}>
  <PlayIcon />
  Play
</div>
```

### Performance Considerations

- **Use React.memo for expensive components**
- **Implement lazy loading for heavy components**
- **Optimize images and videos**
- **Avoid unnecessary re-renders**

```typescript
// ✅ Good - Memoized component
export const VideoCard = React.memo<VideoCardProps>(({ video }) => {
  // Component logic
})

// ✅ Good - Lazy loading
const VideoModal = React.lazy(() => import('./VideoModal'))
```

## 🧪 Testing Requirements

### Unit Tests

- **Test component behavior, not implementation**
- **Use React Testing Library**
- **Test accessibility features**
- **Mock external dependencies**

```typescript
// ✅ Good test
describe('Button Component', () => {
  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be accessible', () => {
    render(<Button>Accessible button</Button>)
    
    const button = screen.getByRole('button', { name: /accessible button/i })
    expect(button).toBeInTheDocument()
  })
})
```

### E2E Tests

- **Test complete user workflows**
- **Include responsive design testing**
- **Test form validation and submission**
- **Verify page navigation**

```typescript
// ✅ Good E2E test
test('should complete contact form submission', async ({ page }) => {
  await page.goto('/contact')
  
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('textarea[name="message"]', 'Test message')
  
  await page.click('button[type="submit"]')
  
  await expect(page.locator('.success-message')).toBeVisible()
})
```

### Coverage Requirements

- **Minimum 70% code coverage**
- **All new features must include tests**
- **Critical paths must have 90%+ coverage**

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   npm run test:all
   ```

2. **Fix any linting issues**
   ```bash
   npm run lint
   npm run format
   ```

3. **Update documentation if needed**

4. **Add or update tests for your changes**

### Pull Request Template

Use this template for your PR description:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass (tests, linting, type checking)
2. **Code review** by at least one maintainer
3. **Approval** from project maintainer
4. **Merge** using squash and merge strategy

### Review Criteria

Reviewers will check for:
- Code quality and adherence to guidelines
- Test coverage and quality
- Performance implications
- Accessibility compliance
- Documentation completeness
- Security considerations

## 🐛 Issue Reporting

### Bug Reports

Include the following information:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 91]
- Device: [e.g., iPhone 12]

## Screenshots
Add screenshots if applicable

## Additional Context
Any other relevant information
```

### Feature Requests

```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this be implemented?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Any other relevant information
```

## 📖 Documentation

### Code Documentation

- **Add JSDoc comments for complex functions**
- **Document component props and behavior**
- **Include usage examples**

```typescript
/**
 * VideoPlayer component for playing various video formats
 * 
 * @param src - Video source URL
 * @param poster - Poster image URL
 * @param autoplay - Whether to autoplay the video
 * @param controls - Whether to show video controls
 * 
 * @example
 * ```tsx
 * <VideoPlayer 
 *   src="https://example.com/video.mp4"
 *   poster="https://example.com/poster.jpg"
 *   autoplay={false}
 *   controls={true}
 * />
 * ```
 */
```

### README Updates

When adding new features:
- Update feature list in README
- Add configuration instructions if needed
- Include usage examples
- Update environment variable documentation

## 🚨 Security Guidelines

### Best Practices

- **Never commit sensitive data** (API keys, passwords)
- **Validate all user inputs** on both client and server
- **Use HTTPS** for all external requests
- **Sanitize user-generated content**
- **Follow OWASP guidelines**

### Environment Variables

- **Use `.env.local` for development**
- **Never commit `.env` files to git**
- **Document all required environment variables**
- **Use different values for different environments**

## 🎯 Performance Guidelines

### Code Optimization

- **Use React.memo() for expensive components**
- **Implement code splitting for large features**
- **Optimize images and use Next.js Image component**
- **Minimize bundle size**

### Best Practices

- **Lazy load non-critical components**
- **Use appropriate caching strategies**
- **Optimize for Core Web Vitals**
- **Test performance on various devices**

## 🙋‍♀️ Getting Help

### Resources

- **Project Documentation**: [./docs/](./docs/)
- **React Documentation**: https://react.dev
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Communication

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Code Reviews**: For getting feedback on your code

## 📝 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Luxe Films! 🎬✨