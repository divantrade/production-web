'use client';

import { motion } from 'framer-motion';
import { HiStar, HiCalendar } from 'react-icons/hi';

interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

interface AwardsSectionProps {
  awards: Award[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
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
            Awards & Recognition
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized by industry leaders and prestigious organizations
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.title}-${award.year}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Award Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-accent to-yellow-400 mb-6 shadow-lg"
              >
                <HiStar className="text-white text-2xl" />
              </motion.div>

              {/* Award Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  {award.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <HiStar className="mr-1" />
                    {award.organization}
                  </div>
                  <div className="flex items-center">
                    <HiCalendar className="mr-1" />
                    {award.year}
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {award.description}
                </p>
              </div>

              {/* Decorative Element */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-accent to-yellow-400 mt-6 rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Recognition Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Film Festivals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600">Industry Recognition</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-gray-600">Years Running</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}