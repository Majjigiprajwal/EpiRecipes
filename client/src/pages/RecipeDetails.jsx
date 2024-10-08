import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Utensils, BarChart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import ImageCarousel from '../components/Recipe/ImageCarousel';

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let images = ['/assets/images1.jpg','/assets/images2.jpg','/assets/images3.jpg']


  useEffect(() => {
    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search/recipe/${id}`);
            setRecipe(response.data.recipe);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    fetchRecipeDetails();
}, []); 

  if (loading) return <div>Loading...</div>;
    
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 font-mono">{recipe.title}</h1>
        
      <div className="relative mb-8">
         <ImageCarousel images={images} /> 
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center bg-blue-100 rounded-full px-3 py-1">
          <Clock size={20} className="mr-2 text-blue-500" />
          <span className="text-sm font-medium text-blue-800">30 mins</span>
        </div>
        <div className="flex items-center bg-green-100 rounded-full px-3 py-1">
          <Utensils size={20} className="mr-2 text-green-500" />
          <span className="text-sm font-medium text-green-800">Servings: 6</span>
        </div>
        <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1">
          <BarChart size={20} className="mr-2 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-800">Calories: {recipe.calories}</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 ">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {recipe?.categories?.map((category, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-800 text-sm  font-medium px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>

  
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-2">
          {recipe?.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-700 font-serif">{ingredient}</li>
          ))}
        </ul>
      </div>

   
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Directions</h2>
        <ol className="space-y-4">
          {recipe?.directions?.map((direction, index) => (
            <li key={index} className="text-gray-700 font-serif">
              <span className="font-bold mr-2">{index + 1}.</span>
              {direction}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Nutritional Information</h2>
        <div className="bg-gray-100 rounded-lg p-4 flex justify-between">
          <div className='flex flex-col justify-center items-center'>
            <p className="text-base w-20  font-medium text-black bg-red-300 p-1 rounded-lg text-center">Calories</p>
            <p className="text-xl font-bold mt-3 ">{recipe.calories}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className="text-base w-20 font-medium text-black bg-red-300 p-1 rounded-lg text-center">Fat</p>
            <p className="text-xl font-bold mt-3 ">{recipe.fat}g</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className="text-base w-20 font-medium text-black bg-red-300 p-1 rounded-lg text-center">Protein</p>
            <p className="text-xl font-bold mt-3 ">{recipe.protein}g</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className="text-base w-20 font-medium text-black bg-red-300 p-1 rounded-lg text-center">Sodium</p>
            <p className="text-xl font-bold mt-3 ">{recipe.sodium}mg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;