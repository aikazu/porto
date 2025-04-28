import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSiteSettings } from './SiteSettingsContext';

interface ThemeContextType {
  toggleDarkMode: () => void;
  changePrimaryColor: (color: string) => void;
  adjustColor: (hex: string, amount: number) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to darken/lighten color
const adjustColor = (hex: string, amount: number): string => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { settings, updateSettings, isDark } = useSiteSettings();

  // Apply color derivatives when primary color changes
  useEffect(() => {
    // Set color derivatives for use in tailwind classes
    document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
    document.documentElement.style.setProperty('--color-primary-600', settings.primaryColor);
    document.documentElement.style.setProperty('--color-primary-700', adjustColor(settings.primaryColor, -20));
  }, [settings.primaryColor]);

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const changePrimaryColor = (color: string) => {
    updateSettings({ primaryColor: color });
  };

  return (
    <ThemeContext.Provider value={{ 
      toggleDarkMode, 
      changePrimaryColor,
      adjustColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 