import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Map from './pages/Map';
import Unlock from './pages/Unlock';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="unlock/:regionId" element={<Unlock />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;