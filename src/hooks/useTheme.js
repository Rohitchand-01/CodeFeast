import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, THEME_MODES } from '../utils/constants';
import { useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, THEME_MODES.DARK);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(THEME_MODES.LIGHT, THEME_MODES.DARK);
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK);
  };

  return { 
    isDarkMode: theme === THEME_MODES.DARK, 
    toggleTheme 
  };
};
