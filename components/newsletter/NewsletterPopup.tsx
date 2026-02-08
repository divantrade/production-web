'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiMail, HiGift, HiCheckCircle } from 'react-icons/hi';

interface NewsletterPopupProps {
  showDelay?: number;
  showOnScroll?: boolean;
  scrollPercentage?: number;
  showOnExit?: boolean;
  className?: string;
}

export default function NewsletterPopup({
  showDelay = 5000,
  showOnScroll = false,
  scrollPercentage = 50,
  showOnExit = true,
  className = ''
}: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed or subscribed
    const dismissed = localStorage.getItem('newsletter-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (dismissed || subscribed) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasShownOnScroll = false;

    // Show after delay
    if (!showOnScroll && !showOnExit) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
    }

    // Show on scroll
    const handleScroll = () => {
      if (showOnScroll && !hasShownOnScroll) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= scrollPercentage) {
          setIsVisible(true);
          hasShownOnScroll = true;
        }
      }
    };

    // Show on exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (showOnExit && e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    if (showOnScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    if (showOnExit) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showDelay, showOnScroll, scrollPercentage, showOnExit]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!consent) {
      setError('Please agree to receive our newsletter');
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'popup',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem('newsletter-subscribed', 'true');
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl ${className}`}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <HiGift className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Exclusive Updates</h2>
                  <p className="text-sm opacity-90">Behind the scenes content</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Stay in the loop!
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get exclusive behind-the-scenes content, project updates, and special offers delivered to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={isSubmitting}
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed">
                        I agree to receive marketing emails from Luxe Films. You can unsubscribe at any time. 
                        View our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !email || !consent}
                      className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <HiMail className="w-4 h-4" />
                          <span>Subscribe Now</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Join 1,000+ creative professionals who get our updates
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiCheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Thank you for subscribing!
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We've sent a confirmation email to <strong>{email}</strong>. 
                    Check your inbox and click the link to complete your subscription.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600">
                      🎬 You'll receive your first behind-the-scenes update within 24 hours!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Benefits footer */}
            {!isSuccess && (
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>✨ Exclusive content</span>
                  <span>📧 Weekly updates</span>
                  <span>🎯 No spam, ever</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}