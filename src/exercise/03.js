// src/exercise/03.js
import { useState, useEffect } from 'react';

export function useMouseCoordinates() {
  const [coords, setCoords] = useState({ 
    clientX: 0, 
    clientY: 0 
  });

  useEffect(() => {
    function handleMouseMove(event) {
      setCoords({
        clientX: event.clientX,
        clientY: event.clientY
      });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return coords;
}