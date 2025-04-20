'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FocusStatsPage() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    averageSessionLength: 0,
    sessionsToday: 0,
    totalBlockTime: 0,
    weeklyData: [
      { day: 'Mon', sessions: 0, minutes: 0 },
      { day: 'Tue', sessions: 0, minutes: 0 },
      { day: 'Wed', sessions: 0, minutes: 0 },
      { day: 'Thu', sessions: 0, minutes: 0 },
      { day: 'Fri', sessions: 0, minutes: 0 },
      { day: 'Sat', sessions: 0, minutes: 0 },
      { day: 'Sun', sessions: 0, minutes: 0 },
    ]
  });

  useEffect(() => {
    // Load stats from localStorage if available
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('focusStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Focus Statistics</h1>
          <Link 
            href="/focus" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Focus
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.totalSessions}</div>
            <div className="text-gray-400">Total Sessions</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-500">{stats.totalMinutes}</div>
            <div className="text-gray-400">Total Minutes</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.averageSessionLength}</div>
            <div className="text-gray-400">Avg. Minutes</div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Weekly Activity</h2>
          <div className="h-64 flex items-end justify-between">
            {stats.weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-12 bg-blue-600 rounded-t-lg" 
                  style={{ height: `${Math.max(5, (day.minutes / 60) * 100)}%` }}
                ></div>
                <div className="mt-2 text-gray-400">{day.day}</div>
                <div className="text-sm text-gray-500">{day.sessions} sessions</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Today's Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sessions</span>
                <span className="text-xl font-medium">{stats.sessionsToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Minutes Focused</span>
                <span className="text-xl font-medium">{stats.totalMinutes}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Website Blocking</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Block Time</span>
                <span className="text-xl font-medium">{stats.totalBlockTime} minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Block Duration</span>
                <span className="text-xl font-medium">
                  {stats.totalBlockTime > 0 ? Math.round(stats.totalBlockTime / stats.totalSessions) : 0} minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 