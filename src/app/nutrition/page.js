'use client';

import { useState } from 'react';

const mealCategories = [
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'lunch', name: 'Lunch', icon: '🥪' },
  { id: 'dinner', name: 'Dinner', icon: '🍽️' },
  { id: 'snacks', name: 'Snacks', icon: '🍎' }
];

const mealPlans = [
  {
    id: 1,
    title: 'Balanced Diet',
    description: 'A well-rounded meal plan with all essential nutrients',
    calories: 2000,
    protein: '30%',
    carbs: '40%',
    fats: '30%',
    meals: [
      { category: 'breakfast', name: 'Oatmeal with Berries', calories: 350 },
      { category: 'lunch', name: 'Grilled Chicken Salad', calories: 450 },
      { category: 'dinner', name: 'Salmon with Vegetables', calories: 550 },
      { category: 'snacks', name: 'Greek Yogurt with Honey', calories: 150 }
    ]
  },
  {
    id: 2,
    title: 'High Protein',
    description: 'Meal plan focused on protein for muscle building',
    calories: 2200,
    protein: '40%',
    carbs: '30%',
    fats: '30%',
    meals: [
      { category: 'breakfast', name: 'Protein Pancakes', calories: 400 },
      { category: 'lunch', name: 'Turkey Wrap', calories: 500 },
      { category: 'dinner', name: 'Steak with Sweet Potato', calories: 600 },
      { category: 'snacks', name: 'Protein Shake', calories: 200 }
    ]
  },
  {
    id: 3,
    title: 'Low Carb',
    description: 'Reduced carbohydrate intake for weight management',
    calories: 1800,
    protein: '35%',
    carbs: '20%',
    fats: '45%',
    meals: [
      { category: 'breakfast', name: 'Avocado Toast', calories: 300 },
      { category: 'lunch', name: 'Caesar Salad with Chicken', calories: 400 },
      { category: 'dinner', name: 'Zucchini Noodles with Meatballs', calories: 500 },
      { category: 'snacks', name: 'Mixed Nuts', calories: 200 }
    ]
  }
];

export default function NutritionPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showMealDetails, setShowMealDetails] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedPlan(null);
    setShowMealDetails(false);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowMealDetails(true);
  };

  const handleCloseDetails = () => {
    setShowMealDetails(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Nutrition Tracker</h1>
      
      {/* Meal Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span>🍽️</span>
          <span>All Meals</span>
        </button>
        {mealCategories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Meal Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Meal Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealPlans.map(plan => (
            <div
              key={plan.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform"
            >
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Calories</div>
                    <div className="font-bold">{plan.calories}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Protein</div>
                    <div className="font-bold">{plan.protein}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Carbs</div>
                    <div className="font-bold">{plan.carbs}</div>
                  </div>
                </div>
                <button
                  onClick={() => handlePlanSelect(plan.title.toLowerCase())}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Category Content */}
      {selectedCategory && (
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">{selectedCategory} Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Quick Meals</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Oatmeal with fruits</li>
                <li>• Greek yogurt parfait</li>
                <li>• Smoothie bowl</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Meal Prep Ideas</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Overnight oats</li>
                <li>• Protein pancakes</li>
                <li>• Breakfast burritos</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Meal Plan Details Modal */}
      {showMealDetails && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedPlan.title}</h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 mb-6">{selectedPlan.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400">Calories</div>
                  <div className="text-xl font-bold">{selectedPlan.calories}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400">Protein</div>
                  <div className="text-xl font-bold">{selectedPlan.protein}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400">Carbs</div>
                  <div className="text-xl font-bold">{selectedPlan.carbs}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Meals</h3>
              <div className="space-y-4">
                {selectedPlan.meals.map((meal, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-gray-400">
                          {mealCategories.find(cat => cat.id === meal.category)?.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{meal.calories}</div>
                        <div className="text-sm text-gray-400">calories</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
                  Start This Plan
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 