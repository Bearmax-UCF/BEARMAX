import React, { useState } from "react";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import './Components/LandingNav/Nav.css';
import './Pages/Landing/landing.css';
import './Components/Component.css';

import LandingPage from "./Pages/Landing/LandingPage";
import AboutUs from "./Pages/Landing/AboutUs";
import HowToUse from "./Pages/Landing/HowToUse";
import ContactUs from "./Pages/Landing/ContactUs";

import Dashboard from "./Pages/Account/Dashboard";
import ReportHist from "./Pages/Account/ReportHistory";
import Calibrate from "./Pages/Account/Calibrate";
import Settings from "./Pages/Account/Settings";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <div className="App">
			
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/how-to-use" element={<HowToUse />} />
      <Route path="/contact-us" element={<ContactUs />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report-hist" element={<ReportHist />} />
      <Route path="/calibrate" element={<Calibrate />} />
      <Route path="/settings" element={<Settings />} />

    </Routes>
  
  </div>
  );
}

export default App;
