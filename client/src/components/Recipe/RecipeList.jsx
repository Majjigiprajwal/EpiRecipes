import React from 'react';
import RecipeCard from './RecipeCard';
import { Frown } from 'lucide-react';

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 ">
          <Frown size={56} className="text-gray-400 mb-4" />
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Sorry, no recipes found!</h1>
          <p className="text-gray-500 text-center">
            Try adjusting your filters or search for other delicious recipes.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
