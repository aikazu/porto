import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ScrollDownButton from '../common/ScrollDownButton';

const Projects = () => {
  // Project data - in a real application, this would come from a data file or API
  const allProjects = [
    {
      id: 1,
      title: 'Enterprise Security Assessment',
      description: 'Comprehensive security assessment and penetration testing for a large enterprise, including vulnerability analysis and remediation recommendations.',
      image: 'https://placehold.co/600x400/eee/333?text=Security+Assessment',
      category: 'security',
      tags: ['VAPT', 'ISO 27001', 'Security+'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      id: 2,
      title: 'Infrastructure Modernization',
      description: 'End-to-end infrastructure upgrade project including server deployment, backup solutions, and security hardening.',
      image: 'https://placehold.co/600x400/eee/333?text=Infrastructure+Project',
      category: 'infrastructure',
      tags: ['Servers', 'Backup Systems', 'Security'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      id: 3,
      title: 'Security Operations Center',
      description: 'Design and implementation of a SOC with integrated monitoring, incident response, and threat detection capabilities.',
      image: 'https://placehold.co/600x400/eee/333?text=SOC+Implementation',
      category: 'security',
      tags: ['SIEM', 'Incident Response', 'Monitoring'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      id: 4,
      title: 'Disaster Recovery Solution',
      description: 'Implementation of comprehensive disaster recovery and business continuity solution for critical systems.',
      image: 'https://placehold.co/600x400/eee/333?text=DR+Solution',
      category: 'infrastructure',
      tags: ['DR', 'Backup', 'High Availability'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      id: 5,
      title: 'ISO 27001 Compliance',
      description: 'Led organization through ISO 27001 certification process, including gap analysis, implementation, and audit preparation.',
      image: 'https://placehold.co/600x400/eee/333?text=ISO+27001',
      category: 'security',
      tags: ['ISO 27001', 'Compliance', 'Audit'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      id: 6,
      title: 'Network Security Overhaul',
      description: 'Complete network security redesign including segmentation, firewall implementation, and security monitoring.',
      image: 'https://placehold.co/600x400/eee/333?text=Network+Security',
      category: 'infrastructure',
      tags: ['Network Security', 'Firewalls', 'Monitoring'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com'
    }
  ];

  // Filter categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'infrastructure', name: 'IT Infrastructure' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState(allProjects);

  // Filter projects based on category
  const filterProjects = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setProjects(allProjects);
    } else {
      const filteredProjects = allProjects.filter(project => project.category === category);
      setProjects(filteredProjects);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="section bg-white dark:bg-gray-900 relative">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filterProjects(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-pressed={activeCategory === category.id}
                aria-label={`Filter by ${category.name}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="card"
              variants={projectVariants}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <FaGithub className="mr-2" />
                    <span>Code</span>
                  </a>
                  
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <span>Live Demo</span>
                    <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More Projects Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            See More On GitHub
          </a>
        </motion.div>
      </div>
      <ScrollDownButton targetSection="experience" />
    </section>
  );
};

export default Projects; 