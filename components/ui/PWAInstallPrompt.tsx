'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDownload, HiX, HiRefresh } from 'react-icons/hi';
import { usePWA } from '@/lib/pwa';

export default function PWAInstallPrompt() {
  const { isInstallable, isInstalled, updateAvailable, promptInstall, updateApp } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show install prompt if installable and not dismissed
    if (isInstallable && !dismissed && !isInstalled) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isInstallable, dismissed, isInstalled]);

  useEffect(() => {
    // Show update prompt when update is available
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    
    // Remember dismissal for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pwa-dismissed', 'true');
    }
  };

  const handleUpdate = () => {
    updateApp();
  };

  // Check if previously dismissed in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasDismissed = sessionStorage.getItem('pwa-dismissed');
      if (wasDismissed) {
        setDismissed(true);
      }
    }
  }, []);

  if (isInstalled) {
    return null; // Don't show install prompt if already installed
  }

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3">
                    <HiDownload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Install Luxe Films</h3>
                    <p className="text-sm text-gray-600">Get the app for a better experience</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Dismiss install prompt"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  Fast access from your home screen
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  Works offline with cached content
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  Optimized performance
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-medium transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
          >
            <div className="bg-primary text-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                    <HiRefresh className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Update Available</h3>
                    <p className="text-sm text-white/80">A new version is ready</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpdatePrompt(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss update prompt"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-white/80 mb-4">
                Refresh to get the latest features and improvements.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Update Now
                </button>
                <button
                  onClick={() => setShowUpdatePrompt(false)}
                  className="px-4 py-2 text-white/80 hover:text-white font-medium transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Compact install button for header/footer
export function PWAInstallButton() {
  const { isInstallable, isInstalled, promptInstall } = usePWA();

  if (!isInstallable || isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInstall}
      className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-medium transition-colors"
      aria-label="Install Luxe Films app"
    >
      <HiDownload className="w-4 h-4" />
      <span className="hidden md:inline">Install App</span>
    </motion.button>
  );
}

// Network status indicator
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateNetworkStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        setShowOffline(true);
      } else {
        // Hide offline message after coming back online
        setTimeout(() => setShowOffline(false), 2000);
      }
    };

    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return (
    <AnimatePresence>
      {showOffline && !isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 px-4 z-50"
        >
          <p className="text-sm font-medium">
            You're offline. Some features may not be available.
          </p>
        </motion.div>
      )}
      {showOffline && isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 px-4 z-50"
        >
          <p className="text-sm font-medium">
            You're back online!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}