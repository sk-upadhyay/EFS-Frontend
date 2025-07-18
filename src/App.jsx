import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import FeedbackList from './components/FeedbackList';
import FeedbackPage from './components/FeedbackPage';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/PrivateRoute';

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={ <Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/users" element={<PrivateRoute> <UserList /></PrivateRoute>} />
            <Route path="/users/add" element={<PrivateRoute> <UserForm /></PrivateRoute>} />
            <Route path="/users/edit/:id" element={<PrivateRoute> <UserForm /></PrivateRoute>} />
            <Route path="/user/details" element={<PrivateRoute> <UserDetails /></PrivateRoute>} />

            <Route path="/events" element={<PrivateRoute> <EventList /></PrivateRoute>} />
            <Route path="/events/add" element={<PrivateRoute> <EventForm /></PrivateRoute>} />
            <Route path="/events/edit/:id" element={<PrivateRoute> <EventForm /></PrivateRoute>} />

            <Route path="/feedbacks" element={<PrivateRoute> <FeedbackList /></PrivateRoute>} />
            <Route path="/feedbacks/event/:eventId" element={<PrivateRoute> <FeedbackPage /></PrivateRoute>} />
            <Route path="/feedbacks/user/:userId" element={<PrivateRoute> <FeedbackList /></PrivateRoute>} />

           <Route path="*" element={
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
      <div className="mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 mx-auto text-red-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/" 
        className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
      >
        Return to Home
      </Link>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Need help? <a href="/contact" className="text-indigo-600 hover:underline">Contact support</a></p>
      </div>
    </div>
  </div>
} />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
