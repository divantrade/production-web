// PWA utilities and service worker registration
import { useState, useEffect } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// Service worker registration
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is available, prompt user to refresh
            showUpdateAvailableNotification();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Unregister service worker (for development/testing)
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const unregistered = await registration.unregister();
      console.log('Service Worker unregistered:', unregistered);
      return unregistered;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

// Update service worker
export const updateServiceWorker = (): void => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready.then((registration) => {
    registration.update();
  });
};

// Skip waiting and activate new service worker
export const activateNewServiceWorker = (): void => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};

// PWA installation prompt
export class PWAInstaller {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private isInstallable = false;
  private isInstalled = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof window === 'undefined') return;

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
      this.dispatchInstallableEvent();
    });

    // Listen for the app being installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.isInstallable = false;
      this.dispatchInstalledEvent();
    });

    // Check if already installed
    this.checkIfInstalled();
  }

  private checkIfInstalled(): void {
    if (typeof window === 'undefined') return;

    // Check if running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }

    // Check if installed via navigator.userAgent (iOS)
    if ((window.navigator as any).standalone === true) {
      this.isInstalled = true;
    }
  }

  private dispatchInstallableEvent(): void {
    window.dispatchEvent(new CustomEvent('pwa-installable'));
  }

  private dispatchInstalledEvent(): void {
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  }

  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
      return false;
    } finally {
      this.deferredPrompt = null;
      this.isInstallable = false;
    }
  }

  public getInstallable(): boolean {
    return this.isInstallable;
  }

  public getInstalled(): boolean {
    return this.isInstalled;
  }
}

// Create singleton instance
export const pwaInstaller = new PWAInstaller();

// React hook for PWA functionality
export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize values
    setIsInstallable(pwaInstaller.getInstallable());
    setIsInstalled(pwaInstaller.getInstalled());

    // Listen for PWA events
    const handleInstallable = () => setIsInstallable(true);
    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };
    const handleUpdateAvailable = () => setUpdateAvailable(true);

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    // Register service worker
    registerServiceWorker();

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);

  const promptInstall = async (): Promise<boolean> => {
    return await pwaInstaller.promptInstall();
  };

  const updateApp = (): void => {
    activateNewServiceWorker();
  };

  return {
    isInstallable,
    isInstalled,
    updateAvailable,
    promptInstall,
    updateApp,
  };
};

// Notification utilities
export const showUpdateAvailableNotification = (): void => {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent('pwa-update-available', {
    detail: {
      title: 'Update Available',
      message: 'A new version of Luxe Films is available. Refresh to update.',
    },
  });
  window.dispatchEvent(event);
};

// Network status detection
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Set initial status
    updateNetworkStatus();

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return isOnline;
};

// Background sync for form submissions
export const queueFormSubmission = async (formData: any, endpoint: string): Promise<void> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    // Fallback: try immediate submission
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      throw error;
    }
    return;
  }

  try {
    // Store form data for background sync
    const registration = await navigator.serviceWorker.ready;
    
    // Store in IndexedDB or localStorage for now
    localStorage.setItem('pending-form-submission', JSON.stringify({
      data: formData,
      endpoint,
      timestamp: Date.now(),
    }));

    // Register background sync
    if ('sync' in registration) {
      await registration.sync.register('contact-form');
      console.log('Background sync registered for form submission');
    } else {
      // Fallback: immediate submission
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      localStorage.removeItem('pending-form-submission');
    }
  } catch (error) {
    console.error('Failed to queue form submission:', error);
    throw error;
  }
};

// Clear pending form submissions
export const clearPendingSubmissions = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pending-form-submission');
  }
};