import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue = null) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Return parsed item if it exists, otherwise return initialValue
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function (like useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Update state
      setStoredValue(valueToStore);
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Handle storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only update if the changed key matches our key
      if (e.key === key) {
        try {
          const newValue = e.newValue !== null ? JSON.parse(e.newValue) : null;
          setStoredValue(newValue);
        } catch (error) {
          console.error('Error parsing storage event value:', error);
          setStoredValue(initialValue);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup: remove event listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]); // Dependencies ensure proper cleanup

  return [storedValue, setValue];
}