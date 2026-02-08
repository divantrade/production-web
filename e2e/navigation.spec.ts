import { test, expect } from '@playwright/test'

test.describe('Navigation and User Flows', () => {
  test('should navigate through main pages successfully', async ({ page }) => {
    // Start from homepage
    await page.goto('/')
    await expect(page).toHaveTitle(/Luxe Films/i)

    // Navigate to About page
    await page.click('nav a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText(/About/i)

    // Navigate to Services page
    await page.click('nav a[href="/services"]')
    await expect(page).toHaveURL('/services')
    await expect(page.locator('h1')).toContainText(/Services/i)

    // Navigate to Work page
    await page.click('nav a[href="/work"]')
    await expect(page).toHaveURL('/work')
    await expect(page.locator('h1')).toContainText(/Work|Portfolio/i)

    // Navigate to Contact page
    await page.click('nav a[href="/contact"]')
    await expect(page).toHaveURL('/contact')
    await expect(page.locator('h1')).toContainText(/Contact/i)
  })

  test('should handle search functionality', async ({ page }) => {
    await page.goto('/')
    
    // Test global search (Command+K)
    await page.keyboard.press('Meta+k')
    
    // Wait for search modal to appear
    const searchModal = page.locator('[role="dialog"], [data-testid="search-modal"]')
    if (await searchModal.count() > 0) {
      await expect(searchModal.first()).toBeVisible()
      
      // Test search input
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first()
      await searchInput.fill('documentary')
      
      // Check if search results appear
      await page.waitForTimeout(500) // Wait for debounce
      const searchResults = page.locator('[data-testid="search-results"], .search-results')
      if (await searchResults.count() > 0) {
        await expect(searchResults.first()).toBeVisible()
      }
      
      // Close search modal
      await page.keyboard.press('Escape')
      await expect(searchModal.first()).not.toBeVisible()
    }
  })

  test('should handle theme switching', async ({ page }) => {
    await page.goto('/')
    
    // Find theme toggle button
    const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme" i]')
    if (await themeToggle.count() > 0) {
      const toggle = themeToggle.first()
      await expect(toggle).toBeVisible()
      
      // Get initial theme state
      const initialClass = await page.locator('html').getAttribute('class')
      
      // Click theme toggle
      await toggle.click()
      
      // Wait for theme change
      await page.waitForTimeout(500)
      
      // Check if theme changed
      const newClass = await page.locator('html').getAttribute('class')
      expect(newClass).not.toBe(initialClass)
    }
  })

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Find mobile menu toggle
    const mobileMenuToggle = page.locator('[aria-label*="menu" i], [data-testid="mobile-menu-toggle"], button[aria-expanded]')
    if (await mobileMenuToggle.count() > 0) {
      const toggle = mobileMenuToggle.first()
      await expect(toggle).toBeVisible()
      
      // Open mobile menu
      await toggle.click()
      
      // Check if menu is expanded
      const expanded = await toggle.getAttribute('aria-expanded')
      expect(expanded).toBe('true')
      
      // Check if navigation links are visible
      const navLinks = page.locator('nav a, [role="navigation"] a')
      if (await navLinks.count() > 0) {
        await expect(navLinks.first()).toBeVisible()
      }
      
      // Test navigation in mobile menu
      const aboutLink = page.locator('a[href="/about"]').first()
      if (await aboutLink.isVisible()) {
        await aboutLink.click()
        await expect(page).toHaveURL('/about')
      }
    }
  })

  test('should handle breadcrumb navigation', async ({ page }) => {
    // Navigate to a nested page
    await page.goto('/work')
    
    // Check if breadcrumbs exist
    const breadcrumbs = page.locator('[aria-label="breadcrumb"], .breadcrumb, nav[aria-label*="breadcrumb" i]')
    if (await breadcrumbs.count() > 0) {
      await expect(breadcrumbs.first()).toBeVisible()
      
      // Test breadcrumb home link
      const homeLink = breadcrumbs.locator('a[href="/"], a').first()
      if (await homeLink.count() > 0) {
        await homeLink.click()
        await expect(page).toHaveURL('/')
      }
    }
  })

  test('should handle 404 page', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page')
    
    // Check for 404 content
    const notFoundElement = page.locator('h1, h2').filter({ hasText: /404|not found|page not found/i })
    if (await notFoundElement.count() > 0) {
      await expect(notFoundElement.first()).toBeVisible()
    }
    
    // Check for back to home link
    const homeLink = page.locator('a[href="/"], button').filter({ hasText: /home|back/i })
    if (await homeLink.count() > 0) {
      await homeLink.first().click()
      await expect(page).toHaveURL('/')
    }
  })
})