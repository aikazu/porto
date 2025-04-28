import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define content types based on website sections
interface AboutContent {
  introduction: string[];
  services: {
    icon: string;
    title: string;
    description: string;
  }[];
}

interface ProjectContent {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
}

interface SkillContent {
  category: string;
  skills: {
    name: string;
    level: number;
  }[];
}

interface ExperienceContent {
  id: number;
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  profileImage: string;
}

interface ContactContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
}

interface FooterContent {
  copyright: string;
  links: {
    title: string;
    url: string;
  }[];
  socialLinks: {
    platform: string;
    icon: string;
    url: string;
  }[];
}

interface WebsiteContent {
  about: AboutContent;
  projects: ProjectContent[];
  skills: SkillContent[];
  experience: ExperienceContent[];
  hero: HeroContent;
  contact: ContactContent;
  seo: SEOContent;
  footer: FooterContent;
}

interface ContentContextType {
  content: WebsiteContent;
  updateContent: (section: keyof WebsiteContent, newContent: any) => void;
  saveContent: () => void;
  resetContent: () => void;
  exportContent: () => string;
  importContent: (jsonData: string) => boolean;
  loading: boolean;
  error: string | null;
}

// Create context with default value
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Default content data - will be replaced by loaded data
const defaultContent: WebsiteContent = {
  about: {
    introduction: [
      "Hello! I'm Iqbal Attila, a seasoned IT professional with a decade of experience designing and implementing end-to-end technology solutions, from software architecture to infrastructure hardening.",
      "Currently, I'm an IT Solution Architect focusing on Cybersecurity products at PT Global Infotech Solution, handling various products and projects for clients across different industries.",
      "As a certified Security+ professional and an experienced IT Consultant, I have a strong background in cybersecurity and penetration testing. I've conducted vulnerability assessments and penetration testing reports for clients seeking ISO certification, and improved and maintained applications and servers for a fintech company.",
      "My experience spans from development and support to analysis and administration, allowing me to adapt to various project requirements while delivering comprehensive solutions."
    ],
    services: [
      {
        icon: "FaShieldAlt",
        title: "Cybersecurity",
        description: "Conducting comprehensive vulnerability assessments and penetration testing to identify and mitigate potential security risks."
      },
      {
        icon: "FaServer",
        title: "Infrastructure Solutions",
        description: "Implementing rack servers, backup solutions, and cybersecurity tools with seamless integration into client environments."
      },
      {
        icon: "FaCode",
        title: "IT Consulting",
        description: "Providing strategic guidance and solutions to enhance IT infrastructure and security posture for various clients."
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Enterprise Security Assessment",
      description: "Comprehensive security assessment and penetration testing for a large enterprise, including vulnerability analysis and remediation recommendations.",
      image: "https://placehold.co/600x400/eee/333?text=Security+Assessment",
      category: "security",
      tags: ["VAPT", "ISO 27001", "Security+"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    },
    {
      id: 2,
      title: "Network Infrastructure Redesign",
      description: "Complete redesign of corporate network infrastructure for improved security, performance, and scalability.",
      image: "https://placehold.co/600x400/eee/333?text=Network+Infrastructure",
      category: "infrastructure",
      tags: ["Network", "Cisco", "Security"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    },
    {
      id: 3,
      title: "Security Compliance Framework",
      description: "Development of a comprehensive security compliance framework aligned with ISO 27001 and industry best practices.",
      image: "https://placehold.co/600x400/eee/333?text=Compliance+Framework",
      category: "security",
      tags: ["Compliance", "ISO 27001", "Risk Management"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    }
  ],
  skills: [
    {
      category: "Cybersecurity",
      skills: [
        { name: "Penetration Testing", level: 90 },
        { name: "Vulnerability Assessment", level: 95 },
        { name: "ISO 27001", level: 85 }
      ]
    },
    {
      category: "Infrastructure",
      skills: [
        { name: "Network Architecture", level: 88 },
        { name: "Cloud Solutions", level: 85 },
        { name: "Server Administration", level: 82 }
      ]
    },
    {
      category: "Development",
      skills: [
        { name: "Backend Development", level: 75 },
        { name: "DevOps", level: 80 },
        { name: "API Design", level: 78 }
      ]
    }
  ],
  experience: [
    {
      id: 1,
      position: "IT Solution Architect",
      company: "PT Global Infotech Solution",
      location: "Jakarta, Indonesia",
      duration: "2019 - Present",
      description: [
        "Lead architect for cybersecurity solutions implementation",
        "Conducted security assessments for enterprise clients",
        "Managed cross-functional teams in delivering complex IT projects"
      ]
    },
    {
      id: 2,
      position: "Senior IT Consultant",
      company: "Tech Solutions, Inc.",
      location: "Jakarta, Indonesia",
      duration: "2016 - 2019",
      description: [
        "Provided strategic IT consulting services to enterprise clients",
        "Conducted vulnerability assessments and penetration testing",
        "Designed and implemented secure network architectures"
      ]
    },
    {
      id: 3,
      position: "IT Security Specialist",
      company: "SecureTech",
      location: "Bandung, Indonesia",
      duration: "2014 - 2016",
      description: [
        "Implemented security controls and monitoring systems",
        "Performed security audits and compliance assessments",
        "Developed security policies and procedures"
      ]
    }
  ],
  hero: {
    title: "Iqbal Attila",
    subtitle: "IT Solution Architect & Cybersecurity Specialist",
    description: "Designing secure, scalable technology solutions for modern businesses",
    ctaText: "View My Work",
    ctaLink: "#projects",
    profileImage: "https://placehold.co/600x400/eee/333?text=Profile+Image"
  },
  contact: {
    title: "Get In Touch",
    description: "Interested in working together? Feel free to contact me for any project or collaboration.",
    email: "contact@example.com",
    phone: "+1234567890",
    address: "Jakarta, Indonesia"
  },
  seo: {
    title: "Iqbal Attila | IT Solution Architect & Cybersecurity Specialist",
    description: "Professional portfolio of Iqbal Attila, an IT Solution Architect and Cybersecurity Specialist with over 10 years of experience in technology solutions and security.",
    keywords: ["IT Solution Architect", "Cybersecurity Specialist", "Portfolio", "Technology"],
    ogImage: "https://placehold.co/1200x630/eee/333?text=Iqbal+Attila",
    twitterHandle: "@iqbalattila"
  },
  footer: {
    copyright: "© 2023 Iqbal Attila. All rights reserved.",
    links: [
      { title: "Privacy Policy", url: "/privacy" },
      { title: "Terms of Service", url: "/terms" }
    ],
    socialLinks: [
      { platform: "LinkedIn", icon: "FaLinkedin", url: "https://linkedin.com/in/iqbalattila" },
      { platform: "GitHub", icon: "FaGithub", url: "https://github.com/aikazu" },
      { platform: "Twitter", icon: "FaTwitter", url: "https://twitter.com/iqbalattila" }
    ]
  }
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [content, setContent] = useState<WebsiteContent>(defaultContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load content from localStorage or API
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to get content from localStorage first
        const savedContent = localStorage.getItem('websiteContent');
        
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        } else {
          // In a real app, we would fetch from an API here
          // For now, we'll use the default content
          setContent(defaultContent);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Update content for a specific section
  const updateContent = (section: keyof WebsiteContent, newContent: any) => {
    setContent(prevContent => ({
      ...prevContent,
      [section]: newContent
    }));
  };

  // Save content to localStorage (in a real app, would save to API/database)
  const saveContent = () => {
    try {
      localStorage.setItem('websiteContent', JSON.stringify(content));
    } catch (err) {
      setError('Failed to save content');
    }
  };
  
  // Reset content to defaults
  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('websiteContent', JSON.stringify(defaultContent));
  };
  
  // Export content as JSON
  const exportContent = (): string => {
    return JSON.stringify(content, null, 2);
  };
  
  // Import content from JSON
  const importContent = (jsonData: string): boolean => {
    try {
      const parsedContent = JSON.parse(jsonData) as WebsiteContent;
      
      // Basic validation to ensure the JSON has the right structure
      if (!parsedContent.hero || !parsedContent.about || 
          !parsedContent.projects || !parsedContent.skills || 
          !parsedContent.experience || !parsedContent.contact) {
        throw new Error('Invalid content structure');
      }
      
      setContent(parsedContent);
      localStorage.setItem('websiteContent', jsonData);
      return true;
    } catch (err) {
      setError('Failed to import content: Invalid JSON format');
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      saveContent, 
      resetContent,
      exportContent,
      importContent,
      loading, 
      error 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use the content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}; 