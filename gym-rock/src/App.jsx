import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Header from "./components/Header";
import Instructors from "./pages/Instructors";
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Card from './pages/Card';
import Settings from './pages/Settings';
import PurchaseHistory from './pages/PurchaseHistory';
import ProfileEdit from './pages/ProfileEdit';
import Contact from './pages/Contact';

const ProtectedRoute = ({ userId, children }) => {
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const TitleUpdater = ({ setTitle }) => {
  const location = useLocation();

  useEffect(() => {
    let currentTitle = "Home";
    switch (location.pathname) {
      case "/":
        currentTitle = "Logowanie";
        break;
      case "/home":
        currentTitle = "Home";
        break;
      case "/statistics":
        currentTitle = "Statystyki";
        break;
      case "/instructors":
        currentTitle = "Wydarzenia";
        break;
      case "/card":
        currentTitle = "Karta";
        break;
      case "/settings":
        currentTitle = "Ustawienia";
        break;
      case "/purchase-history":
        currentTitle = "Historia Zakupów";
        break;
      case "/profile-edit":
        currentTitle = "Zmiana Danych";
        break;
      case "/contact":
        currentTitle = "Kontakt";
        break;
      default:
        break;
    }

    setTitle(currentTitle);
    document.title = `Gym Rock - ${currentTitle}`;
  }, [location.pathname, setTitle]);

  return null;
};

function App() {
  const [title, setTitle] = useState("Home");
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });
  const [mainNavbarVisible, setMainNavbarVisible] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  return (
    <BrowserRouter>
      <TitleUpdater setTitle={setTitle} />
      {headerVisible && <Header title={title} setMainNavbarVisible={setMainNavbarVisible} userId={userId} />}
      <Routes>
        <Route path="/" element={<Login setHeaderVisible={setHeaderVisible} setMainNavbarVisible={setMainNavbarVisible} setUserId={setUserId} />} />
        <Route path="/instructors" element={<ProtectedRoute userId={userId}><Instructors userId={userId} /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute userId={userId}><Home userId={userId} /></ProtectedRoute>} />
        <Route path="/statistics" element={<ProtectedRoute userId={userId}><Statistics userId={userId} /></ProtectedRoute>} />
        <Route path="/card" element={<ProtectedRoute userId={userId}><Card userId={userId} /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute userId={userId}><Settings userId={userId} setUserId={setUserId} /></ProtectedRoute>} />
        <Route path="/purchase-history" element={<ProtectedRoute userId={userId}><PurchaseHistory userId={userId} /></ProtectedRoute>} />
        <Route path="/profile-edit" element={<ProtectedRoute userId={userId}><ProfileEdit userId={userId} /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute userId={userId}><Contact /></ProtectedRoute>} />
      </Routes>
      {mainNavbarVisible && <MainNavbar />}
    </BrowserRouter>
  )
}

export default App
