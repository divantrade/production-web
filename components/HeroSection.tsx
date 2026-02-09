'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Typewriter from './Typewriter';
import Button from './Button';
import ScrollIndicator from './ScrollIndicator';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const typewriterTexts = [
    t('headlines.0'),
    t('headlines.1'),
    t('headlines.2'),
  ];

  const handleViewWork = () => {
    window.location.href = `/${locale}/work`;
  };

  const handleGetInTouch = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        key="hero-video"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          style={{
            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6), 2px 2px 4px rgba(0,0,0,0.9)',
          }}
        >
          <Typewriter
            texts={typewriterTexts}
            delay={150}
            deleteDelay={75}
            loop={true}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-100 mb-8 font-light"
          style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" variant="primary" onClick={handleViewWork}>
            {t('viewWork')}
          </Button>
          <Button size="lg" variant="secondary" onClick={handleGetInTouch}>
            {t('getInTouch')}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
