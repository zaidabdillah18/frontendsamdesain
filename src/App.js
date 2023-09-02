import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import './App.css';

function App() {
  return (
    // <Suspense fallback={<Skeleton />}>
    <Router>
      <Routes>
      
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/profile" element={<Profile />} ></Route>
        
      </Routes>
    </Router>
  // </Suspense>
  );
}

export default App;