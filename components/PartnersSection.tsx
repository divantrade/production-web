'use client';

import { motion } from 'framer-motion';
import { Partner } from '@/types';

const partners: Partner[] = [
  { id: '1', name: 'Netflix', logo: '/api/placeholder/120/60' },
  { id: '2', name: 'HBO', logo: '/api/placeholder/120/60' },
  { id: '3', name: 'Disney', logo: '/api/placeholder/120/60' },
  { id: '4', name: 'Amazon Studios', logo: '/api/placeholder/120/60' },
  { id: '5', name: 'Apple TV+', logo: '/api/placeholder/120/60' },
  { id: '6', name: 'Universal', logo: '/api/placeholder/120/60' },
  { id: '7', name: 'Sony Pictures', logo: '/api/placeholder/120/60' },
  { id: '8', name: 'Paramount', logo: '/api/placeholder/120/60' },
];

// Duplicate partners for seamless loop
const allPartners = [...partners, ...partners];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Trusted Partners
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-6"
          />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional content
          </p>
        </motion.div>

        {/* Partners Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-12 items-center"
              animate={{
                x: [0, -50 * partners.length + '%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {allPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 grayscale group-hover:grayscale-0">
                    {/* Placeholder Logo */}
                    <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                      {partner.name}
                    </div>
                    {/* Replace with actual logo when available:
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            And many more leading brands worldwide
          </p>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}