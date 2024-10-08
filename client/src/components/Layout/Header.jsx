import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md bg-gradient-to-r ">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-orange-500 font-serif">RecipeHub</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-black hover:text-orange-600 text-xl">Home</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;