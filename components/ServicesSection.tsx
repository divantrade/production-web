'use client';

import { motion } from 'framer-motion';
import { HiFilm, HiSpeakerphone, HiMusicNote, HiArrowRight } from 'react-icons/hi';
import { Service } from '@/types';

const services: Service[] = [
  {
    id: '1',
    title: 'Documentary Films',
    description: 'Compelling storytelling that captures real emotions and authentic moments. From concept to final cut, we craft documentaries that inspire and inform.',
    icon: <HiFilm className="w-8 h-8" />,
    features: ['Research & Development', 'Cinematography', 'Post-Production', 'Distribution Strategy'],
  },
  {
    id: '2',
    title: 'Commercial Production',
    description: 'High-impact commercial content that drives results. We create visually stunning advertisements that connect brands with their audiences.',
    icon: <HiSpeakerphone className="w-8 h-8" />,
    features: ['Brand Strategy', 'Creative Direction', 'Production', 'Multi-Platform Distribution'],
  },
  {
    id: '3',
    title: 'Music Videos',
    description: 'Dynamic visual narratives that amplify musical artistry. We bring songs to life through innovative cinematography and creative direction.',
    icon: <HiMusicNote className="w-8 h-8" />,
    features: ['Concept Development', 'Visual Effects', 'Choreography', 'Color Grading'],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Services
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-6"
          />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From concept to completion, we deliver exceptional visual content that exceeds expectations
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-accent/50">
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-lg text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                        className="text-gray-400 text-sm flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {/* Learn More Link */}
                <motion.div
                  className="flex items-center text-accent font-medium group-hover:text-white transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2">Learn More</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <HiArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}