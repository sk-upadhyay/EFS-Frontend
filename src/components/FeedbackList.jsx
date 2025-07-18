import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/api';
import Loader from './Loader';

const FeedbackList = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialUserId = queryParams.get('userId') || '';

  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = 'https://abundant-prosperity-production.up.railway.app/api/feedbacks';
      
      if (initialUserId) {
        url = `https://abundant-prosperity-production.up.railway.app/api/feedbacks/by-user/${initialUserId}`;
      } else if (eventId) {
        url = `https://abundant-prosperity-production.up.railway.app/api/feedbacks/by-event/${eventId}`;
      }

      const data = await authFetch(url);
      setFeedbacks(data);
      setFilteredFeedbacks(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      setError(error.message || 'Failed to fetch feedbacks');
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [eventId, initialUserId]);

  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFeedbacks(feedbacks);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = feedbacks.filter(feedback =>
        feedback.message.toLowerCase().includes(lowerSearch) ||
        feedback.userId.toString().toLowerCase().includes(lowerSearch) ||
        feedback.eventId.toString().toLowerCase().includes(lowerSearch) ||
        feedback.sentiment.toLowerCase().includes(lowerSearch) ||
        feedback.id.toString().toLowerCase().includes(lowerSearch)
      );
      setFilteredFeedbacks(filtered);
    }
    
    setCurrentPage(1);
  }, [searchTerm, feedbacks]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredFeedbacks.length / itemsPerPage));
  }, [filteredFeedbacks]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await authFetch(`https://abundant-prosperity-production.up.railway.app/api/feedbacks/${id}`, {
          method: 'DELETE',
        });
        const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
        setFeedbacks(updatedFeedbacks);
        setFilteredFeedbacks(updatedFeedbacks.filter(feedback => {
          if (searchTerm.trim() === '') return true;
          const lowerSearch = searchTerm.toLowerCase();
          return feedback.message.toLowerCase().includes(lowerSearch) ||
                 feedback.userId.toString().toLowerCase().includes(lowerSearch) ||
                 feedback.eventId.toString().toLowerCase().includes(lowerSearch) ||
                 feedback.sentiment.toLowerCase().includes(lowerSearch) ||
                 feedback.id.toString().toLowerCase().includes(lowerSearch);
        }));
        alert('Feedback deleted successfully!');
      } catch (error) {
        setError(error.message || 'Failed to delete feedback');
      }
    }
  };

 
  const getUserInitials = (userId) => {
    if (!userId) return 'U';
    return userId.toString().slice(0, 2).toUpperCase();
  };

  
  const getAvatarColor = (userId) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-pink-100 text-pink-600',
      'bg-purple-100 text-purple-600',
      'bg-yellow-100 text-yellow-600',
      'bg-indigo-100 text-indigo-600',
      'bg-red-100 text-red-600',
      'bg-gray-100 text-gray-600'
    ];
    const index = userId ? userId.toString().charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

 
  const renderStarRating = (sentiment) => {
    const stars = sentiment === 'POSITIVE' ? 5 : sentiment === 'NEGATIVE' ? 2 : 3;
    return (
      <div className="flex text-yellow-400">
        {[...Array(stars)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {[...Array(5 - stars)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const title = eventId
    ? `Feedbacks for Event ID: ${eventId}`
    : initialUserId
    ? `Feedbacks by User ID: ${initialUserId}`
    : 'All Feedbacks';

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600 p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
              <p className="text-gray-600">
                {filteredFeedbacks.length === 0 
                  ? (searchTerm ? `No results found for "${searchTerm}"` : "No feedback found")
                  : `Showing ${filteredFeedbacks.length} feedback${filteredFeedbacks.length === 1 ? '' : 's'}${searchTerm ? ` matching "${searchTerm}"` : ''}`
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search feedback... (message, user ID, event ID, sentiment)"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300 whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {searchTerm ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              {searchTerm ? 'No Results Found' : 'No Feedback Found'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? (
                <>
                  No feedback found matching <strong>"{searchTerm}"</strong>
                  <br />
                  <button 
                    onClick={handleReset}
                    className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                  >
                    Clear search to see all feedback
                  </button>
                </>
              ) : (
                eventId ? `No feedback found for Event ID ${eventId}` : 
                initialUserId ? `No feedback found by User ID ${initialUserId}` : 
                'No feedback available at the moment'
              )}
            </p>
          </div>
        ) : (
          <>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedFeedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 hover:border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAvatarColor(feedback.userId)}`}>
                        <span className="font-medium text-sm">{getUserInitials(feedback.userId)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 text-sm">User {feedback.userId}</div>
                        <div className="text-xs text-gray-500">ID: {feedback.id}</div>
                      </div>
                    </div>
                    {renderStarRating(feedback.sentiment)}
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {feedback.eventTitle} 
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 italic text-sm leading-relaxed">
                      "{feedback.message}"
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      feedback.sentiment === 'POSITIVE' 
                        ? 'bg-green-100 text-green-800'
                        : feedback.sentiment === 'NEGATIVE'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.sentiment}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {new Date(feedback.timestamp).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-300 hover:bg-red-50 px-3 py-1 rounded-md"
                      title="Delete feedback"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredFeedbacks.length)}</span> of{' '}
                    <span className="font-medium">{filteredFeedbacks.length}</span> results
                    {searchTerm && <span className="text-gray-500"> for "{searchTerm}"</span>}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg font-medium transition duration-300 ${
                              currentPage === pageNum 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                        currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;