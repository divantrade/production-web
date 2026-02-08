'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiExclamationTriangle, HiRefresh } from 'react-icons/hi';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
    
    // Log to analytics or error reporting service
    if (typeof window !== 'undefined') {
      // Example: Analytics tracking
      // analytics.track('Error Boundary Triggered', {
      //   error: error.message,
      //   stack: error.stack,
      //   componentStack: errorInfo.componentStack,
      // });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error!} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <HiExclamationTriangle className="w-10 h-10 text-red-500" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Something went wrong
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
        </motion.p>
        
        {process.env.NODE_ENV === 'development' && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-left bg-gray-100 p-4 rounded-lg mb-6"
          >
            <summary className="cursor-pointer font-medium text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-sm text-red-600 overflow-auto">
              {error.message}
              {'\n'}
              {error.stack}
            </pre>
          </motion.details>
        )}
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={resetError}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors duration-200"
        >
          <HiRefresh className="w-5 h-5 mr-2" />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
}

// Specific error fallbacks for different scenarios
export function VideoErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-6">
        <HiExclamationTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Video failed to load</p>
        <button
          onClick={resetError}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export function ImageErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-4">
        <HiExclamationTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">Image failed to load</p>
      </div>
    </div>
  );
}

export function ProjectCardErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center">
        <HiExclamationTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Failed to load project</p>
        <button
          onClick={resetError}
          className="text-primary hover:text-primary/80 font-medium text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

// Main export
export default function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryClass {...props} />;
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error handled:', error, errorInfo);
    
    // Log to error reporting service
    if (typeof window !== 'undefined') {
      // Example: Send to error reporting service
      // errorReporting.captureException(error, {
      //   extra: errorInfo,
      //   tags: { component: 'functional-component' },
      // });
    }
  };
}