'use client';

import { motion } from 'framer-motion';

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface CompanyValuesProps {
  values: Value[];
}

export default function CompanyValues({ values }: CompanyValuesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Our Values
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The principles that drive our creative process and client relationships
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              {/* Background Animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                className="relative text-6xl mb-6"
              >
                {value.icon}
              </motion.div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Decorative Element */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '40px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="h-1 bg-accent rounded-full mx-auto mt-6 group-hover:w-16 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-primary to-gray-800 rounded-2xl p-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl text-accent mb-6"
            >
              💫
            </motion.div>
            <h3 className="text-3xl font-bold mb-6">
              Excellence Through Values
            </h3>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              These values aren't just words on our website – they're the foundation of every project we undertake and every relationship we build.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}