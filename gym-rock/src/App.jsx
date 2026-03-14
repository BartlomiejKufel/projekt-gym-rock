import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Header from "./components/Header";
import Instructors from "./pages/Instructors";
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState("Home");

  return (
    <BrowserRouter>
      <Header title={title}/>
      <MainNavbar setTitle={setTitle}/>

      <Routes>
        <Route path="/" element={<Instructors />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
