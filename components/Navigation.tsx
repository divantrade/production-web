'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { LuFileSearch, LuMic, LuClapperboard, LuFilm, LuTv, LuPenTool, LuGlobe, LuMicVocal, LuPalette } from 'react-icons/lu';
import { cn } from '@/lib/utils';

const serviceItems = [
  { label: 'Documentary', href: '#services', icon: LuFilm },
  { label: 'Investigations & Research', href: '#services', icon: LuFileSearch },
  { label: 'Drama & Docudrama', href: '#services', icon: LuClapperboard },
  { label: 'Interview Production', href: '#services', icon: LuMic },
  { label: 'Full Episode Production', href: '#services', icon: LuTv },
  { label: 'Script Development', href: '#services', icon: LuPenTool },
  { label: 'International Production', href: '#services', icon: LuGlobe },
  { label: 'Voice Over', href: '#services', icon: LuMicVocal },
  { label: 'Graphics', href: '#services', icon: LuPalette },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setServicesOpen(false);
    if (!isClient) return;
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-black/70 border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <a href="/" className="block text-2xl font-bold text-white hover:opacity-80 transition-opacity">
              <span className="text-gradient">DIVAN</span>
              <span className="text-white ml-1">TRADE</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.a
              href="/"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Home
            </motion.a>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#services');
                }}
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Services
                <HiChevronDown className={cn('h-4 w-4 transition-transform duration-200', servicesOpen && 'rotate-180')} />
              </motion.button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="p-2">
                      {serviceItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.href);
                            }}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                    <div className="border-t border-white/[0.06] p-2">
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('#services');
                        }}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-accent hover:bg-accent/10 transition-colors text-center"
                      >
                        View All Services
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(1).map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Get a Quote
            </a>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-accent transition-colors duration-300"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden backdrop-blur-xl bg-black/95 border-t border-white/[0.06]"
          >
            <div className="px-4 py-4 space-y-1">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-white font-medium rounded-lg hover:bg-white/5"
              >
                Home
              </a>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 text-white font-medium rounded-lg hover:bg-white/5"
                >
                  Services
                  <HiChevronDown className={cn('h-4 w-4 transition-transform duration-200', mobileServicesOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        {serviceItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                              }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <Icon className="h-4 w-4 text-accent" />
                              <span className="text-sm">{item.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.slice(1).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className="block px-3 py-3 text-white font-medium rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 border-t border-white/[0.06]">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="block text-center px-4 py-3 rounded-full bg-accent text-black font-semibold"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
