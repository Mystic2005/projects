import { motion } from 'framer-motion';
import '../../css/app.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from "./breadcrumb";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      const res = await axios.post('http://127.0.0.1:8000/api/login', 
        { email, password },
        { withCredentials: true },
      );
      localStorage.setItem('mail', email);
      setMessage(res.data.message);
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
          <div className="p-8 flex-1" style={{fontFamily: "'Bitcount Prop Double', sans-serif"}}>
            <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
              <div className="relative h-24 bg-gray-500 rounded-bl-4xl">
                <svg
                  className="absolute bottom-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  />
                </svg>
              </div>
              <div className="px-10 pt-2 pb-8 bg-white rounded-tr-4xl">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Welcome back!
                </h1>
                <form onSubmit={handleLogin} className="mt-6">
                  <div className="relative">
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-600"
                    />
                  </div>
                  <div className="mt-10 relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-600"
                    />
                  </div>
                  {message && <p className="mt-2 text-sm text-center">{message}</p>}
                  <input
                    type="submit"
                    value="Sign in"
                    className="mt-10 px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-500 focus:ring-opacity-80 cursor-pointer"
                  />
                </form>
                <motion.a onClick={() => navigate("/register")} className="cursor-pointer mt-4 block text-sm text-center font-medium text-gray-600 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Register?
                </motion.a>
              </div>
            </div>
          </div>
    </motion.div>
    <motion.div>
      <Breadcrumb />
    </motion.div>
    </div>
  );
}
