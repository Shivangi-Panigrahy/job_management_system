import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-8">
        <a
          href={user?.role === 'admin' ? '/admin' : '/dashboard'}
          className="text-xl font-bold tracking-tight hover:text-indigo-400 transition-colors"
        >
          {user?.role === 'admin' ? 'Admin Dashboard' : 'Job Management System'}
        </a>
        <div className="hidden md:flex gap-4">
          {user?.role === 'admin' ? (
            <a href="/admin" className="hover:text-indigo-400 transition-colors font-medium">Admin Dashboard</a>
          ) : (
            <a href="/dashboard" className="hover:text-indigo-400 transition-colors font-medium">My Jobs</a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-gray-300 mr-2">
          Welcome, <span className="font-semibold text-white">{user?.name}</span> <span className="text-xs bg-gray-700 px-2 py-0.5 rounded ml-1">{user?.role}</span>
        </span>
        <button
          onClick={handleLogout}
          className="border border-white rounded px-4 py-1.5 hover:bg-white hover:text-gray-900 transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar; 