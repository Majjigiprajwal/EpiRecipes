import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filter';
import RecipeList from '../components/Recipe/RecipeList';
import axios from 'axios'
import useDebounce from '../hooks/useDebounce';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages,setTotalPages] = useState(0)
  const [query,setQuery] = useState('')
  const [page,setPage] = useState(1)
  const [isFilterApplied,setIsFilterApplied] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    dietary: [],
    rating: 0,
    nutrients: {
      calories: { min: 0, max: '' },
      protein: { min: 0, max: '' },
      fat: { min: 0, max: '' },
    },
  });

  const fetchRecipes = async ()=>{
        try{
               let response = await axios.get(`http://127.0.0.1:5000/search?recipe=${query}&page=${page}&limit=${15}`)
               setRecipes(response.data.recipes)
               setTotalPages(Math.ceil(response.data.total / 15));
               console.log(response.data)
        }
        catch(error){
                console.log(error)
        }
  }

  
  useEffect(() => {
    debouncedFetchRecipes();
    if(query.length == 0){
      fetchRecipes()
    }
  }, [query]);

  const debouncedFetchRecipes = useDebounce(fetchRecipes, 400);


   const fetchFilteredRecipes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/search/filter', {
        params: {
          recipe: query,
          page: page,
          limit: 15,
          filters: JSON.stringify(filters)
        },
      });
      setRecipes(response.data.recipes)
      setTotalPages(Math.ceil(response.data.total / 15));
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      setPage(1)
      setIsFilterApplied(true)
  },[filters])


  const debouncedFetchFilteredRecipes = useDebounce(fetchFilteredRecipes, 400);


  useEffect(() => {
    if(isFilterApplied){
      debouncedFetchFilteredRecipes();
    }
    else{
      console.log('called')
      debouncedFetchRecipes()
    }

  }, [filters, page]); 

  const handleSearch = () => {
    fetchRecipes()
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold  mb-8 text-center font-serif text-orange-400">Discover Delicious Recipes</h1>
      
      <div className="mb-8 ">
        <SearchBar onSearch={handleSearch} setQuery={setQuery} query={query} />
      </div>

      <div className="flex flex-col md:flex-row">
        
        <div className="md:w-1/4 pr-8 ">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <div className="md:w-3/4 ">
           <RecipeList recipes={recipes} />
           <div className="flex justify-center items-center mt-10 gap-5">
           <button
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${
                page === 1 ? 'bg-gray-400' : 'bg-black hover:bg-orange-500'
              } text-white`}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-lg font-semibold">{page} of {totalPages}</span>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${
                page === totalPages ? 'bg-gray-400' : 'bg-black hover:bg-orange-500'
              } text-white`}
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
