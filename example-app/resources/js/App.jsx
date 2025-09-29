import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Logs from './pages/logs';
import Profile from './pages/profile';
import Users from './pages/users';


export default function App() {
  const location = useLocation();

  return (
    <div className="relative">
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </AnimatePresence>
    </div>
);
}
