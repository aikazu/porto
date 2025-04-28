import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { FaEdit, FaSave, FaUser, FaAddressCard, FaTools, FaProjectDiagram, FaBriefcase, FaEnvelope, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { content, saveContent } = useContent();
  const { saveSettings } = useSiteSettings();

  // Define the section cards for quick navigation
  const sectionCards = [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Edit your main landing section content',
      icon: <FaUser className="h-8 w-8 text-primary-500" />,
      link: '/admin/hero'
    },
    {
      id: 'about',
      title: 'About Section',
      description: 'Update your personal information and services',
      icon: <FaAddressCard className="h-8 w-8 text-primary-500" />,
      link: '/admin/about'
    },
    {
      id: 'skills',
      title: 'Skills Section',
      description: 'Manage your technical skills and expertise',
      icon: <FaTools className="h-8 w-8 text-primary-500" />,
      link: '/admin/skills'
    },
    {
      id: 'projects',
      title: 'Projects Section',
      description: 'Add or edit your portfolio projects',
      icon: <FaProjectDiagram className="h-8 w-8 text-primary-500" />,
      link: '/admin/projects'
    },
    {
      id: 'experience',
      title: 'Experience Section',
      description: 'Update your work history and achievements',
      icon: <FaBriefcase className="h-8 w-8 text-primary-500" />,
      link: '/admin/experience'
    },
    {
      id: 'contact',
      title: 'Contact Section',
      description: 'Edit your contact information and form settings',
      icon: <FaEnvelope className="h-8 w-8 text-primary-500" />,
      link: '/admin/contact'
    },
    {
      id: 'settings',
      title: 'Site Settings',
      description: 'Configure global site settings and appearance',
      icon: <FaCog className="h-8 w-8 text-primary-500" />,
      link: '/admin/settings'
    }
  ];

  // Handle saving all content
  const handleSaveAll = () => {
    saveContent();
    saveSettings();
    alert('All content has been saved!');
  };

  // Get the last edited time from localStorage
  const getLastEditedTime = () => {
    const timestamp = localStorage.getItem('lastContentEdit');
    if (!timestamp) return 'Never';
    
    return new Date(parseInt(timestamp)).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Welcome and quick actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your portfolio content from this dashboard
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaSave className="mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Last Edited</p>
            <p className="text-gray-900 dark:text-white mt-1">{getLastEditedTime()}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Storage</p>
            <p className="text-gray-900 dark:text-white mt-1">Using Local Storage</p>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionCards.map((card) => (
          <div key={card.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {card.icon}
                  <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
              <div className="mt-6">
                <Link
                  to={card.link}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FaEdit className="mr-2" />
                  Edit Section
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Tips</h3>
        <ul className="mt-2 list-disc list-inside text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>Changes are saved in your browser's local storage</li>
          <li>Click "Save All Changes" to persist your edits</li>
          <li>Visit the website to see your changes in real-time</li>
          <li>Clear your browser cache to reset to default content</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 