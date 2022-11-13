import Home from './Home';
import SuperUserDashboard from './SuperUserDashboard';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='Dashboard' element={<SuperUserDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;