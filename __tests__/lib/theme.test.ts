import { getThemeColors, prefersDarkMode, applyThemeTransition } from '@/lib/theme'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

describe('Theme Utilities', () => {
  describe('prefersDarkMode', () => {
    it('returns true when the system prefers dark', () => {
      mockMatchMedia(true)
      expect(prefersDarkMode()).toBe(true)
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })

    it('returns false when the system prefers light', () => {
      mockMatchMedia(false)
      expect(prefersDarkMode()).toBe(false)
    })
  })

  describe('getThemeColors', () => {
    it('returns dark palette for dark theme', () => {
      const colors = getThemeColors('dark')
      expect(colors.background).toBe('bg-gray-900')
      expect(colors.text).toBe('text-white')
    })

    it('returns light palette for light theme', () => {
      const colors = getThemeColors('light')
      expect(colors.background).toBe('bg-white')
      expect(colors.text).toBe('text-gray-900')
    })
  })

  describe('applyThemeTransition', () => {
    it('adds a temporary transition style and removes it', () => {
      jest.useFakeTimers()
      const initialCount = document.head.querySelectorAll('style').length

      applyThemeTransition()
      expect(document.head.querySelectorAll('style')).toHaveLength(initialCount + 1)

      jest.advanceTimersByTime(300)
      expect(document.head.querySelectorAll('style')).toHaveLength(initialCount)
      jest.useRealTimers()
    })
  })
})
