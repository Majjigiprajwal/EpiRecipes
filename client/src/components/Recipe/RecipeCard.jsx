import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;