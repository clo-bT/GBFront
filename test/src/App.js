import React from 'react';
import Header from './component/Header';
import Map from './component/MapPage';
import Gombangba from './component/Gombangba';
import Zzimlist from './component/Zimlist';
import Roomout from './component/Roomout';
import Signuplogin from './component/Signuplogin';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Header  />}>
            <Route path="/map" element={<Map />} />
            <Route path="/gombangba" element={<Gombangba />} />
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


