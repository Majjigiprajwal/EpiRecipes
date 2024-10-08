import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';


const ModernRecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative">
          <img src='/assets/recipeImage.jpg' alt={recipe.title} className="w-full h-48 object-cover" />
          <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 flex items-center text-sm font-medium text-gray-700">
            <Clock size={16} className="mr-1 text-indigo-500" />
            <span>{recipe.cookTime || '30'} mins</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">{recipe.title}</h3>
            <div className="flex items-center bg-yellow-100 rounded-full px-2 py-1">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">{Number(recipe.rating).toFixed(1)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {recipe.categories.slice(0,5).map((category, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ModernRecipeCard;