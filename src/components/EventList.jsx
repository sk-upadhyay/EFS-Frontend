
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/api';
import Loader from './Loader';;
import EventCard from './EventCard';
import { notifySuccess } from '../utils/toastify'

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'

  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await authFetch('https://efs-backend-production.up.railway.app/api/events');
        setEvents(data);
      } catch (err) {
        setError(err.message || 'Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const segregateEvents = () => {
    const today = new Date();
    const upcoming = [];
    const past = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= today) upcoming.push(event);
      else past.push(event);
    });

    return { upcoming, past };
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`https://efs-backend-production.up.railway.app/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (response.status === 204) {
        setEvents(prev => prev.filter(event => event.id !== id));
        notifySuccess('Event deleted successfully!');
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to delete event. Status: ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error deleting event:', err);
      alert(`Failed to delete event: ${err.message}`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  const { upcoming, past } = segregateEvents();
  const filteredEvents = activeTab === 'upcoming' ? upcoming : past;

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Event Dashboard</h2>
        {role === 'ADMIN' && (
          <Link to="/events/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
            Add New Event
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['upcoming', 'past'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <div className="text-center text-gray-600">
          No {activeTab} events found.{' '}
          {role === 'ADMIN' && activeTab === 'upcoming' && (
            <Link to="/events/add" className="text-blue-600 hover:underline">
              Add one?
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={role === 'ADMIN'}
              onEdit={(e) => {
                e.stopPropagation();
                navigate(`/events/edit/${event.id}`);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                handleDelete(event.id);
              }}
              onClick={() => {
                navigate(`/feedbacks/event/${event.id}`);
              }}
            >
              {role === 'VIEWER' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/feedbacks/event/${event.id}`);
                  }}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                >
                  View Feedback
                </button>
              )}
            </EventCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
