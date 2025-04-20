import { useState } from 'react';

const workoutPlans = {
  soccer: {
    name: "Soccer (Football)",
    icon: "⚽",
    schedule: {
      monday: {
        title: "Speed & Agility",
        exercises: [
          "40m Sprints: 6x",
          "Agility Ladder: 3 rounds",
          "Cone Dribbling: 5 mins",
          "Planks: 3 x 1 min"
        ]
      },
      tuesday: {
        title: "Leg Strength",
        exercises: [
          "Squats: 4 x 8",
          "Lunges: 3 x 12/leg",
          "Nordic curls: 3 x 6",
          "Calf Raises: 3 x 20"
        ]
      },
      wednesday: {
        title: "Ball Control + Endurance",
        exercises: [
          "Passing Drills: 10 mins",
          "Juggling: 3 x 3 min",
          "3 km Run at 70% pace",
          "Core circuit: 3 rounds"
        ]
      },
      thursday: {
        title: "Plyos + Sprint Intervals",
        exercises: [
          "Depth Jumps: 3 x 6",
          "Jump Lunges: 3 x 10",
          "20m sprints: 5x",
          "10m shuttle drills: 5x"
        ]
      },
      friday: {
        title: "Upper Body + Core",
        exercises: [
          "Push-ups: 4 x 20",
          "Pull-ups: 3 x 8",
          "Plank Walkouts: 3 x 10",
          "Russian Twists: 3 x 20"
        ]
      },
      saturday: {
        title: "Scrimmage or Game Simulation",
        exercises: [
          "Full match or 5v5",
          "Track stats (passes, shots, etc.)"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "20-min Stretching",
          "Foam rolling: 10 min",
          "Optional light swim or walk"
        ]
      }
    }
  },
  basketball: {
    name: "Basketball",
    icon: "🏀",
    schedule: {
      monday: {
        title: "Explosiveness",
        exercises: [
          "Box Jumps: 4 x 5",
          "Jump Squats: 3 x 10",
          "Med Ball Slams: 3 x 12",
          "Tuck Jumps: 3 x 10"
        ]
      },
      tuesday: {
        title: "Strength (Full Body)",
        exercises: [
          "Deadlifts: 4 x 5",
          "Bench Press: 4 x 6",
          "Pull-ups: 3 x 10",
          "Plank: 3 x 1 min"
        ]
      },
      wednesday: {
        title: "Ball Handling + Shooting",
        exercises: [
          "Cone Dribbling: 4 x 1 min",
          "Free Throws: 3 x 10",
          "Shooting Drills: 5 spots x 10 shots",
          "Layup Variations: 5 min per side"
        ]
      },
      thursday: {
        title: "Conditioning",
        exercises: [
          "Sprint Intervals: 10 x 30m",
          "Defensive Slides: 3 x 30s",
          "Jump Rope: 5 x 1 min",
          "Suicides: 3 rounds"
        ]
      },
      friday: {
        title: "Upper Body Focus",
        exercises: [
          "Push-ups: 4 x 25",
          "Dumbbell Press: 4 x 8",
          "Rows: 4 x 10",
          "Hanging Knee Raises: 3 x 12"
        ]
      },
      saturday: {
        title: "Scrimmage + Analysis",
        exercises: [
          "5v5 or 1v1",
          "Watch game film: 30 min"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Foam Roll + Stretch",
          "Light shootaround",
          "Hydration focus"
        ]
      }
    }
  },
  // ... other sports workout plans
};

export default function WorkoutDetails({ sport, onClose }) {
  const [selectedDay, setSelectedDay] = useState('monday');
  const workout = workoutPlans[sport];

  if (!workout) return null;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{workout.icon}</span>
            <h2 className="text-2xl font-bold">{workout.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Day Selection */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1, 3)}
            </button>
          ))}
        </div>

        {/* Workout Content */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">{workout.schedule[selectedDay].title}</h3>
          <ul className="space-y-3">
            {workout.schedule[selectedDay].exercises.map((exercise, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-blue-400">•</span>
                <span>{exercise}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
            Start Workout
          </button>
          <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
            Save to Calendar
          </button>
        </div>
      </div>
    </div>
  );
} 