import { useState } from 'react';
import { Star } from 'lucide-react';

const Filters = ({ filters, setFilters}) => {

  const options = {
    categories: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
    dietary: ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'Low Carb'],
  };

  const handleCheckboxChange = (category, value) => {
    const updatedFilters = { ...filters };
    const index = updatedFilters[category].indexOf(value);
    if (index > -1) {
      updatedFilters[category].splice(index, 1);
    } else {
      updatedFilters[category].push(value);
    }
    setFilters(updatedFilters);
    console.log(filters)
  };

  const handleNutrientChange = (nutrient, value, isMin = true) => {
    const updatedFilters = {
      ...filters,
      nutrients: {
        ...filters.nutrients,
        [nutrient]: {
          ...filters.nutrients[nutrient],
          [isMin ? 'min' : 'max']: value,
        },
      },
    };

    if (isMin && value > updatedFilters.nutrients[nutrient].max) {
      updatedFilters.nutrients[nutrient].max = value;
    }

    setFilters(updatedFilters);
    console.log(filters)
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-800">Filters</h2>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 px-4 py-3">Categories</h3>
          <div className="space-y-2 px-4 pb-3">
            {options.categories.map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(value)}
                  onChange={() => handleCheckboxChange('categories', value)}
                  className="text-blue-500 focus:ring-blue-500 h-4 w-4 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 px-4 py-3">Dietary</h3>
          <div className="space-y-2 px-4 pb-3">
            {options.dietary.map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.dietary.includes(value)}
                  onChange={() => handleCheckboxChange('dietary', value)}
                  className="text-blue-500 focus:ring-blue-500 h-4 w-4 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 px-4 py-3">Customer Ratings</h3>
          <div className="space-y-2 px-4 pb-3">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => {
                    const updatedFilters = { ...filters, rating };
                    setFilters(updatedFilters);
                  }}
                  className="text-blue-500 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 flex items-center text-sm text-gray-600">
                  {rating} <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current" /> & above
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 px-4 py-3">Nutrition</h3>
          {Object.entries(filters.nutrients).map(([nutrient, { min, max }]) => (
            <div key={nutrient} className="mb-4 px-4 pb-3">
              <label className="text-sm text-gray-600 block mb-1 capitalize">{nutrient}</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={0}
                  value={min}
                  onChange={(e) => handleNutrientChange(nutrient, e.target.value, true)}
                  className="w-20 px-2 py-1 border rounded text-sm"
                  placeholder="Min"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => handleNutrientChange(nutrient, e.target.value, false)}
                  className="w-20 px-2 py-1 border rounded text-sm"
                  placeholder="Max"
                />
              </div>
              {min > max && (
                <p className="text-red-500 text-xs mt-1">
                  Maximum value should be greater than or equal to Minimum.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;

