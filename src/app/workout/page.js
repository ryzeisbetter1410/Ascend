'use client';

import { useState } from 'react';

export default function WorkoutPage() {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  const handleStartWorkout = (type) => {
    setActiveWorkout(type);
    setShowProgress(false);
    setShowCreatePlan(false);
  };

  const handleViewProgress = () => {
    setShowProgress(true);
    setActiveWorkout(null);
    setShowCreatePlan(false);
  };

  const handleCreatePlan = () => {
    setShowCreatePlan(true);
    setActiveWorkout(null);
    setShowProgress(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Workout Tracker</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => handleStartWorkout('new')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-center"
        >
          Start New Workout
        </button>
        <button 
          onClick={handleViewProgress}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl text-center"
        >
          View Progress
        </button>
        <button 
          onClick={handleCreatePlan}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-center"
        >
          Create Plan
        </button>
      </div>

      {/* Workout Plans */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Workout Plans</h2>
        <div className="space-y-4">
          {/* Strength Training */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Strength Training</h3>
              <button 
                onClick={() => handleStartWorkout('strength')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
              >
                Start Workout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Push Day</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Bench Press: 4 sets x 8 reps</li>
                  <li>• Shoulder Press: 3 sets x 10 reps</li>
                  <li>• Tricep Extensions: 3 sets x 12 reps</li>
                </ul>
              </div>
              <div className="bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Pull Day</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Pull-ups: 4 sets x 8 reps</li>
                  <li>• Rows: 3 sets x 10 reps</li>
                  <li>• Bicep Curls: 3 sets x 12 reps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cardio */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Cardio</h3>
              <button 
                onClick={() => handleStartWorkout('cardio')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm"
              >
                Start Workout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-2">HIIT</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Sprint Intervals: 10 rounds</li>
                  <li>• Jump Rope: 5 minutes</li>
                  <li>• Burpees: 3 sets x 15 reps</li>
                </ul>
              </div>
              <div className="bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Steady State</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Running: 30 minutes</li>
                  <li>• Cycling: 45 minutes</li>
                  <li>• Swimming: 20 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">12</div>
            <p className="text-gray-400">Workouts This Month</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">5.2</div>
            <p className="text-gray-400">Hours Trained</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">85%</div>
            <p className="text-gray-400">Goal Progress</p>
          </div>
        </div>
      </div>

      {/* Active Workout Modal */}
      {activeWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {activeWorkout === 'new' ? 'New Workout' : 
                 activeWorkout === 'strength' ? 'Strength Training' : 'Cardio Workout'}
              </h2>
              <button
                onClick={() => setActiveWorkout(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">
                {activeWorkout === 'new' ? 'Choose your workout type and duration.' :
                 activeWorkout === 'strength' ? 'Select your strength training exercises and sets.' :
                 'Choose your cardio activity and intensity.'}
              </p>
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Start Session
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Workout Progress</h2>
              <button
                onClick={() => setShowProgress(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">View your workout history and achievements.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">This Month</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Total Workouts: 12</li>
                    <li>• Hours Trained: 5.2</li>
                    <li>• Calories Burned: 3,500</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Achievements</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• 5 Day Streak</li>
                    <li>• New PR: Bench Press</li>
                    <li>• 10K Run Completed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Plan Modal */}
      {showCreatePlan && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create Workout Plan</h2>
              <button
                onClick={() => setShowCreatePlan(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">Design your custom workout plan.</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Plan Details</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Plan Name"
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg"
                    />
                    <select className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg">
                      <option value="">Select Type</option>
                      <option value="strength">Strength Training</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Days per Week"
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                    Create Plan
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 