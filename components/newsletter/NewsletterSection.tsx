'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiCheckCircle, HiFilm, HiStar, HiUsers } from 'react-icons/hi';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface NewsletterSectionProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'featured';
}

export default function NewsletterSection({
  className = '',
  variant = 'default'
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'section',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
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

  if (variant === 'minimal') {
    return (
      <ScrollReveal className={`py-12 ${className}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest behind-the-scenes content and project updates.
          </p>
          
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center text-green-600">
              <HiCheckCircle className="w-5 h-5 mr-2" />
              <span>Successfully subscribed!</span>
            </div>
          )}
          
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </ScrollReveal>
    );
  }

  if (variant === 'featured') {
    return (
      <ScrollReveal className={`py-20 bg-gradient-to-r from-primary to-accent ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiFilm className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Behind the Lens
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Get exclusive access to our creative process, project updates, and industry insights
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiStar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Exclusive Content</h3>
                <p className="text-sm opacity-80">Behind-the-scenes footage and project breakdowns</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiUsers className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Industry Insights</h3>
                <p className="text-sm opacity-80">Tips and trends from professional filmmakers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiMail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Weekly Updates</h3>
                <p className="text-sm opacity-80">Regular updates on our latest projects</p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="px-8 py-3 bg-white text-primary hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium rounded-lg transition-colors duration-200"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-200 text-sm mt-2">{error}</p>
                  )}
                  <p className="text-sm opacity-75 mt-3">
                    Join 1,000+ creative professionals • No spam, unsubscribe anytime
                  </p>
                </form>
              ) : (
                <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center text-white">
                    <HiCheckCircle className="w-6 h-6 mr-2" />
                    <span className="font-medium">Thank you for subscribing!</span>
                  </div>
                  <p className="text-sm opacity-90 mt-2">
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </ScrollReveal>
    );
  }

  // Default variant
  return (
    <ScrollReveal className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={staggerItem} className="mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <HiMail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get exclusive behind-the-scenes content, project updates, and filmmaking insights 
              delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="mb-8">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 pr-32 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors duration-200"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-3">{error}</p>
                )}
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-lg mx-auto">
                <div className="flex items-center justify-center text-green-600 mb-2">
                  <HiCheckCircle className="w-6 h-6 mr-2" />
                  <span className="font-medium">Successfully subscribed!</span>
                </div>
                <p className="text-green-700 text-sm">
                  We've sent a confirmation email to your inbox.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Weekly updates
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Exclusive content
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                No spam ever
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              1,000+ creative professionals trust our newsletter
            </p>
          </motion.div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}