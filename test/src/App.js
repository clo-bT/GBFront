import React from 'react';
import Map from './pages/MapPage';
import Zzimlist from './pages/Zimlist';
import Roomout from './pages/Roomout';
import Signuplogin from './pages/Signuplogin';
import GbbList from './components/GbbList';
import Main from './pages/Main'
import Auth from './pages/Auth';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<Map />} />
          <Route path="/gombangba" element={<GbbList />} />
          <Route path="/zzim" element={<Zzimlist />} />
          <Route path="/roomout" element={<Roomout />} />
          <Route path="/login" element={<Signuplogin />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;


