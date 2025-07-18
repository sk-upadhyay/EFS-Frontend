import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { notifySuccess, notifyError } from '../utils/toastify';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
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
      const response = await fetch('https://abundant-prosperity-production.up.railway.app/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const token = data.token || data.accessToken;
      if (!token) {
        throw new Error('Token not found in response');
      }

      sessionStorage.setItem('token', token);
      if (data.roles && Array.isArray(data.roles)) {
        const roleObj = data.roles.find(r => r.authority);
        if (roleObj) {
          const roleStr = roleObj.authority.replace('ROLE_', '');
          sessionStorage.setItem('role', roleStr);
        }
      }
      if (data.id) {
        sessionStorage.setItem('userId', data.id.toString());
      }

      notifySuccess('Login successful!');
      navigate('/events');
      window.dispatchEvent(new Event('login'));
    } catch (err) {
      notifyError(err.message);
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
            {/* Header with animation */}
            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Welcome Back
                </h2>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
              </div>
              <p className="mt-2 text-gray-600">
                Sign in to your account
              </p>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 peer"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'email' || credentials.email ? 
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
                value={credentials.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 peer"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ease-in-out ${
                focusedField === 'password' || credentials.password ? 
                'top-0 text-xs bg-white px-1 text-blue-500 -translate-y-1/2' : 
                'top-3.5 text-gray-500'
              }`}>
                Password
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
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
                  Signing in...
                </span>
              ) : (
                <span className="relative z-10">Sign In</span>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to our platform?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200"
              >
                Create an account
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

export default Login;