'use client';

import { useState } from 'react';

const progressCategories = [
  { id: 'workouts', name: 'Workouts', icon: '💪' },
  { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
  { id: 'focus', name: 'Focus', icon: '🎯' },
  { id: 'habits', name: 'Habits', icon: '📝' }
];

const workoutProgress = [
  { date: '2023-04-01', type: 'Strength', duration: 45, calories: 350 },
  { date: '2023-04-03', type: 'Cardio', duration: 30, calories: 300 },
  { date: '2023-04-05', type: 'Flexibility', duration: 20, calories: 100 },
  { date: '2023-04-07', type: 'Strength', duration: 50, calories: 400 },
  { date: '2023-04-10', type: 'Cardio', duration: 35, calories: 350 },
  { date: '2023-04-12', type: 'Strength', duration: 45, calories: 350 },
  { date: '2023-04-15', type: 'Flexibility', duration: 25, calories: 120 },
  { date: '2023-04-17', type: 'Cardio', duration: 40, calories: 380 },
  { date: '2023-04-20', type: 'Strength', duration: 55, calories: 450 },
  { date: '2023-04-22', type: 'Cardio', duration: 30, calories: 300 }
];

const nutritionProgress = [
  { date: '2023-04-01', calories: 2100, protein: 120, carbs: 250, fats: 70 },
  { date: '2023-04-02', calories: 1950, protein: 110, carbs: 220, fats: 65 },
  { date: '2023-04-03', calories: 2050, protein: 115, carbs: 240, fats: 68 },
  { date: '2023-04-04', calories: 2000, protein: 112, carbs: 230, fats: 67 },
  { date: '2023-04-05', calories: 2150, protein: 125, carbs: 260, fats: 72 },
  { date: '2023-04-06', calories: 1900, protein: 105, carbs: 210, fats: 63 },
  { date: '2023-04-07', calories: 2100, protein: 120, carbs: 250, fats: 70 }
];

const focusProgress = [
  { date: '2023-04-01', sessions: 4, totalMinutes: 120, productivity: 85 },
  { date: '2023-04-02', sessions: 3, totalMinutes: 90, productivity: 80 },
  { date: '2023-04-03', sessions: 5, totalMinutes: 150, productivity: 90 },
  { date: '2023-04-04', sessions: 4, totalMinutes: 120, productivity: 85 },
  { date: '2023-04-05', sessions: 3, totalMinutes: 90, productivity: 80 },
  { date: '2023-04-06', sessions: 6, totalMinutes: 180, productivity: 95 },
  { date: '2023-04-07', sessions: 4, totalMinutes: 120, productivity: 85 }
];

const habitsProgress = [
  { date: '2023-04-01', habits: 5, completed: 4, streak: 7 },
  { date: '2023-04-02', habits: 5, completed: 5, streak: 8 },
  { date: '2023-04-03', habits: 5, completed: 3, streak: 0 },
  { date: '2023-04-04', habits: 5, completed: 4, streak: 1 },
  { date: '2023-04-05', habits: 5, completed: 5, streak: 2 },
  { date: '2023-04-06', habits: 5, completed: 5, streak: 3 },
  { date: '2023-04-07', habits: 5, completed: 4, streak: 0 }
];

export default function ProgressPage() {
  const [activeCategory, setActiveCategory] = useState('workouts');
  const [timeRange, setTimeRange] = useState('week');

  const getProgressData = () => {
    switch (activeCategory) {
      case 'workouts':
        return workoutProgress;
      case 'nutrition':
        return nutritionProgress;
      case 'focus':
        return focusProgress;
      case 'habits':
        return habitsProgress;
      default:
        return [];
    }
  };

  const getProgressStats = () => {
    const data = getProgressData();
    if (data.length === 0) return null;

    switch (activeCategory) {
      case 'workouts':
        const totalDuration = data.reduce((sum, item) => sum + item.duration, 0);
        const totalCalories = data.reduce((sum, item) => sum + item.calories, 0);
        const avgDuration = Math.round(totalDuration / data.length);
        return {
          total: data.length,
          metric1: { label: 'Total Duration', value: `${totalDuration} min` },
          metric2: { label: 'Avg Duration', value: `${avgDuration} min` },
          metric3: { label: 'Calories Burned', value: totalCalories }
        };
      case 'nutrition':
        const avgCalories = Math.round(data.reduce((sum, item) => sum + item.calories, 0) / data.length);
        const avgProtein = Math.round(data.reduce((sum, item) => sum + item.protein, 0) / data.length);
        const avgCarbs = Math.round(data.reduce((sum, item) => sum + item.carbs, 0) / data.length);
        return {
          total: data.length,
          metric1: { label: 'Avg Calories', value: avgCalories },
          metric2: { label: 'Avg Protein', value: `${avgProtein}g` },
          metric3: { label: 'Avg Carbs', value: `${avgCarbs}g` }
        };
      case 'focus':
        const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0);
        const totalMinutes = data.reduce((sum, item) => sum + item.totalMinutes, 0);
        const avgProductivity = Math.round(data.reduce((sum, item) => sum + item.productivity, 0) / data.length);
        return {
          total: data.length,
          metric1: { label: 'Total Sessions', value: totalSessions },
          metric2: { label: 'Total Minutes', value: `${totalMinutes} min` },
          metric3: { label: 'Avg Productivity', value: `${avgProductivity}%` }
        };
      case 'habits':
        const totalHabits = data.reduce((sum, item) => sum + item.habits, 0);
        const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
        const completionRate = Math.round((totalCompleted / totalHabits) * 100);
        const maxStreak = Math.max(...data.map(item => item.streak));
        return {
          total: data.length,
          metric1: { label: 'Completion Rate', value: `${completionRate}%` },
          metric2: { label: 'Max Streak', value: `${maxStreak} days` },
          metric3: { label: 'Total Habits', value: totalHabits }
        };
      default:
        return null;
    }
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Progress Tracker</h1>
      
      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {progressCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Time Range Selector */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'week'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'year'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Year
        </button>
      </div>
      
      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Days</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">{stats.metric1.label}</div>
            <div className="text-2xl font-bold">{stats.metric1.value}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">{stats.metric2.label}</div>
            <div className="text-2xl font-bold">{stats.metric2.value}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">{stats.metric3.label}</div>
            <div className="text-2xl font-bold">{stats.metric3.value}</div>
          </div>
        </div>
      )}
      
      {/* Progress Chart */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4">Progress Over Time</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {getProgressData().map((item, index) => {
            let height;
            let label;
            
            switch (activeCategory) {
              case 'workouts':
                height = `${(item.duration / 60) * 100}%`;
                label = item.type;
                break;
              case 'nutrition':
                height = `${(item.calories / 2500) * 100}%`;
                label = item.date.split('-')[2];
                break;
              case 'focus':
                height = `${item.productivity}%`;
                label = item.date.split('-')[2];
                break;
              case 'habits':
                height = `${(item.completed / item.habits) * 100}%`;
                label = item.date.split('-')[2];
                break;
              default:
                height = '0%';
                label = '';
            }
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-500"
                  style={{ height }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Detailed Progress */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Detailed Progress</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 text-gray-400">Date</th>
                {activeCategory === 'workouts' && (
                  <>
                    <th className="pb-2 text-gray-400">Type</th>
                    <th className="pb-2 text-gray-400">Duration</th>
                    <th className="pb-2 text-gray-400">Calories</th>
                  </>
                )}
                {activeCategory === 'nutrition' && (
                  <>
                    <th className="pb-2 text-gray-400">Calories</th>
                    <th className="pb-2 text-gray-400">Protein</th>
                    <th className="pb-2 text-gray-400">Carbs</th>
                    <th className="pb-2 text-gray-400">Fats</th>
                  </>
                )}
                {activeCategory === 'focus' && (
                  <>
                    <th className="pb-2 text-gray-400">Sessions</th>
                    <th className="pb-2 text-gray-400">Minutes</th>
                    <th className="pb-2 text-gray-400">Productivity</th>
                  </>
                )}
                {activeCategory === 'habits' && (
                  <>
                    <th className="pb-2 text-gray-400">Habits</th>
                    <th className="pb-2 text-gray-400">Completed</th>
                    <th className="pb-2 text-gray-400">Streak</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {getProgressData().map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">{item.date}</td>
                  {activeCategory === 'workouts' && (
                    <>
                      <td>{item.type}</td>
                      <td>{item.duration} min</td>
                      <td>{item.calories}</td>
                    </>
                  )}
                  {activeCategory === 'nutrition' && (
                    <>
                      <td>{item.calories}</td>
                      <td>{item.protein}g</td>
                      <td>{item.carbs}g</td>
                      <td>{item.fats}g</td>
                    </>
                  )}
                  {activeCategory === 'focus' && (
                    <>
                      <td>{item.sessions}</td>
                      <td>{item.totalMinutes}</td>
                      <td>{item.productivity}%</td>
                    </>
                  )}
                  {activeCategory === 'habits' && (
                    <>
                      <td>{item.habits}</td>
                      <td>{item.completed}</td>
                      <td>{item.streak} days</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 