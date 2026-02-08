import { z } from 'zod'

// Environment validation schema
const envSchema = z.object({
  // Core settings
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  
  // YouTube API (optional but recommended)
  NEXT_PUBLIC_YOUTUBE_API_KEY: z.string().optional(),
  NEXT_PUBLIC_YOUTUBE_CHANNEL_ID: z.string().optional(),
  
  // Sanity CMS (required)
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Sanity project ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().optional(),
  
  // Analytics (recommended)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // Email services (optional)
  MAILCHIMP_API_KEY: z.string().optional(),
  MAILCHIMP_AUDIENCE_ID: z.string().optional(),
  CONVERTKIT_API_KEY: z.string().optional(),
  CONVERTKIT_FORM_ID: z.string().optional(),
  
  // SMTP (for contact form)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  
  // Error tracking (recommended)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Social media APIs (optional)
  INSTAGRAM_ACCESS_TOKEN: z.string().optional(),
  TWITTER_BEARER_TOKEN: z.string().optional(),
  LINKEDIN_ACCESS_TOKEN: z.string().optional(),
  
  // Security
  NEXTAUTH_SECRET: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

class EnvironmentValidationError extends Error {
  constructor(message: string, public errors: z.ZodError) {
    super(message)
    this.name = 'EnvironmentValidationError'
  }
}

export function validateEnvironment(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Environment validation failed:\n${error.issues
        .map(issue => `  - ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')}`
      
      throw new EnvironmentValidationError(errorMessage, error)
    }
    throw error
  }
}

export function getRequiredEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }
  return value
}

export function getOptionalEnvVar(name: string, defaultValue?: string): string | undefined {
  return process.env[name] || defaultValue
}

// Validate critical environment variables for production
export function validateProductionEnvironment(): void {
  const requiredForProduction = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
  ]
  
  const recommended = [
    'NEXT_PUBLIC_GA_ID',
    'SENTRY_DSN',
    'CONTACT_EMAIL',
  ]
  
  const missing = requiredForProduction.filter(envVar => !process.env[envVar])
  const missingRecommended = recommended.filter(envVar => !process.env[envVar])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables for production: ${missing.join(', ')}`)
  }
  
  if (missingRecommended.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(`⚠️  Missing recommended environment variables: ${missingRecommended.join(', ')}`)
  }
  
  console.log('✅ Environment validation passed')
}

// Check if all integrations are properly configured
export function checkIntegrations(): void {
  const integrations = {
    'YouTube API': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    'Google Analytics': process.env.NEXT_PUBLIC_GA_ID,
    'Sentry Error Tracking': process.env.SENTRY_DSN,
    'Email Service': process.env.MAILCHIMP_API_KEY || process.env.CONVERTKIT_API_KEY,
    'SMTP for Contact': process.env.SMTP_HOST && process.env.SMTP_USER,
  }
  
  console.log('\n📊 Integration Status:')
  Object.entries(integrations).forEach(([name, configured]) => {
    const status = configured ? '✅' : '❌'
    console.log(`  ${status} ${name}`)
  })
  console.log('')
}

// Runtime environment info
export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV,
    nextVersion: process.env.npm_package_dependencies_next,
    buildTime: new Date().toISOString(),
    deployment: {
      vercel: !!process.env.VERCEL,
      netlify: !!process.env.NETLIFY,
      platform: process.env.VERCEL ? 'Vercel' : process.env.NETLIFY ? 'Netlify' : 'Unknown',
    },
    features: {
      analytics: !!process.env.NEXT_PUBLIC_GA_ID,
      errorTracking: !!process.env.SENTRY_DSN,
      cms: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      email: !!(process.env.MAILCHIMP_API_KEY || process.env.CONVERTKIT_API_KEY),
      youtube: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    }
  }
}