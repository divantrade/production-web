'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiSearch, 
  HiX, 
  HiFilm, 
  HiUser, 
  HiPhone, 
  HiCog,
  HiArrowRight,
  HiClock
} from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'project' | 'service' | 'team' | 'blog';
  url: string;
  category?: string;
  image?: string;
  tags?: string[];
}

interface GlobalSearchProps {
  className?: string;
}

// Mock search data - in production, this would come from your CMS or search API
const searchData: SearchResult[] = [
  // Pages
  {
    id: '1',
    title: 'Our Work',
    description: 'Browse our portfolio of documentaries, commercials, and music videos',
    type: 'page',
    url: '/work',
    category: 'Portfolio'
  },
  {
    id: '2',
    title: 'About Us',
    description: 'Learn about our team and company story',
    type: 'page',
    url: '/about',
    category: 'Company'
  },
  {
    id: '3',
    title: 'Services',
    description: 'Discover our video production services',
    type: 'page',
    url: '/services',
    category: 'Services'
  },
  {
    id: '4',
    title: 'Contact',
    description: 'Get in touch with our team',
    type: 'page',
    url: '/contact',
    category: 'Contact'
  },
  // Projects
  {
    id: '5',
    title: 'Nature Documentary',
    description: 'Award-winning wildlife documentary filmed in 4K',
    type: 'project',
    url: '/work/nature-documentary',
    category: 'Documentary',
    tags: ['nature', 'wildlife', '4k', 'award-winning']
  },
  {
    id: '6',
    title: 'Luxury Brand Commercial',
    description: 'High-end commercial for premium fashion brand',
    type: 'project',
    url: '/work/luxury-brand-commercial',
    category: 'Commercial',
    tags: ['luxury', 'fashion', 'brand', 'commercial']
  },
  {
    id: '7',
    title: 'Music Video - Electric Dreams',
    description: 'Cinematic music video with visual effects',
    type: 'project',
    url: '/work/electric-dreams-music-video',
    category: 'Music Video',
    tags: ['music', 'video', 'effects', 'cinematic']
  },
  // Services
  {
    id: '8',
    title: 'Documentary Production',
    description: 'Full-service documentary filmmaking from concept to delivery',
    type: 'service',
    url: '/services#documentary',
    category: 'Production'
  },
  {
    id: '9',
    title: 'Commercial Video',
    description: 'Brand storytelling through compelling commercial content',
    type: 'service',
    url: '/services#commercial',
    category: 'Production'
  },
  {
    id: '10',
    title: 'Music Video Production',
    description: 'Creative music videos that capture your artistic vision',
    type: 'service',
    url: '/services#music-video',
    category: 'Production'
  },
  // Team
  {
    id: '11',
    title: 'John Smith - Director',
    description: 'Award-winning director with 15 years of experience',
    type: 'team',
    url: '/about#team',
    category: 'Team'
  },
  {
    id: '12',
    title: 'Sarah Johnson - Producer',
    description: 'Executive producer specializing in documentaries',
    type: 'team',
    url: '/about#team',
    category: 'Team'
  }
];

export default function GlobalSearch({ className = '' }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState(['documentary', 'commercial', 'music video', 'portfolio', 'contact']);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            selectResult(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });

    // Sort by relevance (title matches first, then description, then tags)
    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });

    setResults(sorted.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(0);
  }, []);

  // Handle search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 150); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const selectResult = (result: SearchResult) => {
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent-searches', JSON.stringify(newRecent));

    // Navigate to result
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    performSearch(searchTerm);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <HiFilm className="w-4 h-4" />;
      case 'team':
        return <HiUser className="w-4 h-4" />;
      case 'service':
        return <HiCog className="w-4 h-4" />;
      case 'page':
        return <HiArrowRight className="w-4 h-4" />;
      default:
        return <HiSearch className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'text-blue-500 bg-blue-50';
      case 'team':
        return 'text-green-500 bg-green-50';
      case 'service':
        return 'text-purple-500 bg-purple-50';
      case 'page':
        return 'text-gray-500 bg-gray-50';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors ${className}`}
      >
        <HiSearch className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">Search...</span>
        <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400">
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">⌘</kbd>
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">K</kbd>
        </div>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-[10vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center px-6 py-4 border-b border-gray-200">
                <HiSearch className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, services, team..."
                  className="flex-1 text-lg outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-3 text-gray-400 hover:text-gray-600"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                {query && results.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-4 py-2 font-medium">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </div>
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => selectResult(result)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          index === selectedIndex 
                            ? 'bg-primary bg-opacity-10' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                            {getTypeIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900 truncate">
                                {result.title}
                              </h3>
                              {result.category && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {result.category}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {result.description}
                            </p>
                          </div>
                          <HiArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="p-8 text-center">
                    <HiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      Try searching for projects, services, or team members
                    </p>
                  </div>
                )}

                {/* Recent and Popular Searches */}
                {!query && (
                  <div className="p-4 space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <HiClock className="w-4 h-4 mr-2" />
                          Recent searches
                        </h3>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickSearch(search)}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Popular searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickSearch(search)}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">↵</kbd>
                      <span>to select</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">↑↓</kbd>
                      <span>to navigate</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">esc</kbd>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}