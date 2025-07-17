import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ICONS = {
  login: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  ),
  signup: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  events: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  feedbacks: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
  details: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  )
};

const NavButton = ({ name, icon, color, onClick }) => {
  if (name === null) return null;

  const colorClasses = {
    cyan: 'hover:text-[#06B6D4] text-cyan-500',
    blue: 'hover:text-[#60A5FA] text-blue-400',
    yellow: 'hover:text-[#FACC14] text-yellow-400',
    orange: 'hover:text-[#FB923C] text-orange-400',
    red: 'hover:text-red-600 text-red-500',
    default: 'hover:text-blue-600 text-blue-500'
  };

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] h-9 px-3 ${colorClasses[color] || colorClasses.default}`}
    >
      {icon && ICONS[icon]}
      {name}
    </button>
  );
};

const NavbarButtons = ({ buttons }) => {
  return (
    <div className="flex items-center gap-2">
      {buttons.map((button, index) => (
        <NavButton 
          key={index}
          name={button.name} 
          icon={button.icon} 
          color={button.color}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedRole = sessionStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(storedRole);

    const handleLoginEvent = () => {
      const newToken = sessionStorage.getItem('token');
      const newRole = sessionStorage.getItem('role');
      setIsAuthenticated(!!newToken);
      setRole(newRole);
    };

    window.addEventListener('login', handleLoginEvent);

    return () => {
      window.removeEventListener('login', handleLoginEvent);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  const getRoleButtons = () => {
    if (!isAuthenticated) {
      return [
        { name: 'Login', icon: 'login', color: 'default', onClick: () => navigate('/login') },
        { name: 'Signup', icon: 'signup', color: 'default', onClick: () => navigate('/signup') }
      ];
    }

    if (role === 'ADMIN') {
      return [
        { name: 'Users', icon: 'users', color: 'default', onClick: () => navigate('/users') },
        { name: 'Events', icon: 'events', color: 'default', onClick: () => navigate('/events') },
        { name: 'Feedbacks', icon: 'feedbacks', color: 'default', onClick: () => navigate('/feedbacks') },
        { name: 'Logout', icon: 'logout', color: 'red', onClick: handleLogout }
      ];
    }

    if (role === 'VIEWER') {
      return [
        { name: 'User Details', icon: 'details', color: 'default', onClick: () => navigate('/user/details') },
        { name: 'Events', icon: 'events', color: 'default', onClick: () => navigate('/events') },
        { name: 'Logout', icon: 'logout', color: 'red', onClick: handleLogout }
      ];
    }

    return [];
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
          EFS Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <NavbarButtons buttons={getRoleButtons()} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;