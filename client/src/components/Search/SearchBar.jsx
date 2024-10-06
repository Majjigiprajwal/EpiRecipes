import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
 


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full px-4 py-2 rounded-l-md border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300">
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;