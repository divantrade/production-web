import { renderHook, act } from '@testing-library/react'
import {
  pageTransition,
  fadeInUp,
  staggerContainer,
  animationPresets,
  useCountAnimation,
  useParallax,
  useMouseFollow,
  useScrollReveal,
  smoothScrollTo,
} from '@/lib/animations'

describe('Animation Utilities', () => {
  describe('variants', () => {
    it('pageTransition defines hidden, visible and exit states', () => {
      expect(pageTransition).toHaveProperty('hidden')
      expect(pageTransition).toHaveProperty('visible')
      expect(pageTransition).toHaveProperty('exit')
    })

    it('fadeInUp starts hidden and offset', () => {
      expect(fadeInUp.hidden).toMatchObject({ opacity: 0 })
      expect(fadeInUp.visible).toMatchObject({ opacity: 1, y: 0 })
    })

    it('staggerContainer defines hidden and visible states', () => {
      expect(staggerContainer).toHaveProperty('hidden')
      expect(staggerContainer).toHaveProperty('visible')
    })

    it('exports animation presets', () => {
      expect(Object.keys(animationPresets).length).toBeGreaterThan(0)
    })
  })

  describe('useCountAnimation', () => {
    it('starts at 0 and does not animate until visible', () => {
      const { result } = renderHook(() => useCountAnimation(100))
      expect(result.current.count).toBe(0)
      expect(typeof result.current.setIsVisible).toBe('function')
    })

    it('counts up to the end value once visible', () => {
      let now = 0
      const callbacks: FrameRequestCallback[] = []
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
        callbacks.push(cb)
        return callbacks.length
      })
      jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

      const { result } = renderHook(() => useCountAnimation(100, 1))
      act(() => result.current.setIsVisible(true))

      // Drive frames until the 1s animation completes
      while (callbacks.length) {
        const cb = callbacks.shift()!
        act(() => cb(now))
        now += 250
      }
      expect(result.current.count).toBe(100)
      jest.restoreAllMocks()
    })
  })

  describe('useParallax', () => {
    it('returns the scroll offset multiplied by speed', () => {
      const { result } = renderHook(() => useParallax(0.5))
      expect(result.current).toBe(0)

      act(() => {
        Object.defineProperty(window, 'pageYOffset', { value: 200, configurable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      expect(result.current).toBe(100)
    })
  })

  describe('useMouseFollow', () => {
    it('tracks mouse position relative to the viewport centre', () => {
      const { result } = renderHook(() => useMouseFollow(0.1))
      expect(result.current).toEqual({ x: 0, y: 0 })

      act(() => {
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: window.innerWidth / 2 + 100,
            clientY: window.innerHeight / 2 - 50,
          })
        )
      })
      expect(result.current.x).toBeCloseTo(10)
      expect(result.current.y).toBeCloseTo(-5)
    })
  })

  describe('useScrollReveal', () => {
    it('returns a ref and starts not visible', () => {
      const { result } = renderHook(() => useScrollReveal())
      expect(result.current.ref).toBeDefined()
      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('smoothScrollTo', () => {
    it('scrolls to the element offset', () => {
      const el = document.createElement('div')
      el.id = 'target'
      Object.defineProperty(el, 'offsetTop', { value: 500 })
      document.body.appendChild(el)
      window.scrollTo = jest.fn()

      smoothScrollTo('target', 100)
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'smooth' })
      el.remove()
    })

    it('does nothing when the element is missing', () => {
      window.scrollTo = jest.fn()
      smoothScrollTo('missing')
      expect(window.scrollTo).not.toHaveBeenCalled()
    })
  })
})
