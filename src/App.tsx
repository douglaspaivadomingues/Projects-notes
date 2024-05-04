import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './front-end/componentes/Login';
import Home from './front-end/componentes/Home';

function App() {
  return (
   <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/home' element={ <Home /> } />
   </Routes>
  )
}

export default App
