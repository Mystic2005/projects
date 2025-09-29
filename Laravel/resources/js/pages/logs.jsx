import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/bento.css';
import Breadcrumb from "./breadcrumb";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/me', { withCredentials: true })
      .then((res) => {
        setLoading(false);
        if (res.data.user.role === 'viewer') {
          navigate('/');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      axios.get('http://127.0.0.1:8000/api/logs', { withCredentials: true }).then(res => setLogs(res.data.logs));
    }
  }, [loading]);

  if (loading) return <p>Verifying session...</p>;

  return (
    <div>
    <div style={{fontFamily: "'Bitcount Prop Double', sans-serif", }}className="rounded-xl shadow-lg border border-gray-300 bg-gray-300 p-2 h-[85vh] flex gap-2">
      <div className="flex-[2] overflow-auto rounded-lg border border-gray-200 bg-gray-50 shadow-sm p-4 max-w-[70vh] max-h-[75vh] flex flex-col mt-8" >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Logs</h3>
        <div className="text-sm text-gray-700 whitespace-pre-wrap overflow-y-auto space-y-1">
          {logs.length > 0 ? (
            logs.map((line, idx) => <div key={idx}>{line}</div>)
          ) : (
            <p className="text-gray-400">No logs yet.</p>
          )}
        </div>
      </div>
    </div>
    <motion.div>
        <Breadcrumb />
    </motion.div>
    </div>
  );
}