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
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="w-full max-w-md">

        <div className="relative">

          <form 
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-10 space-y-6 backdrop-filter backdrop-blur-sm bg-opacity-70"
          >

            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Create Account
                </h2>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
              </div>
              <p className="mt-2 text-gray-600">
                Join us today and get started
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 peer"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'name' || user.name ? 
                'top-0 text-xs bg-white px-1 text-blue-500 -translate-y-1/2' : 
                'top-3.5 text-gray-500'
              }`}>
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 peer"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'email' || user.email ? 
                'top-0 text-xs bg-white px-1 text-blue-500 -translate-y-1/2' : 
                'top-3.5 text-gray-500'
              }`}>
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 peer"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'password' || user.password ? 
                'top-0 text-xs bg-white px-1 text-blue-500 -translate-y-1/2' : 
                'top-3.5 text-gray-500'
              }`}>
                Password
              </label>
            </div>

            <div className="relative">
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={handleBlur}
                required
                disabled
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 appearance-none bg-gray-100 cursor-not-allowed"
              >
                <option value="VIEWER">Viewer</option>
                <option value="ADMIN">Admin</option>
              </select>
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'role' || user.role ? 
                'top-0 text-xs bg-white px-1 text-blue-500 -translate-y-1/2' : 
                'top-3.5 text-gray-500'
              }`}>
                Account Type
              </label>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 text-lg font-medium rounded-lg text-white transition-all duration-300 shadow-md ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg'
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
                <span className="relative z-10">Sign Up Now</span>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200"
              >
                Sign In
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;