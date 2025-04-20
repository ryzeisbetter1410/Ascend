'use client';

import Link from 'next/link';

export default function SportsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl text-gray-300 mb-4">Sport Not Found</h2>
          <p className="text-gray-400 mb-8">
            The sport or training plan you're looking for doesn't exist or is currently unavailable.
          </p>
        </div>
        
        {/* Popular Sports */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-300 mb-4">Popular Sports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/sports/soccer"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">⚽</div>
              <div className="font-medium">Soccer</div>
              <div className="text-sm text-gray-400 mt-2">Training plans and drills</div>
            </Link>
            <Link
              href="/sports/basketball"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🏀</div>
              <div className="font-medium">Basketball</div>
              <div className="text-sm text-gray-400 mt-2">Skills and conditioning</div>
            </Link>
            <Link
              href="/sports/tennis"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🎾</div>
              <div className="font-medium">Tennis</div>
              <div className="text-sm text-gray-400 mt-2">Technique and strategy</div>
            </Link>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sports"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Sports
          </Link>
          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
        
        {/* Training Tips */}
        <div className="mt-12 text-left bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl text-gray-300 mb-4">Training Tips</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Maintain consistent training schedule</li>
            <li>• Focus on proper technique and form</li>
            <li>• Include both skill work and conditioning</li>
            <li>• Get adequate rest and recovery</li>
            <li>• Stay motivated by setting goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 