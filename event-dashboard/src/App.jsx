import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEvent from './create-event';
import HomePage from './components/ui/Custom/HomePage';
import MyEvents from './components/ui/Custom/MyEvents';
import DashBoard from './components/ui/Custom/DashBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/create-event" element={<CreateEvent/>} />
      <Route path="/my-events" element={<MyEvents/>} />
    </Routes>
  );
}

export default App;
