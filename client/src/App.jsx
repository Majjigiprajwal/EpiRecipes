import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';


export default function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path='/recipe/:id'   element={<RecipeDetails />} />
        </Routes>
      </Layout>
  );
}



