import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../utils/api';
import { notifySuccess, notifyError } from '../utils/toastify';

import Loader from './Loader';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await authFetch('https://efs-backend-production.up.railway.app/api/users');
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredUsers(users.filter(user =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      ));
    }
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://efs-backend-production.up.railway.app/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response.status === 204) {
          setUsers(users.filter(user => user.id !== id));
          setFilteredUsers(filteredUsers.filter(user => user.id !== id));
          notifySuccess('User deleted successfully!');
        } else {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || `Failed to delete user. Status: ${response.status}`;
          throw new Error(errorMessage);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error deleting user:", error);
        notifyError(`Failed to delete user: ${error.message}`);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (users.length === 0) return (
    <div className="text-center text-gray-600">
      No users found. <Link to="/users/add" className="text-blue-600 hover:underline">Add one?</Link>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">User List</h2>
        <Link to="/users/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          Add New User
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                    <Link to={`/feedbacks/user/${user.id}`} className="text-green-500 hover:text-green-700 transition duration-300">
                      View Feedbacks
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
