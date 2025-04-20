'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularPages = [
    { name: 'Workouts', path: '/workouts', icon: '💪' },
    { name: 'Focus Mode', path: '/focus', icon: '🎯' },
    { name: 'Sports', path: '/sports', icon: '⚽' },
    { name: 'Growth', path: '/growth', icon: '📈' },
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would search the site
    console.log('Searching for:', searchQuery);
    // For now, just redirect to home with a query
    window.location.href = `/?q=${encodeURIComponent(searchQuery)}`;
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl text-gray-300 mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for something..."
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Popular Pages */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-300 mb-4">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors"
              >
                <div className="text-2xl mb-2">{page.icon}</div>
                <div>{page.name}</div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
        
        {/* Help Section */}
        <div className="mt-12 text-left bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl text-gray-300 mb-4">Need Help?</h3>
          <p className="text-gray-400 mb-4">
            If you believe this is an error, please contact our support team.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/faq"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 