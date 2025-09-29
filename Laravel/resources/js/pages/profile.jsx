import Breadcrumb from "./breadcrumb";
import { motion } from "framer-motion";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/me', { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setEmail(res.data.user.email);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

    useEffect(() => {
      if (!email) return;

      const fetchProfile = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/user-profile?email=${email}`, { withCredentials: true });
          setProfilePicUrl(res.data.profile_picture || null);
        } catch (err) {
          console.error("Eroare la încărcarea pozei profil:", err);
        }
      };

      fetchProfile();
    }, [email]);

  useEffect(() => {
      if (!file) {
        setPreview(null);
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("profile_picture", file);

      try {
        const res = await axios.post("http://127.0.0.1:8000/api/uploadpfp", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data.profile_picture);
        setProfilePicUrl(res.data.profile_picture);
      } catch (err) {
        console.error(err);
      }
    };

    uploadFile();
  }, [file, email]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
    <motion.div
      className="p-6 flex flex-col items-center justify-center min-h-screen"
      style={{ fontFamily: "'Bitcount Prop Double', sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-sm bg-gray-300 shadow-xl rounded-2xl p-6 text-center">
        <div className="relative group w-36 h-36 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : profilePicUrl ? (
            <img src={`http://127.0.0.1:8000/storage/${profilePicUrl}`} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-sm">No photo</span>
          )}

            <label className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        <p className="text-gray-600 mt-2">{email}</p>
      </div>
    </motion.div>

    <motion.div>
      <Breadcrumb />
    </motion.div>
    </div>
  );
}