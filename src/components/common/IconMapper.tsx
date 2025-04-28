import { FaCode, FaServer, FaShieldAlt, FaDatabase, FaCloud, FaNetworkWired } from 'react-icons/fa';

// Map of icon strings to actual React components
export const iconMap = {
  FaCode,
  FaServer,
  FaShieldAlt,
  FaDatabase,
  FaCloud,
  FaNetworkWired
};

// Function to get the icon component from string name
export function getIconComponent(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap] || FaCode;
}

interface DynamicIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

// Component to render a dynamic icon by name
export const DynamicIcon = ({ iconName, size = 24, className = '' }: DynamicIconProps) => {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent size={size} className={className} />;
};
