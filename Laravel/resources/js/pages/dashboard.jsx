import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/bento.css';
import Breadcrumb from "./breadcrumb";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/me', { withCredentials: true })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      axios.get('http://127.0.0.1:8000/api/users', { withCredentials: true }).then(res => setUsers(res.data));
      axios.get('http://127.0.0.1:8000/api/logs', { withCredentials: true }).then(res => setLogs(res.data.logs));
    }
  }, [loading]);

  const deleteUser = async (id) => {
    const email = localStorage.getItem("email");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, { withCredentials: true });

      setUsers((prev) => prev.filter((user) => user.id !== id));

      const userDeleted = users.find(u => u.id === id);

      if (userDeleted && userDeleted.email === email) {
        await axios.post('http://127.0.0.1:8000/api/logout', { email }, { withCredentials: true });
        setEmail(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Verifying session...</p>;

  return (
    <div>
    <div style={{fontFamily: "'Bitcount Prop Double', sans-serif", }}className="rounded-xl shadow-lg border border-gray-300 bg-gray-300 p-2 h-[85vh] flex gap-2">
      <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scroll container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div className="custom-scroll -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-y-auto max-h-[80vh]">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap font-medium">
                              {user.email}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap text-xs">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 transition"
                        >
                          Delete
                          <svg
                            className="ml-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center text-white-500 py-6">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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