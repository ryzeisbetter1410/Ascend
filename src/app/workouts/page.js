'use client';

import { useState } from 'react';
import WorkoutDetails from './components/WorkoutDetails';

const categories = [
  { id: 'all', name: 'All', icon: '🏋️' },
  { id: 'strength', name: 'Strength', icon: '💪' },
  { id: 'cardio', name: 'Cardio', icon: '🏃' },
  { id: 'flexibility', name: 'Flexibility', icon: '🧘' },
  { id: 'sports', name: 'Sports', icon: '⚽' }
];

const generalWorkouts = [
  {
    id: 1,
    title: 'Full Body Strength',
    category: 'strength',
    duration: '45 min',
    difficulty: 'Intermediate',
    image: '/workouts/strength.jpg'
  },
  {
    id: 2,
    title: 'HIIT Cardio',
    category: 'cardio',
    duration: '30 min',
    difficulty: 'Advanced',
    image: '/workouts/cardio.jpg'
  },
  {
    id: 3,
    title: 'Yoga Flow',
    category: 'flexibility',
    duration: '60 min',
    difficulty: 'Beginner',
    image: '/workouts/yoga.jpg'
  }
];

const sportsWorkouts = [
  {
    id: 'soccer',
    title: 'Soccer Training',
    category: 'sports',
    icon: '⚽',
    duration: '60 min',
    difficulty: 'Intermediate'
  },
  {
    id: 'basketball',
    title: 'Basketball Training',
    category: 'sports',
    icon: '🏀',
    duration: '60 min',
    difficulty: 'Intermediate'
  },
  {
    id: 'tennis',
    title: 'Tennis Training',
    category: 'sports',
    icon: '🎾',
    duration: '45 min',
    difficulty: 'Intermediate'
  },
  {
    id: 'swimming',
    title: 'Swimming Training',
    category: 'sports',
    icon: '🏊',
    duration: '45 min',
    difficulty: 'Advanced'
  },
  {
    id: 'volleyball',
    title: 'Volleyball Training',
    category: 'sports',
    icon: '🏐',
    duration: '60 min',
    difficulty: 'Intermediate'
  }
];

const allWorkouts = [...generalWorkouts, ...sportsWorkouts];

export default function WorkoutsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSport, setSelectedSport] = useState(null);

  const filteredWorkouts = allWorkouts.filter(workout => 
    activeCategory === 'all' || workout.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
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

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map(workout => (
          <div
            key={workout.id}
            className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform"
          >
            {workout.image ? (
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-6xl">
                {workout.icon}
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>{workout.duration}</span>
                <span>•</span>
                <span>{workout.difficulty}</span>
              </div>
              <button
                onClick={() => workout.category === 'sports' ? setSelectedSport(workout.id) : null}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                {workout.category === 'sports' ? 'View Training Plan' : 'Start Workout'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Details Modal */}
      {selectedSport && (
        <WorkoutDetails
          sport={selectedSport}
          onClose={() => setSelectedSport(null)}
        />
      )}
    </div>
  );
} 