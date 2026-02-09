'use client';

import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { useTranslations } from 'next-intl';

export default function ScrollIndicator() {
  const t = useTranslations('hero');

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={handleScrollDown}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-white text-sm font-light tracking-widest uppercase">
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <HiChevronDown className="text-accent text-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}
