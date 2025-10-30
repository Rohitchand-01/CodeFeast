import { useState, useEffect, useRef } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const initialized = useRef(false);
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (initialized.current) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    } else {
      initialized.current = true;
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
