import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ICONS = {
  login: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  ),
  signup: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  events: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  feedbacks: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
  details: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

const NavButton = ({ name, icon, color, onClick, isMobile = false }) => {
  if (name === null) return null;

  const colorClasses = {
    cyan: 'text-cyan-500 hover:bg-cyan-50',
    blue: 'text-blue-500 hover:bg-blue-50',
    yellow: 'text-yellow-500 hover:bg-yellow-50',
    orange: 'text-orange-500 hover:bg-orange-50',
    red: 'text-red-500 hover:bg-red-50',
    default: 'text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors ${colorClasses[color] || colorClasses.default} ${
        isMobile ? 'w-full justify-start' : ''
      }`}
    >
      {icon && ICONS[icon]}
      {name}
    </button>
  );
};

const NavbarButtons = ({ buttons, isMobile = false }) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center gap-1'}`}>
      {buttons.map((button, index) => (
        <NavButton 
          key={index}
          name={button.name} 
          icon={button.icon} 
          color={button.color}
          onClick={button.onClick}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('login', handleLoginEvent);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('login', handleLoginEvent);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    setRole(null);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const getRoleButtons = () => {
    if (!isAuthenticated) {
      return [
        { name: 'Login', icon: 'login', color: 'cyan', onClick: () => { navigate('/login'); setMobileMenuOpen(false); } },
        { name: 'Signup', icon: 'signup', color: 'blue', onClick: () => { navigate('/signup'); setMobileMenuOpen(false); } }
      ];
    }

    if (role === 'ADMIN') {
      return [
        { name: 'Users', icon: 'users', color: 'cyan', onClick: () => { navigate('/users'); setMobileMenuOpen(false); } },
        { name: 'Events', icon: 'events', color: 'yellow', onClick: () => { navigate('/events'); setMobileMenuOpen(false); } },
        { name: 'Feedbacks', icon: 'feedbacks', color: 'orange', onClick: () => { navigate('/feedbacks'); setMobileMenuOpen(false); } },
        { name: 'Logout', icon: 'logout', color: 'red', onClick: handleLogout }
      ];
    }

    if (role === 'VIEWER') {
      return [
        { name: 'My Details', icon: 'details', color: 'blue', onClick: () => { navigate('/user/details'); setMobileMenuOpen(false); } },
        { name: 'Events', icon: 'events', color: 'yellow', onClick: () => { navigate('/events'); setMobileMenuOpen(false); } },
        { name: 'Logout', icon: 'logout', color: 'red', onClick: handleLogout }
      ];
    }

    return [];
  };

  const buttons = getRoleButtons();

  return (
    <nav className={` w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-600 to-blue-800 py-3'}`}>
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-xl font-bold transition-colors ${scrolled ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'}`}
            >
              EFS Dashboard
            </Link>
          </div>

          <div className="hidden md:flex px-4 items-center space-x-1">
            <NavbarButtons buttons={buttons} />
          </div>

          <div className="md:hidden flex px-4 items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-blue-700'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? ICONS.close : ICONS.menu}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-2' : 'max-h-0'}`}>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-2">
            <NavbarButtons buttons={buttons} isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;