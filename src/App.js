import { ThemeProvider, useTheme } from './ThemeContext'; // Adjust the path if needed
import './index.css';
import ThemeToggle from './components/ThemeToggle'; // Adjust the path if needed
import Metrics from './components/Metrics'; // Adjust the path if needed
import Chart from './components/Chart'; // Adjust the path if needed
import Comments from './components/Comments'; // Adjust the path if needed

const AppContent = () => {
  const { theme } = useTheme(); // Extract the current theme from the context

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Solana Dashboard</h1>
        <ThemeToggle />
        <Metrics />
        <Chart theme={theme} /> {/* Pass the current theme as a prop */}
        <Comments />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;