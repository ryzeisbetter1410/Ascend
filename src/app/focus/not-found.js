'use client';

import Link from 'next/link';

export default function FocusNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl text-gray-300 mb-4">Focus Tool Not Found</h2>
          <p className="text-gray-400 mb-8">
            The focus tool or feature you're looking for doesn't exist or is currently unavailable.
          </p>
        </div>
        
        {/* Focus Tools */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-300 mb-4">Focus Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/focus/timer"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-medium">Focus Timer</div>
              <div className="text-sm text-gray-400 mt-2">Pomodoro technique timer</div>
            </Link>
            <Link
              href="/focus/blocker"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🚫</div>
              <div className="font-medium">Website Blocker</div>
              <div className="text-sm text-gray-400 mt-2">Block distracting websites</div>
            </Link>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/focus"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Focus Tools
          </Link>
          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
        
        {/* Focus Tips */}
        <div className="mt-12 text-left bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl text-gray-300 mb-4">Focus Tips</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Set clear goals for each focus session</li>
            <li>• Use the Pomodoro technique for better productivity</li>
            <li>• Eliminate distractions in your environment</li>
            <li>• Take regular breaks to maintain focus</li>
            <li>• Track your focus sessions for improvement</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 