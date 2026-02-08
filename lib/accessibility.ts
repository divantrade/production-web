// Accessibility utilities and enhancements

export const a11y = {
  // ARIA labels for common elements
  labels: {
    navigation: 'Main navigation',
    menu: 'Menu',
    search: 'Search',
    close: 'Close',
    play: 'Play video',
    pause: 'Pause video',
    mute: 'Mute audio',
    unmute: 'Unmute audio',
    previous: 'Previous item',
    next: 'Next item',
    loading: 'Loading content',
    error: 'Error occurred',
    retry: 'Retry action',
    skipToContent: 'Skip to main content',
    backToTop: 'Back to top',
    openInNewTab: 'Opens in new tab',
    downloadFile: 'Download file',
    expandSection: 'Expand section',
    collapseSection: 'Collapse section',
  },

  // ARIA roles for custom components
  roles: {
    button: 'button',
    link: 'link',
    tab: 'tab',
    tabpanel: 'tabpanel',
    tablist: 'tablist',
    dialog: 'dialog',
    alert: 'alert',
    status: 'status',
    progressbar: 'progressbar',
    slider: 'slider',
    searchbox: 'searchbox',
    combobox: 'combobox',
    listbox: 'listbox',
    option: 'option',
    grid: 'grid',
    gridcell: 'gridcell',
    article: 'article',
    banner: 'banner',
    complementary: 'complementary',
    contentinfo: 'contentinfo',
    form: 'form',
    main: 'main',
    navigation: 'navigation',
    region: 'region',
    search: 'search',
  },

  // Generate accessible video player attributes
  videoPlayer: (title: string, isPlaying: boolean, isMuted: boolean) => ({
    'aria-label': `Video player: ${title}`,
    'aria-describedby': `video-description-${title.replace(/\s+/g, '-')}`,
    role: 'region',
    'aria-live': 'polite',
    'aria-expanded': isPlaying ? 'true' : 'false',
    'aria-pressed': isPlaying ? 'true' : 'false',
    tabIndex: 0,
  }),

  // Generate accessible button attributes
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    'aria-label': label,
    'aria-pressed': pressed !== undefined ? pressed.toString() : undefined,
    'aria-expanded': expanded !== undefined ? expanded.toString() : undefined,
    role: 'button',
    tabIndex: 0,
  }),

  // Generate accessible link attributes
  link: (label: string, external: boolean = false) => ({
    'aria-label': external ? `${label} ${a11y.labels.openInNewTab}` : label,
    target: external ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
  }),

  // Generate accessible form field attributes
  formField: (id: string, label: string, required: boolean = false, error?: string) => ({
    id,
    'aria-label': label,
    'aria-required': required.toString(),
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${id}-error` : undefined,
  }),

  // Generate accessible modal attributes
  modal: (title: string, open: boolean) => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': `modal-title-${title.replace(/\s+/g, '-')}`,
    'aria-hidden': open ? 'false' : 'true',
    tabIndex: -1,
  }),

  // Generate accessible carousel attributes
  carousel: (totalItems: number, currentItem: number) => ({
    role: 'region',
    'aria-label': 'Image carousel',
    'aria-live': 'polite',
    'aria-describedby': 'carousel-instructions',
    'aria-roledescription': `carousel with ${totalItems} items`,
    'aria-label': `Item ${currentItem + 1} of ${totalItems}`,
  }),

  // Generate accessible tab attributes
  tab: (id: string, label: string, selected: boolean, controls: string) => ({
    id,
    role: 'tab',
    'aria-label': label,
    'aria-selected': selected.toString(),
    'aria-controls': controls,
    tabIndex: selected ? 0 : -1,
  }),

  // Generate accessible progress bar attributes
  progressBar: (value: number, max: number = 100, label?: string) => ({
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-label': label || `Progress: ${Math.round((value / max) * 100)}%`,
  }),
};

// Focus management utilities
export const focusManager = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Focus first element in container
  focusFirst: (container: HTMLElement) => {
    const firstFocusable = container.querySelector(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    firstFocusable?.focus();
  },

  // Restore focus to previous element
  restoreFocus: (previousElement: HTMLElement | null) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  },
};

// Keyboard navigation utilities
export const keyboardNav = {
  // Handle arrow key navigation for grids/lists
  handleArrowNavigation: (
    e: KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    itemsPerRow: number,
    onIndexChange: (newIndex: number) => void
  ) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        newIndex = currentIndex >= itemsPerRow 
          ? currentIndex - itemsPerRow 
          : currentIndex + Math.floor((totalItems - 1) / itemsPerRow) * itemsPerRow;
        if (newIndex >= totalItems) newIndex = totalItems - 1;
        break;
      case 'ArrowDown':
        newIndex = currentIndex + itemsPerRow < totalItems 
          ? currentIndex + itemsPerRow 
          : currentIndex % itemsPerRow;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = totalItems - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    onIndexChange(newIndex);
  },

  // Handle escape key for modals/dropdowns
  handleEscape: (callback: () => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  },
};

// Screen reader utilities
export const screenReader = {
  // Announce content to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Generate descriptive text for images
  generateImageAlt: (context: string, purpose: 'decorative' | 'informative' | 'functional') => {
    switch (purpose) {
      case 'decorative':
        return '';
      case 'informative':
        return `Image showing ${context}`;
      case 'functional':
        return `Clickable image: ${context}`;
      default:
        return context;
    }
  },

  // Generate descriptive text for videos
  generateVideoDescription: (title: string, duration?: string, description?: string) => {
    let desc = `Video: ${title}`;
    if (duration) desc += `, duration ${duration}`;
    if (description) desc += `. ${description}`;
    return desc;
  },
};

// Color contrast utilities
export const colorContrast = {
  // Check if color combination meets WCAG standards
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA') => {
    // This would require a full color contrast calculation
    // For now, we'll return true and implement proper checking later
    return true;
  },

  // High contrast mode detection
  detectHighContrast: () => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Reduced motion detection
  detectReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
};

// Custom hook for accessibility preferences
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal' as 'small' | 'normal' | 'large',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        fontSize: localStorage.getItem('fontSize') as any || 'normal',
      });
    };

    updatePreferences();

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    reducedMotionQuery.addEventListener('change', updatePreferences);
    highContrastQuery.addEventListener('change', updatePreferences);

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences);
      highContrastQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  const setFontSize = (size: 'small' | 'normal' | 'large') => {
    localStorage.setItem('fontSize', size);
    setPreferences(prev => ({ ...prev, fontSize: size }));
  };

  return {
    ...preferences,
    setFontSize,
  };
};