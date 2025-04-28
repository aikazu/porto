import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/aikazu', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/iqbalattila', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/iqbalattila', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:attila.iqbal@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {currentYear} Iqbal Attila. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Designed and built with ❤️ using React, TypeScript, and TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 