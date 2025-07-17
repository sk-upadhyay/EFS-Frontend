import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/api';
import Loader from './Loader';

const FeedbackList = () => {
  const { eventId } = useParams(); // Only eventId is a path param
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialUserId = queryParams.get('userId') || '';

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchUserId, setSearchUserId] = useState(initialUserId);

  const fetchFeedbacks = async () => {
    setLoading(true);
    let url = 'http://localhost:8080/api/feedbacks';

    if (searchUserId) {
      url = `http://localhost:8080/api/feedbacks/by-user/${searchUserId}`;
    } else {
      // Remove eventId search, only search by userId
      url = `http://localhost:8080/api/feedbacks/by-user/${searchUserId}`;
    }

    try {
      const data = await authFetch(url);
      setFeedbacks(data);
    } catch (error) {
      
      setError(error.message);
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [eventId, initialUserId]);

  const handleSearchChange = (e) => {
    setSearchUserId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchUserId.trim()) {
      navigate(`?userId=${searchUserId.trim()}`);
    } else {
      navigate(location.pathname); // Reset to original
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await authFetch(`http://localhost:8080/api/feedbacks/${id}`, {
          method: 'DELETE',
        });
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        alert('Feedback deleted successfully!');
      } catch (error) {
        setError(error.message);
        alert(`Failed to delete feedback: ${error.message}`);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  const title = eventId
    ? `Feedbacks for Event ID: ${eventId}`
    : initialUserId
    ? `Feedbacks by User ID: ${initialUserId}`
    : 'All Feedbacks';

  if (feedbacks.length === 0)
    return (
      <div className="text-center text-gray-600">
        No feedbacks found {eventId ? `for Event ID ${eventId}` : initialUserId ? `by User ID ${initialUserId}` : ''}.
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">{title}</h2>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Message</th>
              <th className="py-3 px-6">Sentiment</th>
              <th className="py-3 px-6">Timestamp</th>
              <th className="py-3 px-6">Event ID</th>
              <th className="py-3 px-6">User ID</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{feedback.id}</td>
                <td className="py-3 px-6">{feedback.message?.substring(0, 70)}...</td>
                <td className="py-3 px-6">{feedback.sentiment}</td>
                <td className="py-3 px-6">{new Date(feedback.timestamp).toLocaleString()}</td>
                <td className="py-3 px-6">{feedback.eventId}</td>
                <td className="py-3 px-6">{feedback.userId}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
