import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [recipeImages, setRecipeImages] = useState(images);
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef();

  const startScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % recipeImages.length);
    }, 3000);
  };

  
  const stopScroll = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startScroll();
    return () => stopScroll(); 
  }, [recipeImages]);

  
  const handlePrev = () => {
    console.log('button click')
    setCurrentImage((prev) => (prev - 1 + recipeImages.length) % recipeImages.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % recipeImages.length);
  };

  return (
    <div 
      className="relative mb-8"
      onMouseEnter={stopScroll}
      onMouseLeave={startScroll}
    >
      <img 
        src={recipeImages[currentImage]} 
        alt='Recipe Image' 
        className="w-full h-96 object-cover rounded-lg" 
      />
      <button 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;
