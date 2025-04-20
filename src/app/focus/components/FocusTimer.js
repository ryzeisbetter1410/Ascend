'use client';

import { useState, useEffect } from 'react';

export default function FocusTimer({ onComplete }) {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [customMinutes, setCustomMinutes] = useState('');
  const [timeLeft, setTimeLeft] = useState(selectedMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            onComplete(selectedMinutes);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft, selectedMinutes, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const handleCustomTime = () => {
    const minutes = parseInt(customMinutes);
    if (minutes > 0) {
      setSelectedMinutes(minutes);
      setTimeLeft(minutes * 60);
      setCustomMinutes('');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Focus Timer</h2>
        <div className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</div>
        <div className="flex justify-center space-x-4 mb-6">
          {[25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setSelectedMinutes(mins);
                setTimeLeft(mins * 60);
              }}
              className={`px-4 py-2 rounded-lg ${
                selectedMinutes === mins
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          <input
            type="number"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            placeholder="Custom minutes"
            className="px-4 py-2 border rounded-lg w-32"
            min="1"
          />
          <button
            onClick={handleCustomTime}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Set
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start
          </button>
        ) : isPaused ? (
          <button
            onClick={handleResume}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Resume
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
} 