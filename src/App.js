// src/App.js
import React from 'react';
import Chart from './components/Chart';
import Metrics from './components/Metrics';
import Comments from './components/Comments';

const App = () => {
  return (
    <div>
      <h1>Solana Dashboard</h1>
      <Metrics />
      <Chart />
      <Comments />
    </div>
  );
};

export default App;