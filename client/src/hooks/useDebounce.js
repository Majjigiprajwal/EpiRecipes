import { useEffect, useRef } from 'react';

const useDebounce = (func, delay) => {
  const timerRef = useRef(null);

  const debouncedFunction = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
