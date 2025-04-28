import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaHome, FaBars, FaTimes, FaUser, FaProjectDiagram, FaTools, FaBriefcase, FaAddressCard, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Navigation links
  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: <FaHome className="mr-3" /> },
    { to: '/admin/hero', label: 'Hero Section', icon: <FaUser className="mr-3" /> },
    { to: '/admin/about', label: 'About Section', icon: <FaAddressCard className="mr-3" /> },
    { to: '/admin/skills', label: 'Skills Section', icon: <FaTools className="mr-3" /> },
    { to: '/admin/projects', label: 'Projects Section', icon: <FaProjectDiagram className="mr-3" /> },
    { to: '/admin/experience', label: 'Experience Section', icon: <FaBriefcase className="mr-3" /> },
    { to: '/admin/contact', label: 'Contact Section', icon: <FaEnvelope className="mr-3" /> },
    { to: '/admin/settings', label: 'Settings', icon: <FaCog className="mr-3" /> },
  ];

  // Check if the current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0 flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold">Admin Panel</span>
          </div>
          <button 
            className="text-gray-400 hover:text-white md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600 text-white">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 px-2 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(link.to)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-gray-700 hover:text-red-300"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="w-full h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4">
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="h-6 w-6" />
          </button>
          
          <div className="ml-auto flex items-center">
            <a 
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              View Website
            </a>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 