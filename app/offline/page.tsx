'use client';

import { motion } from 'framer-motion';
import { HiWifi, HiRefresh } from 'react-icons/hi';


export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <HiWifi className="w-12 h-12 text-gray-400" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-primary mb-4"
        >
          You're Offline
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          It looks like you're not connected to the internet. Please check your connection and try again.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors duration-200"
        >
          <HiRefresh className="w-5 h-5 mr-2" />
          Try Again
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="font-semibold text-primary mb-2">
            While you're offline, you can:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• View previously loaded content</li>
            <li>• Check your saved projects</li>
            <li>• Review our contact information</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}