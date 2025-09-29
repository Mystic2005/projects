import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/bento.css';
import Breadcrumb from "./breadcrumb";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/me', { withCredentials: true })
      .then((res) => {
        setLoading(false);
        if (res.data.user.role !== 'admin') {
          navigate('/');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      axios.get('http://127.0.0.1:8000/api/users', { withCredentials: true }).then(res => {
        setUsers(res.data);
      });
    }
  }, [loading]);

  const updateRole = async (id, newRole) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/users/${id}/role`, 
        { role: newRole }, 
        { withCredentials: true });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };


  if (loading) return <p>Verifying session...</p>;

  
  const deleteUser = async (id) => {
    const email = localStorage.getItem("mail");
    const userToDelete = users.find((u) => u.id === id);

    if (userToDelete && userToDelete.email === email) {
      alert("Nu poti sterge propriul cont.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, { withCredentials: true });

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };


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
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Role
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <select
                              value={user.role}
                              onChange={(e) => updateRole(user.id, e.target.value)}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                              <option value="viewer">viewer</option>
                              <option value="editor">editor</option>
                              <option value="admin">admin</option>
                            </select>
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
    </div>
    <motion.div>
        <Breadcrumb />
    </motion.div>
    </div>
  );
}