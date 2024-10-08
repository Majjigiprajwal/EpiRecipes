import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios'
import useDebounce from '../../hooks/useDebounce';

const SearchBar = ({ onSearch , setQuery , query }) => {
  const [suggestions, setSuggestions] = useState([]);
  

  const fetchSuggestions =  async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/suggestions?recipe=${query}`);
      console.log(response.data)
      console.log('suggestions')
      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  }

  const deboundcedSuggestions = useDebounce(fetchSuggestions,400)

  useEffect(() => {
    if (query.length > 1) {
      deboundcedSuggestions()
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
    setSuggestions([]);
  };


  return (
    <div className="max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for delicious recipes..."
          className="w-full px-5 py-3 pr-12 text-gray-700 bg-white border-2  rounded-xl focus:outline-none focus:border-black focus:ring-2 transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black p-2 rounded-full hover:bg-slate-400 hover:text-white focus:outline-none transition-all duration-300 ease-in-out"
        >
          <Search size={25} />
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
                onSearch(suggestion);
              }}
              className="flex items-center px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              <Search size={18} className="mr-2 text-gray-600" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
