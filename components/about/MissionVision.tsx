'use client';

import { motion } from 'framer-motion';
import { HiEye, HiLightBulb, HiHeart, HiBadgeCheck } from 'react-icons/hi';

interface MissionVisionProps {
  siteSettings?: any;
}

export default function MissionVision({ siteSettings }: MissionVisionProps) {
  const mission = siteSettings?.companyInfo?.mission || 
    'To create compelling visual narratives that inspire, educate, and entertain audiences while helping our clients achieve their storytelling goals through innovative production techniques and creative excellence.';
  
  const vision = siteSettings?.companyInfo?.vision || 
    'To be the leading creative partner for organizations seeking to communicate their stories through powerful visual media, setting new standards for quality and innovation in the documentary and commercial production industry.';

  const cards = [
    {
      title: 'Our Mission',
      description: mission,
      icon: HiBadgeCheck,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Our Vision',
      description: vision,
      icon: HiEye,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Our Approach',
      description: 'We believe in collaborative storytelling, combining technical expertise with creative vision to deliver content that resonates with audiences and drives meaningful engagement.',
      icon: HiLightBulb,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Our Passion',
      description: 'Every project is an opportunity to push creative boundaries and explore new ways of visual communication, ensuring each story is told with authenticity and impact.',
      icon: HiHeart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Our Foundation
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The core principles that guide everything we do
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-2xl ${card.bgColor} p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <card.icon className="w-full h-full" />
              </div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} mb-6 shadow-lg`}
              >
                <card.icon className="text-white text-2xl" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-primary mb-4">
                {card.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {card.description}
              </p>

              {/* Decorative Element */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className={`h-1 bg-gradient-to-r ${card.color} mt-6 rounded-full`}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-12 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl text-accent mb-6"
            >
              "
            </motion.div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-8 italic">
              Great stories have the power to change perspectives, inspire action, and create lasting connections between people and ideas.
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-0.5 bg-accent"></div>
              <cite className="text-primary font-semibold not-italic">
                Luxe Films Team
              </cite>
              <div className="w-12 h-0.5 bg-accent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}