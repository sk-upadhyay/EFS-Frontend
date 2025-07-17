import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { notifySuccess, notifyError } from '../utils/toastify';
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VIEWER'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://efs-backend-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      navigate('/login');
      notifySuccess('Signup successful! Please login.');
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-12 space-y-6"
      >
        {/* Title with animated dots */}
        <div className="flex items-center justify-center relative">
          <h2 className="text-4xl font-bold text-blue-600 text-center pl-10">
            Sign Up
          </h2>
          <div className="absolute left-1/2 -translate-x-24 flex space-x-2">
            <div className="w-5 h-5 rounded-full bg-blue-600"></div>
            <div className="w-5 h-5 rounded-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>

        <p className="text-gray-600 text-center text-lg">
          Create your account to get started
        </p>

        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Full Name
          </label>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Password
          </label>
        </div>

        {/* Role Select Field */}
        <div className="relative">
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition appearance-none peer"
          >
            <option value="VIEWER">Viewer</option>
            <option value="ADMIN">Admin</option>
          </select>
          <label className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Role
          </label>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 text-xl font-medium rounded-xl text-white transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>

        {/* Login link */}
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;