import React from 'react';
import Header from './components/Header';
import Map from './components/MapPage';
import Zzimlist from './components/Zimlist';
import Roomout from './components/Roomout';
import Signuplogin from './components/Signuplogin';
import GbbCreate from './components/GbbCreate';

import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Header  />}>
            <Route path="/map" element={<Map />} />
            <Route path="/gombangba" element={<GbbCreate />} />
            <Route path="/zzim" element={<Zzimlist />} />
            <Route path="/roomout" element={<Roomout />} />
            <Route path="/login" element={<Signuplogin />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;


