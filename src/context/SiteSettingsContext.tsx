import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

/**
 * Defines the structure for site settings
 * These settings control the global configuration of the portfolio site
 */
interface SiteSettings {
  // Basic site information
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  
  // Section visibility controls
  showHero: boolean;
  showProjects: boolean;
  showSkills: boolean;
  showExperience: boolean;
  showTestimonials: boolean;
  showContact: boolean;
  
  // Theme and appearance
  darkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
  fontPrimary: string;
  fontSecondary: string;
  
  // Analytics and SEO
  googleAnalyticsId: string;
  metaKeywords: string[];
  metaImage: string;
  
  // Social media links
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

/**
 * Default settings that are used when no settings are stored in localStorage
 * or when settings are reset
 */
const defaultSettings: SiteSettings = {
  siteName: 'Iqbal Attila Portfolio',
  siteDescription: 'IT Solution Architect & Cybersecurity Specialist',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  showHero: true,
  showProjects: true,
  showSkills: true,
  showExperience: true,
  showTestimonials: true,
  showContact: true,
  darkMode: false,
  primaryColor: '#3b82f6', // blue-500
  secondaryColor: '#6366f1', // indigo-500
  fontPrimary: "'Inter', sans-serif",
  fontSecondary: "'Poppins', sans-serif",
  googleAnalyticsId: '',
  metaKeywords: ['portfolio', 'developer', 'designer', 'cybersecurity', 'IT solutions'],
  metaImage: '/social-share.jpg',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/iqbalattila' },
    { platform: 'GitHub', url: 'https://github.com/aikazu' },
    { platform: 'Twitter', url: 'https://twitter.com/iqbalattila' }
  ]
};

/**
 * Context type definition that includes all the methods for interacting with settings
 */
interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  saveSettings: () => void;
  isDark: boolean; // Convenience property for theme checks
}

// Create context with undefined default value
const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

// Storage keys for localStorage - support both new and legacy
const STORAGE_KEY = 'site_settings';
const LEGACY_STORAGE_KEY = 'siteSettings';

interface SiteSettingsProviderProps {
  children: ReactNode;
}

/**
 * Provider component that makes site settings available to all children components
 */
export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [initialized, setInitialized] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        // First try to load from new storage key
        let storedSettings = localStorage.getItem(STORAGE_KEY);
        
        // If not found, try legacy storage key
        if (!storedSettings) {
          storedSettings = localStorage.getItem(LEGACY_STORAGE_KEY);
          
          // If found in legacy key, migrate to new key format
          if (storedSettings) {
            localStorage.setItem(STORAGE_KEY, storedSettings);
            console.log('Migrated settings from legacy storage key');
          }
        }
        
        if (storedSettings) {
          // Parse stored settings and merge with default settings to ensure all properties exist
          const parsedSettings = JSON.parse(storedSettings);
          setSettings({
            ...defaultSettings,
            ...parsedSettings
          });
        }
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
        // Fall back to default settings
        setSettings(defaultSettings);
      } finally {
        setInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Update settings with partial new settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  };

  // Save to localStorage
  const saveSettings = () => {
    try {
      const settingsJSON = JSON.stringify(settings);
      localStorage.setItem(STORAGE_KEY, settingsJSON);
      // Also update the legacy key for backward compatibility
      localStorage.setItem(LEGACY_STORAGE_KEY, settingsJSON);
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  };

  // Apply settings to document when settings change
  useEffect(() => {
    if (!initialized) return;

    // Update document title
    document.title = settings.siteName;

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = settings.faviconUrl;
    }

    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply primary color as CSS variable
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    
    // Apply secondary color as CSS variable
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    
    // Apply font variables
    document.documentElement.style.setProperty('--font-primary', settings.fontPrimary);
    document.documentElement.style.setProperty('--font-secondary', settings.fontSecondary);

    // Save settings to localStorage
    saveSettings();
  }, [settings, initialized]);

  return (
    <SiteSettingsContext.Provider 
      value={{ 
        settings, 
        updateSettings, 
        resetSettings, 
        saveSettings,
        isDark: settings.darkMode 
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

/**
 * Custom hook for using the site settings context
 * Throws an error if used outside of a SiteSettingsProvider
 */
export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}; 