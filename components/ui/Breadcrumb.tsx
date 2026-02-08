'use client';

import { motion } from 'framer-motion';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-20 pb-4 bg-background border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <HiChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              
              {index === 0 ? (
                <Link 
                  href={item.href}
                  className="flex items-center text-gray-500 hover:text-primary transition-colors duration-200"
                >
                  <HiHome className="h-4 w-4 mr-1" />
                  {item.label}
                </Link>
              ) : index === items.length - 1 ? (
                <span className="text-primary font-medium">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
}