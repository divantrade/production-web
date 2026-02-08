// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: any
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = window.gtag || function() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Event tracking
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export const trackEvent = ({
  action,
  category,
  label,
  value,
  custom_parameters = {},
}: AnalyticsEvent) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters,
  });
};

// Predefined events for the film production website
export const Analytics = {
  // Video interactions
  videoPlay: (videoTitle: string, videoId?: string) => {
    trackEvent({
      action: 'play',
      category: 'Video',
      label: videoTitle,
      custom_parameters: {
        video_id: videoId,
        video_title: videoTitle,
      },
    });
  },

  videoPause: (videoTitle: string, progress: number) => {
    trackEvent({
      action: 'pause',
      category: 'Video',
      label: videoTitle,
      value: Math.round(progress),
      custom_parameters: {
        video_progress: progress,
      },
    });
  },

  videoComplete: (videoTitle: string, duration: number) => {
    trackEvent({
      action: 'complete',
      category: 'Video',
      label: videoTitle,
      value: Math.round(duration),
      custom_parameters: {
        video_duration: duration,
      },
    });
  },

  // Form interactions
  formStart: (formName: string) => {
    trackEvent({
      action: 'form_start',
      category: 'Form',
      label: formName,
    });
  },

  formSubmit: (formName: string, success: boolean = true) => {
    trackEvent({
      action: success ? 'form_submit' : 'form_error',
      category: 'Form',
      label: formName,
      custom_parameters: {
        form_success: success,
      },
    });
  },

  formFieldFocus: (formName: string, fieldName: string) => {
    trackEvent({
      action: 'form_field_focus',
      category: 'Form',
      label: `${formName} - ${fieldName}`,
    });
  },

  // CTA interactions
  ctaClick: (ctaText: string, ctaLocation: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'CTA',
      label: ctaText,
      custom_parameters: {
        cta_location: ctaLocation,
      },
    });
  },

  // Navigation
  navigationClick: (linkText: string, destination: string) => {
    trackEvent({
      action: 'navigation_click',
      category: 'Navigation',
      label: linkText,
      custom_parameters: {
        destination: destination,
      },
    });
  },

  // Project interactions
  projectView: (projectTitle: string, projectCategory: string) => {
    trackEvent({
      action: 'project_view',
      category: 'Project',
      label: projectTitle,
      custom_parameters: {
        project_category: projectCategory,
      },
    });
  },

  projectFilter: (filterType: string, filterValue: string) => {
    trackEvent({
      action: 'project_filter',
      category: 'Project',
      label: `${filterType}: ${filterValue}`,
    });
  },

  projectSearch: (searchQuery: string, resultsCount: number) => {
    trackEvent({
      action: 'project_search',
      category: 'Search',
      label: searchQuery,
      value: resultsCount,
    });
  },

  // Service interactions
  serviceInquiry: (serviceName: string) => {
    trackEvent({
      action: 'service_inquiry',
      category: 'Service',
      label: serviceName,
    });
  },

  // Social sharing
  socialShare: (platform: string, contentType: string, contentTitle: string) => {
    trackEvent({
      action: 'share',
      category: 'Social',
      label: platform,
      custom_parameters: {
        content_type: contentType,
        content_title: contentTitle,
      },
    });
  },

  // Page scroll tracking
  scrollDepth: (depth: number, page: string) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'Engagement',
      label: page,
      value: depth,
    });
  },

  // File downloads
  fileDownload: (fileName: string, fileType: string) => {
    trackEvent({
      action: 'file_download',
      category: 'Download',
      label: fileName,
      custom_parameters: {
        file_type: fileType,
      },
    });
  },

  // Contact interactions
  contactMethodClick: (method: string) => {
    trackEvent({
      action: 'contact_method_click',
      category: 'Contact',
      label: method,
    });
  },

  // Error tracking
  error: (errorMessage: string, errorLocation: string) => {
    trackEvent({
      action: 'error',
      category: 'Error',
      label: errorMessage,
      custom_parameters: {
        error_location: errorLocation,
      },
    });
  },

  // Performance tracking
  pageLoadTime: (loadTime: number, page: string) => {
    trackEvent({
      action: 'page_load_time',
      category: 'Performance',
      label: page,
      value: Math.round(loadTime),
    });
  },
};

// Hook for tracking page views in Next.js
export const usePageTracking = () => {
  if (typeof window === 'undefined') return;

  // Track initial page load
  trackPageView(window.location.pathname);

  // Track navigation changes
  const handleRouteChange = (url: string) => {
    trackPageView(url);
  };

  return { trackPageView: handleRouteChange };
};

// Scroll depth tracking
export const useScrollTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          Analytics.scrollDepth(threshold, pageName);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};