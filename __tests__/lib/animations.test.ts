import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import { 
  pageTransition, 
  staggerContainer, 
  fadeInUp, 
  scaleIn, 
  useScrollReveal,
  useParallax,
  useCountAnimation,
  useMagneticButton
} from '@/lib/animations'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  useInView: jest.fn(() => [jest.fn(), true]),
  useMotionValue: jest.fn(() => ({
    get: jest.fn(() => 0),
    set: jest.fn(),
  })),
  useTransform: jest.fn((motionValue, inputRange, outputRange) => ({
    get: jest.fn(() => outputRange[0]),
  })),
  useSpring: jest.fn((value) => value),
}))

describe('Animation Utilities', () => {
  describe('Animation Variants', () => {
    it('should return correct pageTransition variant', () => {
      const transition = pageTransition
      expect(transition.initial).toEqual({ opacity: 0, y: 20 })
      expect(transition.animate).toEqual({ opacity: 1, y: 0 })
      expect(transition.exit).toEqual({ opacity: 0, y: -20 })
    })

    it('should return correct staggerContainer variant', () => {
      const container = staggerContainer(0.1, 0.2)
      expect(container.animate.transition.staggerChildren).toBe(0.1)
      expect(container.animate.transition.delayChildren).toBe(0.2)
    })

    it('should return correct fadeInUp variant', () => {
      const fadeUp = fadeInUp(0.5)
      expect(fadeUp.initial).toEqual({ opacity: 0, y: 60 })
      expect(fadeUp.animate.transition.duration).toBe(0.5)
    })

    it('should return correct scaleIn variant', () => {
      const scale = scaleIn(0.3, 'easeOut')
      expect(scale.initial).toEqual({ opacity: 0, scale: 0.8 })
      expect(scale.animate.transition.duration).toBe(0.3)
      expect(scale.animate.transition.ease).toBe('easeOut')
    })
  })

  describe('useScrollReveal Hook', () => {
    it('should return motion props for scroll reveal', () => {
      const { result } = renderHook(() => useScrollReveal())
      
      expect(result.current).toHaveProperty('initial')
      expect(result.current).toHaveProperty('whileInView')
      expect(result.current).toHaveProperty('viewport')
      expect(result.current.viewport).toEqual({ once: true, amount: 0.3 })
    })

    it('should accept custom variant', () => {
      const customVariant = { initial: { opacity: 0 }, animate: { opacity: 1 } }
      const { result } = renderHook(() => useScrollReveal(customVariant))
      
      expect(result.current.initial).toEqual({ opacity: 0 })
      expect(result.current.whileInView).toEqual({ opacity: 1 })
    })
  })

  describe('useParallax Hook', () => {
    it('should return parallax motion value', () => {
      const { result } = renderHook(() => useParallax(50))
      
      expect(result.current).toBeDefined()
      expect(typeof result.current.get).toBe('function')
    })
  })

  describe('useCountAnimation Hook', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should animate count from 0 to target', () => {
      const { result } = renderHook(() => useCountAnimation(100, 1))
      
      expect(result.current.count).toBe(0)
      expect(result.current.isVisible).toBe(false)
      
      act(() => {
        result.current.setIsVisible(true)
      })
      
      expect(result.current.isVisible).toBe(true)
      
      // Fast forward time
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      
      expect(result.current.count).toBeGreaterThan(0)
    })

    it('should reset count when visibility changes', () => {
      const { result } = renderHook(() => useCountAnimation(50))
      
      act(() => {
        result.current.setIsVisible(true)
        jest.advanceTimersByTime(500)
      })
      
      act(() => {
        result.current.setIsVisible(false)
      })
      
      expect(result.current.count).toBe(0)
    })
  })

  describe('useMagneticButton Hook', () => {
    it('should return mouse event handlers', () => {
      const { result } = renderHook(() => useMagneticButton(10))
      
      expect(result.current).toHaveProperty('onMouseMove')
      expect(result.current).toHaveProperty('onMouseLeave')
      expect(typeof result.current.onMouseMove).toBe('function')
      expect(typeof result.current.onMouseLeave).toBe('function')
    })

    it('should handle mouse events without crashing', () => {
      const { result } = renderHook(() => useMagneticButton())
      
      const mockEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 50 })
        },
        clientX: 50,
        clientY: 25
      } as any

      expect(() => {
        result.current.onMouseMove(mockEvent)
        result.current.onMouseLeave()
      }).not.toThrow()
    })
  })
})