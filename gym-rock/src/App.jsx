import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Header from "./components/Header";
import Instructors from "./pages/Instructors";
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Card from './pages/Card';
import Settings from './pages/Settings';

const ProtectedRoute = ({ userId, children }) => {
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

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
        <Route path="/instructors" element={<ProtectedRoute userId={userId}><Instructors userId={userId} /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute userId={userId}><Home userId={userId} /></ProtectedRoute>} />
        <Route path="/statistics" element={<ProtectedRoute userId={userId}><Statistics userId={userId} /></ProtectedRoute>} />
        <Route path="/card" element={<ProtectedRoute userId={userId}><Card userId={userId} /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute userId={userId}><Settings userId={userId} /></ProtectedRoute>} />
      </Routes>
      {mainNavbarVisible && <MainNavbar setTitle={setTitle} />}
    </BrowserRouter>
  )
}

export default App
