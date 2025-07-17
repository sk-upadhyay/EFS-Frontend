import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../utils/api';
import Loader from './Loader';

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [event, setEvent] = useState({
    title: '',
    date: '', // Format 'YYYY-MM-DD'
    description: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      authFetch(`https://efs-backend-production.up.railway.app/api/events/${id}`)
        .then(data => {
          setEvent(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
          console.error("Error fetching event for edit:", error);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `https://efs-backend-production.up.railway.app/api/events/${id}` : 'https://efs-backend-production.up.railway.app/api/events';

    try {
      await authFetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      alert(`Event ${isEditing ? 'updated' : 'created'} successfully!`);
      navigate('/events');
    } catch (error) {
      setError(error.message);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} event:`, error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <Loader />;
  if (error && isEditing) return <div className="text-center text-red-600">Error loading event: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-12 space-y-8"
      >
        <div className="flex items-center justify-center relative">
          <h2 className="text-4xl font-bold text-blue-600 text-center pl-10">
            {isEditing ? 'Edit Event' : 'Add New Event'}
          </h2>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

        <div className="relative">
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          />
          <label htmlFor="title" className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Title
          </label>
        </div>

        <div className="relative">
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          />
          <label htmlFor="date" className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Date
          </label>
        </div>

        <div className="relative">
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition peer"
            placeholder=" "
          ></textarea>
          <label htmlFor="description" className="absolute left-4 top-4 text-gray-500 text-lg transition-all duration-200 ease-in-out 
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-4
            peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500
            peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-1">
            Description
          </label>
        </div>

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
              Saving...
            </span>
          ) : (
            isEditing ? 'Update Event' : 'Add Event'
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate('/events')}
          className="w-full py-4 px-6 text-xl font-medium rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-200 transition duration-300"
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EventForm;
