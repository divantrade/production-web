import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import { useTheme, getSystemTheme, applyTheme } from '@/lib/theme'

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

// Mock document
Object.defineProperty(document, 'documentElement', {
  value: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    },
  },
  writable: true,
})

describe('Theme Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Reset localStorage mock
    mockLocalStorage.getItem.mockReturnValue(null)
    
    // Reset document mock
    document.documentElement.classList.contains = jest.fn().mockReturnValue(false)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getSystemTheme', () => {
    it('should return dark when system prefers dark', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      const theme = getSystemTheme()
      expect(theme).toBe('dark')
    })

    it('should return light when system prefers light', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      const theme = getSystemTheme()
      expect(theme).toBe('light')
    })
  })

  describe('applyTheme', () => {
    it('should add dark class for dark theme', () => {
      applyTheme('dark')
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark')
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light')
    })

    it('should add light class for light theme', () => {
      applyTheme('light')
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('light')
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark')
    })

    it('should apply system theme when theme is system', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      applyTheme('system')
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark')
    })
  })

  describe('useTheme Hook', () => {
    it('should initialize with system theme when no stored theme', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useTheme())
      
      expect(result.current.theme).toBe('system')
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme')
    })

    it('should initialize with stored theme', () => {
      mockLocalStorage.getItem.mockReturnValue('dark')
      
      const { result } = renderHook(() => useTheme())
      
      expect(result.current.theme).toBe('dark')
    })

    it('should update theme and save to localStorage', () => {
      const { result } = renderHook(() => useTheme())
      
      act(() => {
        result.current.setTheme('light')
      })
      
      expect(result.current.theme).toBe('light')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
    })

    it('should toggle between light and dark themes', () => {
      mockLocalStorage.getItem.mockReturnValue('light')
      
      const { result } = renderHook(() => useTheme())
      
      expect(result.current.theme).toBe('light')
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe('dark')
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe('light')
    })

    it('should handle system theme in toggle', () => {
      mockLocalStorage.getItem.mockReturnValue('system')
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false, // System prefers light
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
      
      const { result } = renderHook(() => useTheme())
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).toBe('dark')
    })

    it('should return current effective theme', () => {
      mockLocalStorage.getItem.mockReturnValue('system')
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: true, // System prefers dark
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
      
      const { result } = renderHook(() => useTheme())
      
      expect(result.current.resolvedTheme).toBe('dark')
    })
  })
})