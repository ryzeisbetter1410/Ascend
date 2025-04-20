'use client';

import { useState, useEffect } from 'react';

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
  football: {
    name: "American Football",
    icon: "🏈",
    schedule: {
      monday: {
        title: "Upper Body Strength",
        exercises: [
          "Bench Press: 5 x 5",
          "Dumbbell Rows: 4 x 10",
          "Overhead Press: 4 x 8",
          "Chin-ups: 3 x 8"
        ]
      },
      tuesday: {
        title: "Speed & Agility",
        exercises: [
          "20m Sprints: 5x",
          "40m Sprints: 4x",
          "Ladder Drills: 3 rounds",
          "Cone Cuts: 3 x 10"
        ]
      },
      wednesday: {
        title: "Lower Body Strength",
        exercises: [
          "Power Cleans: 4 x 3",
          "Squats: 5 x 5",
          "Romanian Deadlifts: 3 x 10",
          "Walking Lunges: 3 x 12/leg"
        ]
      },
      thursday: {
        title: "Plyometrics",
        exercises: [
          "Depth Jumps: 3 x 6",
          "Broad Jumps: 3 x 6",
          "Sprint Starts: 5 x 10m",
          "Med Ball Toss: 3 x 10"
        ]
      },
      friday: {
        title: "Core + Conditioning",
        exercises: [
          "Russian Twists: 3 x 20",
          "Cable Rotations: 3 x 15/side",
          "Sled Pushes: 4 x 20m",
          "Stair Sprints: 5 rounds"
        ]
      },
      saturday: {
        title: "Position Drills + Strategy",
        exercises: [
          "Route running / blocking",
          "Play recognition",
          "7v7 or film study"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Ice bath / contrast shower",
          "Mobility: 20 min",
          "Deep breathing: 10 min"
        ]
      }
    }
  },
  tennis: {
    name: "Tennis",
    icon: "🎾",
    schedule: {
      monday: {
        title: "Court Drills",
        exercises: [
          "Serve Practice: 5 x 10",
          "Forehand/Backhand: 3 x 5 min",
          "Footwork Cones: 4 x 30s",
          "Jog: 10 min"
        ]
      },
      tuesday: {
        title: "Core & Rotation",
        exercises: [
          "Cable Woodchoppers: 3 x 15",
          "Med Ball Slams: 3 x 12",
          "Planks: 3 x 1 min",
          "Reverse Crunches: 3 x 15"
        ]
      },
      wednesday: {
        title: "Conditioning",
        exercises: [
          "Jump Rope: 4 x 1 min",
          "400m Runs: 3x",
          "Light match: 30 min",
          "Stretch: 10 min"
        ]
      },
      thursday: {
        title: "Upper Body Strength",
        exercises: [
          "Incline Press: 4 x 10",
          "Rows: 4 x 10",
          "Face Pulls: 3 x 15",
          "Shoulder Rotations: 3 x 12"
        ]
      },
      friday: {
        title: "Agility + Reaction",
        exercises: [
          "Reaction Ball: 4 x 30s",
          "Ladder Drills: 3 x 30s",
          "Sprint Cuts: 5 x 10m",
          "Toss Catch: 3 x 1 min"
        ]
      },
      saturday: {
        title: "Full Match",
        exercises: [
          "Singles game",
          "Analyze technique"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Light swim/walk",
          "Yoga: 20 min",
          "Massage/Foam roll"
        ]
      }
    }
  },
  boxing: {
    name: "Boxing",
    icon: "🥊",
    schedule: {
      monday: {
        title: "Technique + Cardio",
        exercises: [
          "Jump Rope: 3 x 2 min",
          "Shadowboxing: 3 x 3 min",
          "Heavy Bag: 5 x 2 min",
          "Core Circuit: 3 rounds"
        ]
      },
      tuesday: {
        title: "Upper Body Strength",
        exercises: [
          "Bench Press: 4 x 6",
          "Pull-ups: 3 x 8",
          "Dips: 3 x 12",
          "Landmine Punches: 3 x 10"
        ]
      },
      wednesday: {
        title: "Footwork + Mobility",
        exercises: [
          "Ladder Drills: 3 x",
          "Circle Cone Drill: 3 x 30s",
          "Head Movement: 5 mins",
          "Stretch: 15 min"
        ]
      },
      thursday: {
        title: "Conditioning",
        exercises: [
          "Bag Rounds: 6 x 2 min",
          "Burpees: 3 x 15",
          "Sled Pushes: 5 x 20m",
          "Jumping Jacks: 3 x 100"
        ]
      },
      friday: {
        title: "Core & Rotation",
        exercises: [
          "Russian Twists: 3 x 25",
          "Leg Raises: 3 x 12",
          "Side Planks: 3 x 30s/side",
          "Mountain Climbers: 3 x 30s"
        ]
      },
      saturday: {
        title: "Sparring",
        exercises: [
          "Light Sparring: 4–6 rounds",
          "Focus Mitts: 4 rounds",
          "Strategy Review"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Ice bath/massage",
          "Walk/cycle: 30 min",
          "Neck stretch"
        ]
      }
    }
  },
  track: {
    name: "Track & Field (Sprinter)",
    icon: "🏃",
    schedule: {
      monday: {
        title: "Acceleration",
        exercises: [
          "Sprint Starts: 6 x 10m",
          "Flying Sprints: 4 x 20m",
          "A/B skips: 3 x 20m",
          "Bounds: 3 x 20m"
        ]
      },
      tuesday: {
        title: "Power Lifting",
        exercises: [
          "Cleans: 4 x 3",
          "Squats: 4 x 6",
          "Split Squats: 3 x 10",
          "Box Jumps: 3 x 6"
        ]
      },
      wednesday: {
        title: "Technique & Mobility",
        exercises: [
          "Sprint Form: 3 x 20m",
          "Hip Mobility: 15 min",
          "Tempo Run: 4 x 100m",
          "Foam roll/stretch"
        ]
      },
      thursday: {
        title: "Plyos & Starts",
        exercises: [
          "Depth Jumps: 3 x 6",
          "Hops: 3 x 10/leg",
          "Sprint Starts: 4 x 20m",
          "Med Ball Throws: 3 x 10"
        ]
      },
      friday: {
        title: "Core + Conditioning",
        exercises: [
          "Planks: 3 x 1 min",
          "Bicycle Crunches: 3 x 20",
          "Sled Drags: 3 x 20m",
          "3 x 200m (70%)"
        ]
      },
      saturday: {
        title: "Sprint Day",
        exercises: [
          "60m sprints: 4 x",
          "Flying 30s: 3 x",
          "Top speed drills"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Cold Therapy",
          "Stretching/Massage",
          "Breathing Exercises"
        ]
      }
    }
  },
  volleyball: {
    name: "Volleyball",
    icon: "🏐",
    schedule: {
      monday: {
        title: "Jump Training",
        exercises: [
          "Box Jumps: 4 x 5",
          "Depth Jumps: 3 x 6",
          "Seated Jumps: 3 x 6",
          "Jump Rope: 4 x 1 min"
        ]
      },
      tuesday: {
        title: "Upper Body Power",
        exercises: [
          "Push Press: 4 x 5",
          "Dumbbell Press: 3 x 8",
          "Pull-ups: 3 x 10",
          "Core Circuit: 3 rounds"
        ]
      },
      wednesday: {
        title: "Skill Drills",
        exercises: [
          "Serving: 5 x 10",
          "Passing: 3 x 5 min",
          "Blocking: 3 x 10",
          "Setting: 10 min"
        ]
      },
      thursday: {
        title: "Lower Body Strength",
        exercises: [
          "Squats: 4 x 6",
          "RDLs: 3 x 10",
          "Split Squats: 3 x 10",
          "Calf Raises: 3 x 20"
        ]
      },
      friday: {
        title: "Conditioning",
        exercises: [
          "Sprint Intervals: 6 x 30m",
          "Ladder: 3 rounds",
          "Cone Shuffles: 4 x 30s",
          "Bounds: 3 x 12"
        ]
      },
      saturday: {
        title: "Scrimmage",
        exercises: [
          "Full Match",
          "Serve/Pass Drills",
          "Analyze movement"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Stretch: 20 min",
          "Resistance Bands: 10 min",
          "Journaling"
        ]
      }
    }
  },
  hockey: {
    name: "Ice Hockey",
    icon: "🏒",
    schedule: {
      monday: {
        title: "Skating Speed",
        exercises: [
          "Sprint Starts (on ice): 6 x 20m",
          "Crossovers: 3 x 30s",
          "Edge Control: 3 x 30s",
          "Stops/Starts: 4 rounds"
        ]
      },
      tuesday: {
        title: "Upper Body Strength",
        exercises: [
          "Bench Press: 4 x 6",
          "Cable Rows: 4 x 10",
          "Face Pulls: 3 x 15",
          "Core (plank, side plank): 3 rounds"
        ]
      },
      wednesday: {
        title: "Stick Skills + Shooting",
        exercises: [
          "Stickhandling: 10 min",
          "Shooting (wrist, slap, backhand): 5 x 10",
          "Puck Control Drills: 5 min",
          "Reaction Ball: 3 x 1 min"
        ]
      },
      thursday: {
        title: "Lower Body Power",
        exercises: [
          "Deadlifts: 4 x 5",
          "Jump Squats: 3 x 8",
          "Single-leg Step-ups: 3 x 10/leg",
          "Sled Pushes: 3 x 20m"
        ]
      },
      friday: {
        title: "Agility + Core",
        exercises: [
          "Cone Cuts: 3 x 20s",
          "Lateral Bounds: 3 x 12/side",
          "Russian Twists: 3 x 20",
          "Hanging Leg Raises: 3 x 12"
        ]
      },
      saturday: {
        title: "Practice Game",
        exercises: [
          "Match Warm-up",
          "Simulate Game Shifts (3 x 10 min)",
          "Review Footage or Stats"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Foam Rolling: 15 min",
          "Ice Bath or Cold Shower",
          "Light Yoga or Walk"
        ]
      }
    }
  },
  swimming: {
    name: "Swimming",
    icon: "🏊",
    schedule: {
      monday: {
        title: "Sprint Technique",
        exercises: [
          "8 x 25m Sprints (30s rest)",
          "4 x 50m Technique Drills",
          "Kickboard: 4 x 25m",
          "Pull Buoy: 4 x 25m"
        ]
      },
      tuesday: {
        title: "Dryland Strength",
        exercises: [
          "Push-ups: 4 x 20",
          "Pull-ups: 3 x 10",
          "Planks: 3 x 1 min",
          "Bodyweight Squats: 3 x 12"
        ]
      },
      wednesday: {
        title: "Endurance Swim",
        exercises: [
          "6 x 100m at 70%",
          "2 x 200m Steady",
          "Backstroke: 4 x 50m",
          "Light Kick: 4 x 25m"
        ]
      },
      thursday: {
        title: "Core & Mobility",
        exercises: [
          "Flutter Kicks: 3 x 30s",
          "V-ups: 3 x 15",
          "Superman Hold: 3 x 30s",
          "Shoulder Mobility: 10 min"
        ]
      },
      friday: {
        title: "Mixed Strokes",
        exercises: [
          "Freestyle: 4 x 50m",
          "Breaststroke: 4 x 50m",
          "Butterfly: 2 x 50m",
          "Starts & Turns Practice: 15 min"
        ]
      },
      saturday: {
        title: "Pace + Technique",
        exercises: [
          "10 min Stroke Focus",
          "8 x 25m Quality Laps",
          "4 x 50m at 80%",
          "2 x 100m Cooldown"
        ]
      },
      sunday: {
        title: "Recovery Swim",
        exercises: [
          "800m Easy Swim",
          "Stretch: Shoulders, Hips, Core",
          "Relaxed Back/Breast Combo"
        ]
      }
    }
  },
  climbing: {
    name: "Rock Climbing",
    icon: "🧗",
    schedule: {
      monday: {
        title: "Climbing Day",
        exercises: [
          "Bouldering: 45 min",
          "Hangboard (5 grips x 10s x 3)",
          "Core Circuit: 3 Rounds"
        ]
      },
      tuesday: {
        title: "Antagonist Training",
        exercises: [
          "Push-ups: 4 x 20",
          "Dumbbell Bench Press: 3 x 12",
          "Shoulder Press: 3 x 10",
          "Triceps Dips: 3 x 12"
        ]
      },
      wednesday: {
        title: "Technique Focus",
        exercises: [
          "Footwork Drills: 15 min",
          "Silent Climb Challenge",
          "Dyno Practice: 10 min",
          "Hip Mobility: 15 min"
        ]
      },
      thursday: {
        title: "Strength",
        exercises: [
          "Weighted Pull-ups: 4 x 6",
          "Front Lever Tucks: 3 x 10s",
          "L-sits: 3 x 20s",
          "Hangboard Repeaters: 6 sets (7:3 x 6 reps)"
        ]
      },
      friday: {
        title: "Grip + Core",
        exercises: [
          "Dead Hangs: 5 grips x 10s x 3",
          "Plate Pinch: 3 x 30s",
          "Russian Twists: 3 x 20",
          "Plank Variations: 3 x 1 min"
        ]
      },
      saturday: {
        title: "Climb Day (Outdoor/Gym)",
        exercises: [
          "1.5 Hour Session",
          "Warm-up: 2 Easy Routes",
          "Project 1–2 Difficult Routes",
          "Focus: Smooth Flow + Breathing"
        ]
      },
      sunday: {
        title: "Recovery",
        exercises: [
          "Finger/Forearm Stretching: 10 min",
          "Full-body Rollout: 15 min",
          "Visualization Practice: 5 min"
        ]
      }
    }
  }
};

export default function WorkoutDetails({ sport, onClose }) {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  
  const workout = workoutPlans[sport];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start workout
  const startWorkout = () => {
    setWorkoutStarted(true);
    setCurrentExercise(0);
    setTimeLeft(60); // 60 seconds per exercise
    setIsPaused(false);
  };
  
  // Pause workout
  const pauseWorkout = () => {
    setIsPaused(true);
  };
  
  // Resume workout
  const resumeWorkout = () => {
    setIsPaused(false);
  };
  
  // End workout
  const endWorkout = () => {
    setWorkoutStarted(false);
    setCurrentExercise(0);
    setTimeLeft(0);
    setIsPaused(false);
  };
  
  // Next exercise
  const nextExercise = () => {
    if (currentExercise < workout.schedule[selectedDay].exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimeLeft(60); // Reset timer for new exercise
    } else {
      endWorkout();
    }
  };
  
  // Save workout to calendar
  const saveToCalendar = () => {
    if (selectedDate) {
      const newWorkout = {
        id: Date.now(),
        sport: sport,
        day: selectedDay,
        date: selectedDate,
        title: workout.schedule[selectedDay].title
      };
      
      setSavedWorkouts([...savedWorkouts, newWorkout]);
      setShowCalendarModal(false);
      setSelectedDate('');
      
      // In a real app, this would save to a database
      console.log('Workout saved to calendar:', newWorkout);
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (workoutStarted && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && workoutStarted) {
      // Auto-advance to next exercise when timer reaches zero
      nextExercise();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [workoutStarted, isPaused, timeLeft]);
  
  if (!workout) return null;
  
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
          
          {workoutStarted ? (
            <div className="text-center">
              <div className="text-5xl font-bold mb-4">{formatTime(timeLeft)}</div>
              <div className="text-xl mb-6">
                {workout.schedule[selectedDay].exercises[currentExercise]}
              </div>
              <div className="flex justify-center gap-4">
                {isPaused ? (
                  <button
                    onClick={resumeWorkout}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={pauseWorkout}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={nextExercise}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  Next Exercise
                </button>
                <button
                  onClick={endWorkout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                  End Workout
                </button>
              </div>
              <div className="mt-6">
                <div className="flex justify-center gap-1">
                  {workout.schedule[selectedDay].exercises.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-8 rounded ${
                        index === currentExercise
                          ? 'bg-blue-500'
                          : index < currentExercise
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Exercise {currentExercise + 1} of {workout.schedule[selectedDay].exercises.length}
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {workout.schedule[selectedDay].exercises.map((exercise, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-blue-400">•</span>
                  <span>{exercise}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          {!workoutStarted ? (
            <button 
              onClick={startWorkout}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              Start Workout
            </button>
          ) : null}
          <button 
            onClick={() => setShowCalendarModal(true)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            Save to Calendar
          </button>
        </div>
        
        {/* Calendar Modal */}
        {showCalendarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Save Workout to Calendar</h3>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveToCalendar}
                  disabled={!selectedDate}
                  className={`${
                    selectedDate
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-600 cursor-not-allowed'
                  } text-white px-4 py-2 rounded-lg`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 