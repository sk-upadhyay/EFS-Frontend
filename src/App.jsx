import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* User Routes */}
            <Route path="/users" element={isAuthenticated ? <UserList /> : <Navigate to="/login" replace />} />
            <Route path="/users/add" element={isAuthenticated ? <UserForm /> : <Navigate to="/login" replace />} />
            <Route path="/users/edit/:id" element={isAuthenticated ? <UserForm /> : <Navigate to="/login" replace />} />
            <Route path="/user/details" element={isAuthenticated ? <UserDetails /> : <Navigate to="/login" replace />} />

            {/* Event Routes */}
            <Route path="/events" element={isAuthenticated ? <EventList /> : <Navigate to="/login" replace />} />
            <Route path="/events/add" element={isAuthenticated ? <EventForm /> : <Navigate to="/login" replace />} />
            <Route path="/events/edit/:id" element={isAuthenticated ? <EventForm /> : <Navigate to="/login" replace />} />

            {/* Feedback Routes */}
            <Route path="/feedbacks" element={isAuthenticated ? <FeedbackList /> : <Navigate to="/login" replace />} />
            <Route path="/feedbacks/event/:eventId" element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/login" replace />} />
            <Route path="/feedbacks/user/:userId" element={isAuthenticated ? <FeedbackList /> : <Navigate to="/login" replace />} />

            {/* Not Found Route */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-full">
                <h1 className="text-2xl text-center text-red-500">
                  404 - Page Not Found
                </h1>
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
