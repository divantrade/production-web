'use client';

import { motion } from 'framer-motion';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaInstagram, FaDribbble } from 'react-icons/fa';
import Image from 'next/image';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department?: string;
  bio?: string;
  avatar?: any;
  email?: string;
  phone?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    dribbble?: string;
  };
  featured?: boolean;
  skills?: string[];
  experience?: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  // Mock team data if no team members from CMS
  const mockTeam = [
    {
      _id: '1',
      name: 'Sarah Chen',
      role: 'Creative Director',
      department: 'Creative',
      bio: 'Award-winning director with 10+ years of experience in documentary and commercial production.',
      avatar: null,
      email: 'sarah@luxefilms.com',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: true,
      skills: ['Direction', 'Storytelling', 'Creative Strategy'],
      experience: '10+ years'
    },
    {
      _id: '2',
      name: 'Marcus Rodriguez',
      role: 'Director of Photography',
      department: 'Production',
      bio: 'Cinematographer specializing in cinematic storytelling and visual aesthetics.',
      avatar: null,
      email: 'marcus@luxefilms.com',
      socialLinks: {
        linkedin: '#',
        instagram: '#',
        dribbble: '#'
      },
      featured: true,
      skills: ['Cinematography', 'Lighting', 'Camera Operation'],
      experience: '8+ years'
    },
    {
      _id: '3',
      name: 'Emily Thompson',
      role: 'Post-Production Supervisor',
      department: 'Post-Production',
      bio: 'Expert in post-production workflows and color grading with a keen eye for detail.',
      avatar: null,
      email: 'emily@luxefilms.com',
      socialLinks: {
        linkedin: '#',
        twitter: '#'
      },
      featured: true,
      skills: ['Editing', 'Color Grading', 'Sound Design'],
      experience: '7+ years'
    },
    {
      _id: '4',
      name: 'David Kim',
      role: 'Producer',
      department: 'Production',
      bio: 'Experienced producer managing complex projects from concept to completion.',
      avatar: null,
      email: 'david@luxefilms.com',
      socialLinks: {
        linkedin: '#',
        twitter: '#'
      },
      featured: true,
      skills: ['Project Management', 'Budgeting', 'Client Relations'],
      experience: '12+ years'
    }
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : mockTeam;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return FaTwitter;
      case 'linkedin': return FaLinkedin;
      case 'instagram': return FaInstagram;
      case 'dribbble': return FaDribbble;
      default: return FaLinkedin;
    }
  };

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
            Meet Our Team
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Talented professionals passionate about creating exceptional visual content
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTeam.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    {member.socialLinks && Object.entries(member.socialLinks).map(([platform, url]) => {
                      const IconComponent = getSocialIcon(platform);
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          whileHover={{ scale: 1.2 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-200"
                        >
                          <IconComponent className="text-lg" />
                        </motion.a>
                      );
                    })}
                    
                    {member.email && (
                      <motion.a
                        href={`mailto:${member.email}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-200"
                      >
                        <HiMail className="text-lg" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">
                  {member.role}
                </p>
                {member.department && (
                  <p className="text-sm text-gray-500 mb-3">
                    {member.department} Department
                  </p>
                )}
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                )}
                
                {/* Skills */}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {member.experience && (
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{member.experience} experience</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-gray-800 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Join Our Creative Team
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for visual storytelling.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-colors duration-200"
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}