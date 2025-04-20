'use client';

import { useState, useEffect } from 'react';

export default function GrowthPage() {
  const [habits, setHabits] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedHabits = localStorage.getItem('habits');
      return savedHabits ? JSON.parse(savedHabits) : [
        { id: 1, name: 'Morning Exercise', completed: false, streak: 0 },
        { id: 2, name: 'Read 30 minutes', completed: false, streak: 0 },
        { id: 3, name: 'Meditate', completed: false, streak: 0 },
        { id: 4, name: 'Drink Water', completed: false, streak: 0 },
      ];
    }
    return [];
  });

  const [shortTermGoals, setShortTermGoals] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('shortTermGoals');
      return savedGoals ? JSON.parse(savedGoals) : [];
    }
    return [];
  });

  const [longTermGoals, setLongTermGoals] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('longTermGoals');
      return savedGoals ? JSON.parse(savedGoals) : [];
    }
    return [];
  });

  const [newShortTermGoal, setNewShortTermGoal] = useState('');
  const [newLongTermGoal, setNewLongTermGoal] = useState('');
  const [showShortTermForm, setShowShortTermForm] = useState(false);
  const [showLongTermForm, setShowLongTermForm] = useState(false);

  // Save habits and goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('shortTermGoals', JSON.stringify(shortTermGoals));
  }, [shortTermGoals]);

  useEffect(() => {
    localStorage.setItem('longTermGoals', JSON.stringify(longTermGoals));
  }, [longTermGoals]);

  // Reset habits at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow - now;

    const resetHabits = () => {
      setHabits(prevHabits => 
        prevHabits.map(habit => ({
          ...habit,
          completed: false
        }))
      );
    };

    const timer = setTimeout(resetHabits, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const toggleHabit = (habitId) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? {
              ...habit,
              completed: !habit.completed,
              streak: !habit.completed ? habit.streak + 1 : habit.streak
            }
          : habit
      )
    );
  };

  const addShortTermGoal = (e) => {
    e.preventDefault();
    if (newShortTermGoal.trim()) {
      setShortTermGoals(prev => [
        ...prev,
        {
          id: Date.now(),
          text: newShortTermGoal,
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]);
      setNewShortTermGoal('');
      setShowShortTermForm(false);
    }
  };

  const addLongTermGoal = (e) => {
    e.preventDefault();
    if (newLongTermGoal.trim()) {
      setLongTermGoals(prev => [
        ...prev,
        {
          id: Date.now(),
          text: newLongTermGoal,
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]);
      setNewLongTermGoal('');
      setShowLongTermForm(false);
    }
  };

  const toggleGoal = (goalId, isLongTerm) => {
    if (isLongTerm) {
      setLongTermGoals(prev =>
        prev.map(goal =>
          goal.id === goalId
            ? { ...goal, completed: !goal.completed }
            : goal
        )
      );
    } else {
      setShortTermGoals(prev =>
        prev.map(goal =>
          goal.id === goalId
            ? { ...goal, completed: !goal.completed }
            : goal
        )
      );
    }
  };

  const removeGoal = (goalId, isLongTerm) => {
    if (isLongTerm) {
      setLongTermGoals(prev => prev.filter(goal => goal.id !== goalId));
    } else {
      setShortTermGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Personal Growth</h1>

      {/* Daily Habits */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Daily Habits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map(habit => (
            <div
              key={habit.id}
              className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    habit.completed
                      ? 'bg-green-500 border-green-600'
                      : 'border-gray-500'
                  }`}
                >
                  {habit.completed && '✓'}
                </button>
                <span className={habit.completed ? 'line-through text-gray-400' : ''}>
                  {habit.name}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Streak: {habit.streak} days
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Short Term Goals */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Short Term Goals</h2>
          <button
            onClick={() => setShowShortTermForm(!showShortTermForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showShortTermForm ? 'Cancel' : 'Add Goal'}
          </button>
        </div>

        {showShortTermForm && (
          <form onSubmit={addShortTermGoal} className="mb-4">
            <input
              type="text"
              value={newShortTermGoal}
              onChange={(e) => setNewShortTermGoal(e.target.value)}
              placeholder="Enter your short term goal"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-2"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Save Goal
            </button>
          </form>
        )}

        <div className="space-y-2">
          {shortTermGoals.map(goal => (
            <div
              key={goal.id}
              className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleGoal(goal.id, false)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    goal.completed
                      ? 'bg-green-500 border-green-600'
                      : 'border-gray-500'
                  }`}
                >
                  {goal.completed && '✓'}
                </button>
                <span className={goal.completed ? 'line-through text-gray-400' : ''}>
                  {goal.text}
                </span>
              </div>
              <button
                onClick={() => removeGoal(goal.id, false)}
                className="text-red-500 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Long Term Goals */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Long Term Goals</h2>
          <button
            onClick={() => setShowLongTermForm(!showLongTermForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showLongTermForm ? 'Cancel' : 'Add Goal'}
          </button>
        </div>

        {showLongTermForm && (
          <form onSubmit={addLongTermGoal} className="mb-4">
            <input
              type="text"
              value={newLongTermGoal}
              onChange={(e) => setNewLongTermGoal(e.target.value)}
              placeholder="Enter your long term goal"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-2"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Save Goal
            </button>
          </form>
        )}

        <div className="space-y-2">
          {longTermGoals.map(goal => (
            <div
              key={goal.id}
              className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleGoal(goal.id, true)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    goal.completed
                      ? 'bg-green-500 border-green-600'
                      : 'border-gray-500'
                  }`}
                >
                  {goal.completed && '✓'}
                </button>
                <span className={goal.completed ? 'line-through text-gray-400' : ''}>
                  {goal.text}
                </span>
              </div>
              <button
                onClick={() => removeGoal(goal.id, true)}
                className="text-red-500 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 