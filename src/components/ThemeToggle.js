import React from 'react';
import { useTheme } from '../ThemeContext'; // Import the useTheme hook from ThemeContext

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Extract theme and toggleTheme function from the context

  return (
    <button
      onClick={toggleTheme} // Set the onClick handler to toggleTheme function
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded mb-4" // Button styling with conditional classes for light and dark themes
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode {/* Button text changes based on the current theme */}
    </button>
  );
};

export default ThemeToggle; // Export the ThemeToggle component as the default export