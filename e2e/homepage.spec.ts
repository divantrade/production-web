import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the homepage correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Luxe Films/i)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText(/Stories that Move/i)
    
    // Check navigation menu
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('nav a[href="/about"]')).toBeVisible()
    await expect(page.locator('nav a[href="/work"]')).toBeVisible()
    await expect(page.locator('nav a[href="/services"]')).toBeVisible()
    await expect(page.locator('nav a[href="/contact"]')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Test About link
    await page.click('nav a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await page.goBack()

    // Test Work link
    await page.click('nav a[href="/work"]')
    await expect(page).toHaveURL('/work')
    await page.goBack()

    // Test Services link
    await page.click('nav a[href="/services"]')
    await expect(page).toHaveURL('/services')
    await page.goBack()

    // Test Contact link
    await page.click('nav a[href="/contact"]')
    await expect(page).toHaveURL('/contact')
  })

  test('should display hero section with CTA button', async ({ page }) => {
    // Check hero section
    const heroSection = page.locator('[data-testid="hero-section"]').first()
    await expect(heroSection).toBeVisible()
    
    // Check CTA button
    const ctaButton = page.locator('button, a').filter({ hasText: /View Our Work|Get Started|Contact Us/i }).first()
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toBeEnabled()
  })

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('nav')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('body')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()
    
    // Check if mobile menu toggle exists in mobile view
    const mobileMenuToggle = page.locator('[aria-label*="menu"], [data-testid="mobile-menu-toggle"]')
    if (await mobileMenuToggle.count() > 0) {
      await expect(mobileMenuToggle.first()).toBeVisible()
    }
  })

  test('should load and display images', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle')
    
    // Check if hero image/video is present
    const heroMedia = page.locator('img, video').first()
    if (await heroMedia.count() > 0) {
      await expect(heroMedia).toBeVisible()
    }
  })

  test('should have proper SEO elements', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content')
    }
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    if (await ogTitle.count() > 0) {
      await expect(ogTitle).toHaveAttribute('content')
    }
    
    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    if (await structuredData.count() > 0) {
      const jsonContent = await structuredData.first().textContent()
      expect(jsonContent).toBeTruthy()
      expect(() => JSON.parse(jsonContent!)).not.toThrow()
    }
  })
})