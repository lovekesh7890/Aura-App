import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import About from "./About";
import Registration from "./Registration";
import Login from "./Login";
import ChangePassword from "./ChangePassword";

import AddProfile from "./AddProfile";
import Horoscope from "./Horoscope";
import Lucky from "./Lucky";
import Profile from "./Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />  
        <Route path="/registration" element={<Registration />} />
         <Route path="/ChangePassword" element={<ChangePassword />} />  
         <Route path="/AddProfile" element={<AddProfile />} />
         <Route path="/Horoscope" element={<Horoscope/>}/>
         {/* <Route path="/Lucky" element={<Lucky />}/> */}
         <Route path="/Lucky" element={<Lucky />} />
         <Route path="/Profile" element={<Profile/>}/>





      </Routes>
    </BrowserRouter>
  );
}

export default App;
