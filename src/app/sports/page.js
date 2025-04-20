'use client';

import { useState } from 'react';
import WorkoutDetails from './components/WorkoutDetails';
import Link from 'next/link';

const sports = [
  { id: 'soccer', name: 'Soccer (Football)', icon: '⚽', description: 'Improve your soccer skills with specialized training plans' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', description: 'Enhance your basketball performance with targeted workouts' },
  { id: 'football', name: 'American Football', icon: '🏈', description: 'Build strength and agility for football performance' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', description: 'Develop speed and precision for tennis excellence' },
  { id: 'boxing', name: 'Boxing', icon: '🥊', description: 'Train like a champion with boxing-specific workouts' },
  { id: 'track', name: 'Track & Field', icon: '🏃', description: 'Improve your running and jumping abilities' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', description: 'Enhance your volleyball skills with specialized drills' },
  { id: 'hockey', name: 'Ice Hockey', icon: '🏒', description: 'Build endurance and power for hockey performance' },
  { id: 'swimming', name: 'Swimming', icon: '🏊', description: 'Improve your swimming technique and endurance' },
  { id: 'climbing', name: 'Rock Climbing', icon: '🧗', description: 'Develop strength and technique for climbing' }
];

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSports, setFilteredSports] = useState(sports);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredSports(sports);
    } else {
      const filtered = sports.filter(sport => 
        sport.name.toLowerCase().includes(term.toLowerCase()) ||
        sport.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSports(filtered);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Sports & Activities</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search sports..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg pl-10"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>
      
      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSports.map((sport) => (
          <div
            key={sport.id}
            className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all"
          >
            <div className="text-3xl mb-2">{sport.icon}</div>
            <h3 className="text-xl font-bold">{sport.name}</h3>
            <p className="text-gray-400 text-sm mt-2 mb-4">{sport.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSport(sport.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex-1"
              >
                View Training Plan
              </button>
              <Link
                href={`/sports/${sport.id}`}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredSports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No sports found matching your search.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilteredSports(sports);
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Clear Search
          </button>
        </div>
      )}

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