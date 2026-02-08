# API Documentation

This document provides comprehensive information about the Luxe Films website API endpoints and integrations.

## 📋 Table of Contents

- [Internal API Routes](#internal-api-routes)
- [YouTube API Integration](#youtube-api-integration)
- [Newsletter API](#newsletter-api)
- [Contact Form API](#contact-form-api)
- [Search API](#search-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## 🔗 Internal API Routes

### Newsletter Subscription

**Endpoint:** `POST /api/newsletter/subscribe`

**Description:** Subscribe a user to the newsletter

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "consent": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

### Contact Form

**Endpoint:** `POST /api/contact`

**Description:** Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a video project.",
  "phone": "+1234567890",
  "company": "Example Corp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Search

**Endpoint:** `GET /api/search?q={query}&type={type}&limit={limit}`

**Description:** Search through website content

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): Content type filter (projects, pages, videos)
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "id": "1",
      "title": "Documentary Project",
      "type": "project",
      "url": "/work/documentary-project",
      "excerpt": "Brief description..."
    }
  ],
  "totalCount": 15
}
```

## 📺 YouTube API Integration

### Configuration

**Environment Variables:**
```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id
```

### Used Endpoints

#### Get Channel Videos
```javascript
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/search?` +
  `part=snippet&channelId=${channelId}&` +
  `maxResults=50&order=date&type=video&` +
  `key=${apiKey}`
)
```

#### Get Playlist Items
```javascript
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?` +
  `part=snippet&playlistId=${playlistId}&` +
  `maxResults=50&key=${apiKey}`
)
```

#### Get Video Details
```javascript
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?` +
  `part=snippet,statistics,contentDetails&` +
  `id=${videoId}&key=${apiKey}`
)
```

### Error Handling

```typescript
try {
  const videos = await fetchYouTubeVideos()
  return videos
} catch (error) {
  console.error('YouTube API Error:', error)
  // Fallback to manual video configuration
  return fallbackVideos
}
```

## 💌 Newsletter API

### Mailchimp Integration

**Setup:**
```env
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

**Implementation:**
```typescript
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us1' // Extract from API key
})

const response = await mailchimp.lists.addListMember(
  process.env.MAILCHIMP_AUDIENCE_ID!,
  {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }
)
```

### ConvertKit Integration

**Setup:**
```env
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id
```

**Implementation:**
```typescript
const response = await fetch(
  `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email,
      first_name: firstName
    })
  }
)
```

## 📞 Contact Form API

### Email Service Integration

**Nodemailer Setup:**
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
```

**Send Email:**
```typescript
await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: process.env.CONTACT_EMAIL,
  subject: `New Contact Form: ${subject}`,
  html: emailTemplate
})
```

### Validation

```typescript
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  company: z.string().optional()
})
```

## 🔍 Search API

### Implementation

```typescript
export async function searchContent(query: string, type?: string) {
  const searchResults = []
  
  // Search through Sanity content
  if (!type || type === 'projects') {
    const projects = await sanityClient.fetch(
      `*[_type == "project" && title match $query]{
        _id,
        title,
        slug,
        excerpt
      }`,
      { query: `${query}*` }
    )
    searchResults.push(...projects.map(p => ({ ...p, type: 'project' })))
  }
  
  // Search through static pages
  if (!type || type === 'pages') {
    const pages = staticPages.filter(page => 
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.content.toLowerCase().includes(query.toLowerCase())
    )
    searchResults.push(...pages.map(p => ({ ...p, type: 'page' })))
  }
  
  return searchResults
}
```

## 🚨 Error Handling

### Standard Error Response

```typescript
interface APIError {
  success: false
  error: string
  code?: string
  details?: any
}
```

### Error Codes

- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal server error
- `EXTERNAL_API_ERROR`: Third-party API error

### Error Handler Middleware

```typescript
export function withErrorHandler(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error('API Error:', error)
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          error: error.message,
          code: 'VALIDATION_ERROR'
        })
      }
      
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        code: 'SERVER_ERROR'
      })
    }
  }
}
```

## ⚡ Rate Limiting

### Implementation

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true
})

export async function withRateLimit(req: NextApiRequest) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const { success } = await ratelimit.limit(ip as string)
  
  if (!success) {
    throw new Error('Rate limit exceeded')
  }
}
```

### Rate Limits

- **Contact Form**: 5 requests per 10 minutes per IP
- **Newsletter**: 3 requests per 5 minutes per IP
- **Search**: 60 requests per minute per IP
- **General API**: 100 requests per minute per IP

## 🔒 Security

### API Key Security

- Use environment variables for all API keys
- Rotate keys regularly
- Implement API key validation
- Monitor for suspicious usage

### Input Validation

```typescript
// Always validate input data
const validatedData = contactSchema.parse(req.body)

// Sanitize HTML content
import DOMPurify from 'isomorphic-dompurify'
const cleanMessage = DOMPurify.sanitize(message)
```

### CORS Configuration

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://luxefilms.com')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  // Handle request
}
```

## 📊 Monitoring

### Logging

```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'api.log' })
  ]
})

// Log API requests
logger.info('API Request', {
  method: req.method,
  url: req.url,
  ip: req.headers['x-forwarded-for'],
  userAgent: req.headers['user-agent']
})
```

### Analytics

```typescript
// Track API usage
import { analytics } from '@/lib/analytics'

analytics.track('API Request', {
  endpoint: req.url,
  method: req.method,
  success: true,
  responseTime: Date.now() - startTime
})
```

---

*This documentation is regularly updated. Last updated: [Current Date]*