import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Header from "./components/Header";
import Instructors from "./pages/Instructors";
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Card from './pages/Card';
import Settings from './pages/Settings';

function App() {
  const [title, setTitle] = useState("Home");
  const [userId, setUserId] = useState(null);
  const [mainNavbarVisible, setMainNavbarVisible] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  return (
    <BrowserRouter>
      {headerVisible && <Header title={title} />}
      <Routes>
        <Route path="/" element={<Login setHeaderVisible={setHeaderVisible} setMainNavbarVisible={setMainNavbarVisible} setUserId={setUserId} />} />
        <Route path="/instructors" element={<Instructors userId={userId} />} />
        <Route path="/home" element={<Home userId={userId} />} />
        <Route path="/statistics" element={<Statistics userId={userId} />} />
        <Route path="/card" element={<Card userId={userId} />} />
        <Route path="/settings" element={<Settings userId={userId} />} />
      </Routes>
      {mainNavbarVisible && <MainNavbar setTitle={setTitle} />}
    </BrowserRouter>
  )
}

export default App
