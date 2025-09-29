import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import '../../css/bento.css';
import axios from 'axios';
import Breadcrumb from "./breadcrumb";
import SettingsModal from './settings';

function AuthButton({email, authenticated}) {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center', 
      height: '100%', width: '100%', 
      textAlign: 'center', 
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontFamily: "'Bitcount Prop Double', sans-serif",
      userSelect: 'none'
    }}>
      {authenticated ? (
        <>
          <p style={{ margin: 0, fontSize: '1.6rem' }}>Welcome, {email}!</p>
          <p style={{ marginTop: '0.3rem', padding: '0.25rem 0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Logout</p>
        </>
      ) : (
        <p style={{ padding: '0.25rem 0.5rem', fontSize: '3rem', fontWeight: 'bold' }}>Login</p>
      )}
    </div>
  );
}

function LogsButton() {
  return (
    <div style={{ 
      fontFamily: "'Bitcount Prop Double', sans-serif",
      userSelect: 'none',
      transform: 'rotate(90deg)',
      transformOrigin: 'center',
      fontSize: '2.5rem'
    }}>
      Logs
    </div>
  );
}

function SettingsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Bitcount Prop Double', sans-serif",
        userSelect: 'none',
        transform: 'rotate(270deg)',
        transformOrigin: 'center',
        fontSize: '2.5rem'
      }}
    >
      Settings
    </button>
  );
}

function ProfileButton() {
  return (
    <div
      style={{
        fontFamily: "'Bitcount Prop Double', sans-serif",
        userSelect: 'none', 
        transformOrigin: 'center',
        fontSize: '2.5rem'
      }}
    >
      Profile
    </div>
  );
}

function UsersButton() {
  return (
    <div
      style={{
        fontFamily: "'Bitcount Prop Double', sans-serif",
        userSelect: 'none', 
        transformOrigin: 'center',
        fontSize: '2.5rem'
      }}
    >
      Users
    </div>
  );
}

function Bento() {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/me', { withCredentials: true })
      .then((res) => {
        setAuthenticated(true);
        setLoading(false);
        setEmail(res.data.user.email);
        setRole(res.data.user.role);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Checking auth...</div>;
  }

  const cards = [
    { id: "card-1", route: "/login", content: <AuthButton email={email} authenticated={authenticated} />},
    { id: "card-2", route: "/logs", content: <LogsButton /> },
    { id: "card-3", route: "/settings", content: <SettingsButton onClick={() => setIsSettingsOpen(true)} /> },
    { id: "card-4", route: "/profile", content: <ProfileButton /> },
    ...(role === 'admin' ? [{ id: "card-5", route: "/users", content: <UsersButton/> }] : []),
  ];

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {withCredentials: true});
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
    <div className="grid">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={`card ${card.id}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => {
              if (card.id === "card-1") {
                if (authenticated) {
                  handleLogout();
                } else {
                  navigate('/login');
                }
              } else {
                if (card.id !== "card-3" && card.id !== 'card-5')
                  navigate(card.route);
                if (role == 'admin' && card.id === 'card-5') {
                  navigate(card.route);
                }
              }
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    <motion.div>
        <Breadcrumb />
    </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <Bento />
  );
}
