import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, default is 'light'
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On component mount, check the initial theme from the document's root element
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme); // Set the initial theme
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark'); // Add 'dark' class to the root element
      setTheme('dark'); // Update state to 'dark'
    } else {
      root.classList.remove('dark'); // Remove 'dark' class from the root element
      setTheme('light'); // Update state to 'light'
    }
  };

  return (
    // Provide the theme and toggleTheme function to the context
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Render children components */}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);