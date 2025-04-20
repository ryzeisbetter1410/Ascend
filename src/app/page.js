'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showFeatureDetails, setShowFeatureDetails] = useState(null);

  const handleFeatureClick = (feature) => {
    if (showFeatureDetails === feature) {
      setShowFeatureDetails(null);
    } else {
      setShowFeatureDetails(feature);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Ascent</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your all-in-one platform for personal growth, fitness, and productivity.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/workouts" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link 
              href="#features" 
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleFeatureClick('workouts')}
          >
            <div className="text-3xl mb-4">💪</div>
            <h3 className="text-xl font-bold mb-2">Personalized Workouts</h3>
            <p className="text-gray-400">
              Get customized workout plans tailored to your fitness goals and experience level.
            </p>
            {showFeatureDetails === 'workouts' && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300 mb-4">
                  Our AI-powered system creates workout plans that adapt to your progress and preferences.
                </p>
                <Link 
                  href="/workouts" 
                  className="text-blue-400 hover:text-blue-300"
                >
                  Explore Workouts →
                </Link>
              </div>
            )}
          </div>

          {/* Feature 2 */}
          <div 
            className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleFeatureClick('focus')}
          >
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Focus Tools</h3>
            <p className="text-gray-400">
              Stay productive with our Pomodoro timer and website blocker.
            </p>
            {showFeatureDetails === 'focus' && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300 mb-4">
                  Boost your productivity with customizable focus sessions and distraction blocking.
                </p>
                <Link 
                  href="/focus" 
                  className="text-blue-400 hover:text-blue-300"
                >
                  Try Focus Tools →
                </Link>
              </div>
            )}
          </div>

          {/* Feature 3 */}
          <div 
            className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleFeatureClick('growth')}
          >
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2">Personal Growth</h3>
            <p className="text-gray-400">
              Track habits, set goals, and monitor your progress over time.
            </p>
            {showFeatureDetails === 'growth' && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300 mb-4">
                  Build better habits and achieve your goals with our comprehensive tracking tools.
                </p>
                <Link 
                  href="/growth" 
                  className="text-blue-400 hover:text-blue-300"
                >
                  Start Growing →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already achieving their goals with Ascent.
          </p>
          <Link 
            href="/signin" 
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
