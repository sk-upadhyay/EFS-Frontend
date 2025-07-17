import React, { useState, useEffect } from 'react';
import { authFetch } from '../utils/api';
import { notifySuccess, notifyError } from '../utils/toastify';
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }
        const data = await authFetch(`http://localhost:8080/api/users/${userId}`);
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          role: data.role || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        notifyError('User not logged in');
        setSubmitting(false);
        return;
      }
      const updatePayload = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      const response = await authFetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
      notifySuccess('User details updated successfully');
    } catch (err) {
      notifyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block mb-1 font-semibold">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
