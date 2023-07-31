import React from 'react';
import Header from './components/Header';
import Map from './components/MapPage';
import Zzimlist from './components/Zimlist';
import Roomout from './components/Roomout';
import Signuplogin from './components/Signuplogin';
import GbbList from './components/GbbList';
// import TestApp from './components/TestApp';

import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Header  />}>
            <Route path="/map" element={<Map />} />
            <Route path="/gombangba" element={<GbbList />} />
            <Route path="/zzim" element={<Zzimlist />} />
            <Route path="/roomout" element={<Roomout />} />
            <Route path="/login" element={<Signuplogin />} />
          </Route>
        </Routes>
        {/* <TestApp /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;


