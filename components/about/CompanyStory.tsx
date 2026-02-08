'use client';

import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiUsers, HiFilm } from 'react-icons/hi';

interface CompanyStoryProps {
  siteSettings?: any;
}

export default function CompanyStory({ siteSettings }: CompanyStoryProps) {
  const foundedYear = siteSettings?.companyInfo?.foundedYear || 2018;
  const description = siteSettings?.companyInfo?.description || 
    'Founded with a vision to transform storytelling through innovative visual media, Luxe Films has grown from a small creative studio to a leading production company. Our journey began with a simple belief: every story deserves to be told with passion, precision, and artistic excellence.';

  const timeline = [
    {
      year: foundedYear,
      title: 'The Beginning',
      description: 'Luxe Films was founded with a vision to create exceptional visual content.',
      icon: HiFilm,
    },
    {
      year: foundedYear + 1,
      title: 'First Major Project',
      description: 'Completed our first award-winning documentary series.',
      icon: HiCalendar,
    },
    {
      year: foundedYear + 2,
      title: 'Team Expansion',
      description: 'Grew our team to include specialized departments for different production needs.',
      icon: HiUsers,
    },
    {
      year: foundedYear + 3,
      title: 'International Recognition',
      description: 'Received international acclaim and expanded to serve global clients.',
      icon: HiLocationMarker,
    },
    {
      year: new Date().getFullYear(),
      title: 'Present Day',
      description: 'Leading the industry with innovative productions and cutting-edge technology.',
      icon: HiFilm,
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Awards Won' },
    { number: '100+', label: 'Happy Clients' },
    { number: `${new Date().getFullYear() - foundedYear}+`, label: 'Years Experience' },
  ];

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
            Our Story
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h3 className="text-3xl font-bold text-center text-primary mb-12">
            Our Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-accent"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <item.icon className="text-accent text-2xl mr-3" />
                      <span className="text-accent font-bold text-lg">{item.year}</span>
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}