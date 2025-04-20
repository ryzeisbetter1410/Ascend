'use client';

import Link from 'next/link';

export default function WorkoutsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl text-gray-300 mb-4">Workout Not Found</h2>
          <p className="text-gray-400 mb-8">
            The workout you're looking for doesn't exist or is currently unavailable.
          </p>
        </div>
        
        {/* Workout Categories */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-300 mb-4">Browse Workout Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/workouts/strength"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">💪</div>
              <div className="font-medium">Strength Training</div>
              <div className="text-sm text-gray-400 mt-2">Build muscle and increase power</div>
            </Link>
            <Link
              href="/workouts/cardio"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🏃</div>
              <div className="font-medium">Cardio</div>
              <div className="text-sm text-gray-400 mt-2">Improve endurance and burn calories</div>
            </Link>
            <Link
              href="/workouts/flexibility"
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">🧘</div>
              <div className="font-medium">Flexibility</div>
              <div className="text-sm text-gray-400 mt-2">Enhance mobility and reduce injury risk</div>
            </Link>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/workouts"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Workouts
          </Link>
          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
        
        {/* Tips Section */}
        <div className="mt-12 text-left bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl text-gray-300 mb-4">Workout Tips</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Start with a proper warm-up to prevent injuries</li>
            <li>• Focus on form over weight or repetitions</li>
            <li>• Stay hydrated throughout your workout</li>
            <li>• Listen to your body and rest when needed</li>
            <li>• Track your progress to stay motivated</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 