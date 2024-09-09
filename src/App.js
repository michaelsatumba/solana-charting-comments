import React from 'react';
import Chart from './components/Chart';
import Metrics from './components/Metrics';
import Comments from './components/Comments';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './ThemeContext';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Solana Dashboard</h1>
          <ThemeToggle />
          <Metrics />
          <Chart />
          <Comments />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;