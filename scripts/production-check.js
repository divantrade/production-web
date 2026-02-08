#!/usr/bin/env node

/**
 * Production Readiness Check Script
 * Validates environment, dependencies, and configuration before deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ProductionChecker {
  constructor() {
    this.errors = []
    this.warnings = []
    this.passed = []
  }

  log(message, type = 'info') {
    const colors = {
      error: '\x1b[31m❌',
      warning: '\x1b[33m⚠️ ',
      success: '\x1b[32m✅',
      info: '\x1b[36mℹ️ ',
    }
    const reset = '\x1b[0m'
    console.log(`${colors[type]} ${message}${reset}`)
  }

  error(message) {
    this.errors.push(message)
    this.log(message, 'error')
  }

  warning(message) {
    this.warnings.push(message)
    this.log(message, 'warning')
  }

  success(message) {
    this.passed.push(message)
    this.log(message, 'success')
  }

  // Check environment variables
  checkEnvironment() {
    this.log('\n🔍 Checking Environment Variables...', 'info')
    
    const required = [
      'NEXT_PUBLIC_SANITY_PROJECT_ID',
      'NEXT_PUBLIC_SANITY_DATASET',
    ]
    
    const recommended = [
      'NEXT_PUBLIC_GA_ID',
      'SENTRY_DSN',
      'CONTACT_EMAIL',
      'NEXT_PUBLIC_YOUTUBE_API_KEY',
    ]

    // Check required variables
    required.forEach(envVar => {
      if (!process.env[envVar]) {
        this.error(`Missing required environment variable: ${envVar}`)
      } else {
        this.success(`Required environment variable set: ${envVar}`)
      }
    })

    // Check recommended variables
    recommended.forEach(envVar => {
      if (!process.env[envVar]) {
        this.warning(`Missing recommended environment variable: ${envVar}`)
      } else {
        this.success(`Recommended environment variable set: ${envVar}`)
      }
    })

    // Check NODE_ENV
    if (process.env.NODE_ENV !== 'production') {
      this.warning('NODE_ENV is not set to production')
    } else {
      this.success('NODE_ENV is set to production')
    }
  }

  // Check package.json and dependencies
  checkDependencies() {
    this.log('\n📦 Checking Dependencies...', 'info')
    
    try {
      // Check for security vulnerabilities
      execSync('npm audit --audit-level high', { stdio: 'pipe' })
      this.success('No high-severity security vulnerabilities found')
    } catch (error) {
      this.error('Security vulnerabilities found in dependencies')
    }

    // Check for outdated packages
    try {
      const outdated = execSync('npm outdated --json', { stdio: 'pipe' }).toString()
      const packages = JSON.parse(outdated || '{}')
      const outdatedCount = Object.keys(packages).length
      
      if (outdatedCount > 0) {
        this.warning(`${outdatedCount} packages are outdated`)
      } else {
        this.success('All packages are up to date')
      }
    } catch (error) {
      this.success('All packages are up to date')
    }

    // Check package.json scripts
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const requiredScripts = ['build', 'start', 'test', 'lint']
    
    requiredScripts.forEach(script => {
      if (!packageJson.scripts[script]) {
        this.error(`Missing required script: ${script}`)
      } else {
        this.success(`Required script found: ${script}`)
      }
    })
  }

  // Check build configuration
  checkBuild() {
    this.log('\n🏗️  Checking Build Configuration...', 'info')
    
    // Check if Next.js config exists
    const nextConfigExists = fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs')
    if (!nextConfigExists) {
      this.warning('No Next.js config file found')
    } else {
      this.success('Next.js config file found')
    }

    // Check TypeScript config
    if (fs.existsSync('tsconfig.json')) {
      this.success('TypeScript configuration found')
    } else {
      this.error('TypeScript configuration missing')
    }

    // Check Tailwind config
    if (fs.existsSync('tailwind.config.js')) {
      this.success('Tailwind CSS configuration found')
    } else {
      this.error('Tailwind CSS configuration missing')
    }

    // Try building the application
    try {
      this.log('Running production build...', 'info')
      execSync('npm run build', { stdio: 'pipe' })
      this.success('Production build successful')
    } catch (error) {
      this.error('Production build failed')
    }
  }

  // Check essential files
  checkFiles() {
    this.log('\n📄 Checking Essential Files...', 'info')
    
    const requiredFiles = [
      'package.json',
      'README.md',
      'CONTRIBUTING.md',
      'DEPLOYMENT.md',
      'MAINTENANCE.md',
      '.env.example',
      'vercel.json',
      'middleware.ts',
    ]

    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.success(`Required file found: ${file}`)
      } else {
        this.error(`Required file missing: ${file}`)
      }
    })

    // Check for sensitive files that shouldn't be committed
    const sensitiveFiles = ['.env.local', '.env.production', 'node_modules']
    
    sensitiveFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.warning(`Sensitive file exists (ensure it's in .gitignore): ${file}`)
      }
    })
  }

  // Check testing setup
  checkTesting() {
    this.log('\n🧪 Checking Testing Setup...', 'info')
    
    // Check test files exist
    const testDirs = ['__tests__', 'e2e']
    testDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.success(`Test directory found: ${dir}`)
      } else {
        this.warning(`Test directory missing: ${dir}`)
      }
    })

    // Run tests
    try {
      execSync('npm test -- --watchAll=false --coverage=false', { stdio: 'pipe' })
      this.success('Unit tests passing')
    } catch (error) {
      this.error('Unit tests failing')
    }

    // Check test coverage
    try {
      execSync('npm run test:coverage -- --watchAll=false', { stdio: 'pipe' })
      this.success('Test coverage generated')
    } catch (error) {
      this.warning('Test coverage could not be generated')
    }
  }

  // Check security configuration
  checkSecurity() {
    this.log('\n🔒 Checking Security Configuration...', 'info')
    
    // Check middleware exists
    if (fs.existsSync('middleware.ts')) {
      this.success('Security middleware configured')
    } else {
      this.error('Security middleware missing')
    }

    // Check for security-related packages
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const securityPackages = ['@sentry/nextjs']
    
    securityPackages.forEach(pkg => {
      if (packageJson.dependencies[pkg] || packageJson.devDependencies[pkg]) {
        this.success(`Security package installed: ${pkg}`)
      } else {
        this.warning(`Security package not found: ${pkg}`)
      }
    })

    // Check .gitignore
    if (fs.existsSync('.gitignore')) {
      const gitignore = fs.readFileSync('.gitignore', 'utf8')
      const sensitivePatterns = ['.env.local', 'node_modules', '.next']
      
      sensitivePatterns.forEach(pattern => {
        if (gitignore.includes(pattern)) {
          this.success(`Sensitive pattern in .gitignore: ${pattern}`)
        } else {
          this.error(`Missing sensitive pattern in .gitignore: ${pattern}`)
        }
      })
    } else {
      this.error('.gitignore file missing')
    }
  }

  // Check performance configuration
  checkPerformance() {
    this.log('\n⚡ Checking Performance Configuration...', 'info')
    
    // Check for performance optimization files
    const perfFiles = [
      'public/sw.js',
      'public/manifest.json',
    ]

    perfFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.success(`Performance file found: ${file}`)
      } else {
        this.warning(`Performance file missing: ${file}`)
      }
    })

    // Check for image optimization
    const hasImages = fs.existsSync('public/images') || fs.existsSync('public/assets')
    if (hasImages) {
      this.success('Image assets directory found')
    } else {
      this.warning('No image assets directory found')
    }
  }

  // Generate report
  generateReport() {
    this.log('\n📊 Production Readiness Report', 'info')
    this.log('='.repeat(50), 'info')
    
    this.log(`✅ Passed: ${this.passed.length}`, 'success')
    this.log(`⚠️  Warnings: ${this.warnings.length}`, 'warning')
    this.log(`❌ Errors: ${this.errors.length}`, 'error')
    
    if (this.errors.length > 0) {
      this.log('\n❌ ERRORS (Must fix before deployment):', 'error')
      this.errors.forEach(error => this.log(`  - ${error}`, 'error'))
    }
    
    if (this.warnings.length > 0) {
      this.log('\n⚠️  WARNINGS (Recommended to fix):', 'warning')
      this.warnings.forEach(warning => this.log(`  - ${warning}`, 'warning'))
    }
    
    const isReady = this.errors.length === 0
    
    this.log('\n' + '='.repeat(50), 'info')
    if (isReady) {
      this.log('🎉 READY FOR PRODUCTION DEPLOYMENT!', 'success')
    } else {
      this.log('🚫 NOT READY - Please fix errors before deploying', 'error')
    }
    
    return isReady
  }

  // Run all checks
  async runAll() {
    this.log('🚀 Starting Production Readiness Check...', 'info')
    
    this.checkEnvironment()
    this.checkDependencies()
    this.checkBuild()
    this.checkFiles()
    this.checkTesting()
    this.checkSecurity()
    this.checkPerformance()
    
    const isReady = this.generateReport()
    
    // Exit with appropriate code
    process.exit(isReady ? 0 : 1)
  }
}

// Run the checker
const checker = new ProductionChecker()
checker.runAll().catch(error => {
  console.error('Production check failed:', error)
  process.exit(1)
})