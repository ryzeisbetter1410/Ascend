'use client';

import { useState, useEffect } from 'react';

export default function FocusStats({ stats }) {
  const [localStats, setLocalStats] = useState(stats);

  useEffect(() => {
    setLocalStats(stats);
  }, [stats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-500">{localStats.totalSessions}</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-500">{localStats.averageSessionLength}</div>
          <div className="text-sm text-gray-400">Avg. Minutes</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-500">{localStats.sessionsToday}</div>
          <div className="text-sm text-gray-400">Sessions Today</div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Today's Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">{localStats.sessionsToday}</div>
            <div className="text-sm text-gray-400">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{localStats.totalMinutes}</div>
            <div className="text-sm text-gray-400">Minutes</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">All Time Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Focus Time</span>
            <span className="font-medium">{localStats.totalMinutes} minutes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Average Session</span>
            <span className="font-medium">{localStats.averageSessionLength} minutes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Sessions</span>
            <span className="font-medium">{localStats.totalSessions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Block Time</span>
            <span className="font-medium">{localStats.totalBlockTime} minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
} 