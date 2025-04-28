import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaBriefcase, 
  FaCode, 
  FaGraduationCap, 
  FaEnvelope,
  FaCog 
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

// Sidebar menu items
const menuItems = [
  { path: '/admin/about', icon: <FaUser />, text: 'About' },
  { path: '/admin/projects', icon: <FaBriefcase />, text: 'Projects' },
  { path: '/admin/skills', icon: <FaCode />, text: 'Skills' },
  { path: '/admin/experience', icon: <FaGraduationCap />, text: 'Experience' },
  { path: '/admin/contact', icon: <FaEnvelope />, text: 'Contact' },
  { path: '/admin/settings', icon: <FaCog />, text: 'Settings' }
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-1">Portfolio Admin</h1>
        <p className="text-gray-400 text-sm">Manage your content</p>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-md transition-colors ${
              pathname === item.path 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 w-full px-4">
        <Link 
          to="/" 
          className="block mb-2 p-3 text-center rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          View Site
        </Link>
        <button 
          onClick={logout}
          className="w-full p-3 text-center rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 