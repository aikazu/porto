import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSiteSettings } from '../../../context/SiteSettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { FaTrash, FaExclamationTriangle, FaUpload } from 'react-icons/fa';

const SettingsEditor = () => {
  const { user } = useAuth();
  const { settings, updateSettings, resetSettings, saveSettings } = useSiteSettings();
  const { adjustColor } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // General settings - initialized from SiteSettings
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: settings.siteName,
    siteDescription: settings.siteDescription,
    headTitle: document.title,
    logo: settings.logoUrl,
    favicon: settings.faviconUrl,
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    fontPrimary: settings.fontPrimary,
    fontSecondary: settings.fontSecondary,
    enableDarkMode: settings.darkMode,
    showHero: settings.showHero,
    showProjects: settings.showProjects,
    showSkills: settings.showSkills,
    showExperience: settings.showExperience, 
    showTestimonials: settings.showTestimonials,
    showContact: settings.showContact,
    googleAnalyticsId: settings.googleAnalyticsId,
    metaKeywords: settings.metaKeywords.join(', '),
    metaImage: settings.metaImage,
    socialLinks: [...settings.socialLinks]
  });
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: 'admin@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load current site title and favicon on component mount
  useEffect(() => {
    // Get current title from document
    const currentTitle = document.title;
    
    // Get current favicon
    const faviconEl = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const currentFavicon = faviconEl ? faviconEl.href : '/favicon.svg';
    
    // Update settings with current values
    setGeneralSettings(prev => ({
      ...prev,
      headTitle: currentTitle,
      favicon: currentFavicon.replace(window.location.origin, '')
    }));
  }, []);

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAccountSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings({
      ...accountSettings,
      [name]: value
    });
  };
  
  const saveGeneralSettings = () => {
    setIsSaving(true);
    
    // First update document title directly
    document.title = generalSettings.headTitle;
    
    // Update SiteSettings
    updateSettings({
      siteName: generalSettings.siteTitle,
      siteDescription: generalSettings.siteDescription,
      logoUrl: generalSettings.logo,
      faviconUrl: generalSettings.favicon,
      primaryColor: generalSettings.primaryColor,
      secondaryColor: generalSettings.secondaryColor,
      fontPrimary: generalSettings.fontPrimary,
      fontSecondary: generalSettings.fontSecondary,
      darkMode: generalSettings.enableDarkMode,
      showHero: generalSettings.showHero,
      showProjects: generalSettings.showProjects,
      showSkills: generalSettings.showSkills,
      showExperience: generalSettings.showExperience,
      showTestimonials: generalSettings.showTestimonials,
      showContact: generalSettings.showContact,
      googleAnalyticsId: generalSettings.googleAnalyticsId,
      metaKeywords: generalSettings.metaKeywords.split(',').map(keyword => keyword.trim()),
      metaImage: generalSettings.metaImage,
      socialLinks: generalSettings.socialLinks
    });
    
    // Save settings to localStorage using SiteSettingsContext
    saveSettings();
    
    setIsSaving(false);
    alert('General settings saved!');
  };
  
  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload this to your server/CDN
    // For now, we'll create an object URL to simulate
    const objectUrl = URL.createObjectURL(file);
    setGeneralSettings({
      ...generalSettings,
      favicon: objectUrl
    });
    
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };
  
  const saveAccountSettings = () => {
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setAccountSettings({
        ...accountSettings,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Account settings updated!');
    }, 1000);
  };

  // Handle content reset
  const resetAllContent = () => {
    if (window.confirm('Are you sure you want to reset all content to default? This action cannot be undone.')) {
      // Reset site settings using the SiteSettingsContext
      resetSettings();
      
      // Clear additional localStorage items
      localStorage.removeItem('websiteContent');
      localStorage.removeItem('lastContentEdit');
      
      alert('All settings have been reset to default values');
      
      // Reload the page to reflect changes
      window.location.reload();
    }
  };
  
  // Export current content as JSON
  const exportContent = () => {
    try {
      const content = localStorage.getItem('websiteContent');
      
      if (!content) {
        alert('No content to export!');
        return;
      }
      
      // Create a blob to download
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-content-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to export content!');
      console.error(err);
    }
  };
  
  // Import content from file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        
        if (typeof content !== 'string') {
          throw new Error('Invalid file content');
        }
        
        // Validate JSON
        JSON.parse(content);
        
        // Store content in localStorage
        localStorage.setItem('websiteContent', content);
        localStorage.setItem('lastContentEdit', Date.now().toString());
        
        alert('Content imported successfully! Please refresh the page to see changes.');
      } catch (err) {
        alert('Failed to import content! Invalid JSON format.');
        console.error(err);
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  // Add code to handle adding and removing social links
  const addSocialLink = () => {
    setGeneralSettings(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updatedLinks = [...generalSettings.socialLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };
    
    setGeneralSettings(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = generalSettings.socialLinks.filter((_, i) => i !== index);
    setGeneralSettings(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  // Save general settings with preview color changes
  const previewColorChange = (color: string) => {
    // Preview the primary color with its derivatives using adjustColor from ThemeContext
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--color-primary', color);
    document.documentElement.style.setProperty('--color-primary-600', color);
    document.documentElement.style.setProperty('--color-primary-700', adjustColor(color, -20));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setGeneralSettings({...generalSettings, primaryColor: newColor});
    previewColorChange(newColor);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">General Settings</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Site Title
            </label>
            <input
              type="text"
              name="siteTitle"
              value={generalSettings.siteTitle}
              onChange={handleGeneralSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Site Description
            </label>
            <input
              type="text"
              name="siteDescription"
              value={generalSettings.siteDescription}
              onChange={handleGeneralSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Browser Tab Title
            </label>
            <input
              type="text"
              name="headTitle"
              value={generalSettings.headTitle}
              onChange={handleGeneralSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The text that appears in the browser tab
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Favicon
            </label>
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={generalSettings.favicon} 
                  alt="Favicon" 
                  className="max-w-full max-h-full"
                  onError={(e) => {
                    // If image fails to load, show placeholder
                    (e.target as HTMLImageElement).src = 'https://placehold.co/32x32?text=Icon';
                  }}
                />
              </div>
              <input
                type="text"
                name="favicon"
                value={generalSettings.favicon}
                onChange={handleGeneralSettingsChange}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <label
                htmlFor="favicon-upload"
                className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md transition-colors"
              >
                <FaUpload />
              </label>
              <input
                id="favicon-upload"
                type="file"
                accept="image/svg+xml,image/png,image/jpeg,image/x-icon"
                onChange={handleFaviconUpload}
                className="sr-only"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              URL path to the favicon or upload a new one (SVG, PNG, JPG, ICO)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Primary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="primaryColor"
                value={generalSettings.primaryColor}
                onChange={handleColorChange}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="color"
                value={generalSettings.primaryColor}
                onChange={handleColorChange}
                className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableDarkMode"
              name="enableDarkMode"
              checked={generalSettings.enableDarkMode}
              onChange={handleGeneralSettingsChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Enable Dark Mode
            </label>
          </div>
          
          <button
            onClick={saveGeneralSettings}
            disabled={isSaving}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save General Settings'}
          </button>
        </div>
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={accountSettings.email}
              onChange={handleAccountSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={accountSettings.currentPassword}
                  onChange={handleAccountSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={accountSettings.newPassword}
                  onChange={handleAccountSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={accountSettings.confirmPassword}
                  onChange={handleAccountSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <button
              onClick={saveAccountSettings}
              disabled={isSaving}
              className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isSaving ? 'Updating...' : 'Update Account'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Content Management</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Export Content</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Download a backup of your website content as a JSON file.
            </p>
            <button
              onClick={exportContent}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Export JSON
            </button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Import Content</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Import website content from a previously exported JSON file.
            </p>
            <div>
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
              >
                Import JSON
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="sr-only"
              />
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-red-800 dark:text-red-300 flex items-center mb-2">
              <FaExclamationTriangle className="mr-2" /> Reset Content
            </h4>
            <p className="text-red-600 dark:text-red-400 mb-4">
              Reset all website content to default values. This action cannot be undone.
            </p>
            {showResetConfirm ? (
              <div className="space-y-4">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Are you absolutely sure? All your content will be lost forever.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={resetAllContent}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrash className="mr-2" /> Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reset to Default
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">SEO Settings</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Keywords (comma separated)
            </label>
            <input
              type="text"
              name="metaKeywords"
              value={generalSettings.metaKeywords}
              onChange={handleGeneralSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Keywords for search engines, separated by commas
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Social Share Image
            </label>
            <input
              type="text"
              name="metaImage"
              value={generalSettings.metaImage}
              onChange={handleGeneralSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              URL to the image used when sharing on social media
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Social Links</h2>
          <button
            type="button"
            onClick={addSocialLink}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Link
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {generalSettings.socialLinks.map((link, index) => (
            <div key={index} className="flex space-x-2 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Platform (e.g., LinkedIn)"
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {generalSettings.socialLinks.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No social links added. Click "Add Link" to add your first social media link.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor; 