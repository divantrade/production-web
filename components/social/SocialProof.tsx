'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiQuoteLeft, HiCheck } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  date: string;
}

interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  content: string;
  image?: string;
  url: string;
  date: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

interface SocialProofProps {
  testimonials?: Testimonial[];
  socialPosts?: SocialPost[];
  className?: string;
  variant?: 'full' | 'testimonials' | 'social';
}

// Mock data - in production, this would come from your CMS or APIs
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Tech Innovations Inc.',
    content: 'Luxe Films created an absolutely stunning commercial for our product launch. Their attention to detail and creative vision exceeded our expectations.',
    rating: 5,
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Documentary Producer',
    company: 'Independent',
    content: 'Working with this team was incredible. They brought our vision to life with such professionalism and artistic flair.',
    rating: 5,
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Brand Manager',
    company: 'Fashion Forward',
    content: 'The music video they produced for our campaign went viral! Outstanding cinematography and editing.',
    rating: 5,
    date: '2024-01-05'
  }
];

const defaultSocialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'instagram',
    content: 'Behind the scenes of our latest documentary shoot in the mountains 🎬',
    url: 'https://instagram.com/luxefilms',
    date: '2024-01-20',
    likes: 1240,
    comments: 89
  },
  {
    id: '2',
    platform: 'twitter',
    content: 'Just wrapped an amazing commercial shoot with @TechInnovations. The future looks bright! ✨',
    url: 'https://twitter.com/luxefilms',
    date: '2024-01-18',
    likes: 456,
    comments: 23,
    shares: 67
  },
  {
    id: '3',
    platform: 'linkedin',
    content: 'Proud to announce our documentary "Nature\'s Voice" won Best Cinematography at the Film Festival!',
    url: 'https://linkedin.com/company/luxefilms',
    date: '2024-01-15',
    likes: 234,
    comments: 45
  }
];

export default function SocialProof({
  testimonials = defaultTestimonials,
  socialPosts = defaultSocialPosts,
  className = '',
  variant = 'full'
}: SocialProofProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="w-5 h-5" />;
      case 'twitter':
        return <FaTwitter className="w-5 h-5" />;
      case 'linkedin':
        return <FaLinkedin className="w-5 h-5" />;
      case 'youtube':
        return <FaYoutube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'text-pink-500 bg-pink-50';
      case 'twitter':
        return 'text-blue-500 bg-blue-50';
      case 'linkedin':
        return 'text-blue-700 bg-blue-50';
      case 'youtube':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <HiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (variant === 'testimonials') {
    return (
      <ScrollReveal className={`py-16 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-gray-600">
              See what our clients say about working with us
            </p>
          </div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <HiQuoteLeft className="w-12 h-12 text-primary mx-auto mb-6 opacity-20" />
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </p>

              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  if (variant === 'social') {
    return (
      <ScrollReveal className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Follow Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Stay connected with our latest projects and behind-the-scenes content
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {socialPosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">@luxefilms</h3>
                      <p className="text-sm text-gray-500 capitalize">{post.platform}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt="Social media post"
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex space-x-4">
                      {post.likes && (
                        <span>❤️ {formatNumber(post.likes)}</span>
                      )}
                      {post.comments && (
                        <span>💬 {formatNumber(post.comments)}</span>
                      )}
                      {post.shares && (
                        <span>🔄 {formatNumber(post.shares)}</span>
                      )}
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Social media links */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Connect with us
            </h3>
            <div className="flex justify-center space-x-6">
              {[
                { platform: 'instagram', url: 'https://instagram.com/luxefilms', color: 'hover:text-pink-500' },
                { platform: 'twitter', url: 'https://twitter.com/luxefilms', color: 'hover:text-blue-500' },
                { platform: 'linkedin', url: 'https://linkedin.com/company/luxefilms', color: 'hover:text-blue-700' },
                { platform: 'youtube', url: 'https://youtube.com/luxefilms', color: 'hover:text-red-500' },
              ].map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${social.color} transition-colors`}
                >
                  {getPlatformIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  // Full variant
  return (
    <div className={className}>
      {/* Testimonials Section */}
      <ScrollReveal className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has earned us the trust of brands, artists, and organizations worldwide
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  {renderStars(testimonial.rating)}
                  <HiQuoteLeft className="w-8 h-8 text-primary opacity-20" />
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Social Media Section */}
      <ScrollReveal className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Behind the Scenes
            </h2>
            <p className="text-xl opacity-90">
              Follow our creative journey on social media
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {socialPosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4 text-white">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <h3 className="font-semibold">@luxefilms</h3>
                    <p className="text-sm opacity-75 capitalize">{post.platform}</p>
                  </div>
                </div>

                <p className="text-white mb-4 opacity-90 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-sm text-white opacity-75">
                  <div className="flex space-x-3">
                    {post.likes && <span>❤️ {formatNumber(post.likes)}</span>}
                    {post.comments && <span>💬 {post.comments}</span>}
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <p className="text-white text-lg mb-6">
              Join our community and stay updated with our latest work
            </p>
            <div className="flex justify-center space-x-4">
              {[
                { platform: 'instagram', url: 'https://instagram.com/luxefilms' },
                { platform: 'twitter', url: 'https://twitter.com/luxefilms' },
                { platform: 'linkedin', url: 'https://linkedin.com/company/luxefilms' },
                { platform: 'youtube', url: 'https://youtube.com/luxefilms' },
              ].map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                >
                  {getPlatformIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}