'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiFilter, HiChevronDown, HiX } from 'react-icons/hi';
import { FilterOptions } from '@/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onSearchChange: (query: string) => void;
  availableYears: number[];
  availableIndustries: string[];
  totalResults: number;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onSearchChange,
  availableYears,
  availableIndustries,
  totalResults,
}: FilterBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (filterBarRef.current) {
        const rect = filterBarRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchValue('');
    onSearchChange('');
  };

  // Handle category change
  const handleCategoryChange = (category: FilterOptions['category']) => {
    onFilterChange({ category });
    setActiveDropdown(null);
  };

  // Handle year change
  const handleYearChange = (year: number | 'All') => {
    onFilterChange({ year });
    setActiveDropdown(null);
  };

  // Handle sort change
  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ sortBy });
    setActiveDropdown(null);
  };

  // Handle industry toggle
  const handleIndustryToggle = (industry: string) => {
    const newIndustries = filters.industry.includes(industry)
      ? filters.industry.filter(ind => ind !== industry)
      : [...filters.industry, industry];
    onFilterChange({ industry: newIndustries });
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      category: 'All',
      year: 'All',
      industry: [],
      sortBy: 'latest',
    });
    setSearchValue('');
    onSearchChange('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!filterBarRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories: FilterOptions['category'][] = ['All', 'Documentary', 'Commercial', 'Music Video'];
  const sortOptions: { value: FilterOptions['sortBy']; label: string }[] = [
    { value: 'latest', label: 'Latest' },
    { value: 'mostViewed', label: 'Most Viewed' },
    { value: 'featured', label: 'Featured' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  const hasActiveFilters = filters.category !== 'All' || 
                          filters.year !== 'All' || 
                          filters.industry.length > 0 || 
                          filters.searchQuery.trim() !== '';

  return (
    <div
      ref={filterBarRef}
      className={cn(
        'bg-white border-b border-gray-200 transition-all duration-300 z-40',
        isSticky ? 'sticky top-0 shadow-lg' : 'relative'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Desktop Filter Bar */}
          <div className="hidden lg:flex items-center justify-between space-x-6">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchValue}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              {searchValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <HiX size={16} />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Category */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                    filters.category !== 'All'
                      ? 'bg-accent text-black border-accent'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  )}
                >
                  <span>{filters.category}</span>
                  <HiChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'category' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={cn(
                            'w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg',
                            filters.category === category && 'bg-accent/10 text-accent'
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Year */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                    filters.year !== 'All'
                      ? 'bg-accent text-black border-accent'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  )}
                >
                  <span>{filters.year === 'All' ? 'Year' : filters.year}</span>
                  <HiChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'year' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-48 overflow-y-auto"
                    >
                      <button
                        onClick={() => handleYearChange('All')}
                        className={cn(
                          'w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg',
                          filters.year === 'All' && 'bg-accent/10 text-accent'
                        )}
                      >
                        All Years
                      </button>
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearChange(year)}
                          className={cn(
                            'w-full text-left px-4 py-2 hover:bg-gray-50 last:rounded-b-lg',
                            filters.year === year && 'bg-accent/10 text-accent'
                          )}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white text-gray-700 border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <span>Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}</span>
                  <HiChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'sort' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={cn(
                            'w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg',
                            filters.sortBy === option.value && 'bg-accent/10 text-accent'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {totalResults} {totalResults === 1 ? 'project' : 'projects'}
            </div>
          </div>

          {/* Mobile Filter Bar */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between space-x-4">
              {/* Search */}
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                {searchValue && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <HiX size={14} />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                  hasActiveFilters
                    ? 'bg-accent text-black border-accent'
                    : 'bg-white text-gray-700 border-gray-300'
                )}
              >
                <HiFilter size={16} />
                <span>Filter</span>
              </button>
            </div>

            {/* Results */}
            <div className="mt-2 text-sm text-gray-600">
              {totalResults} {totalResults === 1 ? 'project' : 'projects'}
            </div>

            {/* Mobile Filter Panel */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 border-t border-gray-200 pt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleCategoryChange(e.target.value as FilterOptions['category'])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <select
                        value={filters.year}
                        onChange={(e) => handleYearChange(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      >
                        <option value="All">All Years</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                      Clear All Filters
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}