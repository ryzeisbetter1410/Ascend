'use client';

import Link from 'next/link';

export default function GrowthNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl text-gray-300 mb-4">Growth Tool Not Found</h2>
          <p className="text-gray-400 mb-8">
            The growth tool or feature you're looking for doesn't exist or is currently unavailable.
          </p>
        </div>
        
        {/* Growth Tools */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-300 mb-4">Growth Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/growth/habits"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-medium">Habit Tracker</div>
              <div className="text-sm text-gray-400 mt-2">Track and build new habits</div>
            </Link>
            <Link
              href="/growth/goals"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-medium">Goal Setting</div>
              <div className="text-sm text-gray-400 mt-2">Set and track your goals</div>
            </Link>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/growth"
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Growth Tools
          </Link>
          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
        
        {/* Growth Tips */}
        <div className="mt-12 text-left bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl text-gray-300 mb-4">Growth Tips</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Start small and build consistency</li>
            <li>• Set SMART goals for better achievement</li>
            <li>• Track your progress regularly</li>
            <li>• Celebrate small wins along the way</li>
            <li>• Stay accountable with daily check-ins</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 