import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    message: '',
    sentiment: '',
    event: { id: '' }, // Nested object for event ID
    user: { id: '' }   // Nested object for user ID
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested event.id and user.id
    if (name === "eventId") {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        event: { id: value }
      }));
    } else if (name === "userId") {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        user: { id: value }
      }));
    } else {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation for IDs
    if (!feedback.event.id || !feedback.user.id) {
        setError("Event ID and User ID are required.");
        setLoading(false);
        return;
    }

      try {
        const response = await authFetch('https://efs-backend-production.up.railway.app/api/feedbacks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedback),
        });

        alert('Feedback created successfully!');
        navigate('/feedbacks'); // Go back to feedback list
      } catch (error) {
        setError(error.message);
        console.error("Error creating feedback:", error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Feedback</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            value={feedback.message}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="sentiment" className="block text-gray-700 text-sm font-bold mb-2">Sentiment:</label>
          <input
            type="text"
            id="sentiment"
            name="sentiment"
            value={feedback.sentiment}
            onChange={handleChange}
            placeholder="e.g., positive, negative, neutral"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventId" className="block text-gray-700 text-sm font-bold mb-2">Event ID:</label>
          <input
            type="number"
            id="eventId"
            name="eventId"
            value={feedback.event.id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={feedback.user.id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Feedback'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/feedbacks')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
