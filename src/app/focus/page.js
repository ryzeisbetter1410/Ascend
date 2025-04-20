'use client';

import { useState } from 'react';
import FocusTimer from './components/FocusTimer';
import WebsiteBlocker from './components/WebsiteBlocker';
import FocusStats from './components/FocusStats';
import Link from 'next/link';

export default function FocusPage() {
  const [activeTab, setActiveTab] = useState('timer'); // 'timer' or 'blocker'
  const [showStats, setShowStats] = useState(false);
  const [focusStats, setFocusStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    averageSessionLength: 0,
    sessionsToday: 0,
    totalBlockTime: 0
  });

  const handleTimerComplete = (minutes) => {
    setFocusStats(prev => {
      const newStats = {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + minutes,
        averageSessionLength: Math.round((prev.totalMinutes + minutes) / (prev.totalSessions + 1)),
        sessionsToday: prev.sessionsToday + 1
      };
      return newStats;
    });
  };

  const handleBlockTimeUpdate = (minutes) => {
    setFocusStats(prev => ({
      ...prev,
      totalBlockTime: minutes
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Focus Mode</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Focus Timer</h2>
            <p className="text-gray-700 mb-4">
              Use our focus timer to stay productive. Set custom durations or use preset times.
            </p>
            <Link 
              href="/focus/timer" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Timer
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Website Blocker</h2>
            <p className="text-gray-700 mb-4">
              Block distracting websites and stay focused on your tasks.
            </p>
            <Link 
              href="/focus/blocker" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Blocked Sites
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">VPN Service</h2>
            <p className="text-gray-700 mb-4">
              Protect your privacy and secure your connection while browsing.
            </p>
            <Link 
              href="/focus/vpn" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect VPN
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Focus Stats</h2>
            <p className="text-gray-700 mb-4">
              Track your focus sessions and monitor your productivity.
            </p>
            <button 
              onClick={() => setShowStats(!showStats)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showStats 
                  ? 'bg-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {showStats ? 'Hide Stats' : 'View Stats'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl p-6">
          {showStats ? (
            <FocusStats stats={focusStats} />
          ) : (
            activeTab === 'timer' ? (
              <FocusTimer onComplete={handleTimerComplete} />
            ) : (
              <WebsiteBlocker onBlockTimeUpdate={handleBlockTimeUpdate} />
            )
          )}
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="mt-8 bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Your Focus Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-400">24</div>
                <div className="text-gray-300">Total Sessions</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-400">12.5</div>
                <div className="text-gray-300">Avg. Session (min)</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-400">5</div>
                <div className="text-gray-300">Sessions Today</div>
              </div>
            </div>
            <div className="flex justify-end">
              <Link 
                href="/focus/stats" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                View Detailed Stats
              </Link>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Focus Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">🎯 Set Clear Goals</h3>
              <p className="text-gray-300 text-sm">
                Before starting a focus session, define what you want to accomplish. Break down large tasks into smaller, manageable chunks.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">⏰ Use the Pomodoro Technique</h3>
              <p className="text-gray-300 text-sm">
                Work in focused 25-minute intervals followed by short breaks. This helps maintain high levels of concentration.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">🌿 Create a Distraction-Free Environment</h3>
              <p className="text-gray-300 text-sm">
                Use the website blocker to prevent digital distractions. Keep your workspace clean and organized.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📝 Track Your Progress</h3>
              <p className="text-gray-300 text-sm">
                Monitor your focus sessions and identify patterns. Use this data to optimize your productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 