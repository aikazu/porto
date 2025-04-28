import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ScrollDownButton from '../common/ScrollDownButton';
import { useContent } from '../../context/ContentContext';
import { optimizeImage, generateSrcSet } from '../../utils/imageOptimizer';

const Projects = () => {
  const { content } = useContent();
  const allProjects = content.projects;

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
                  src={optimizeImage(project.image, { width: 600, height: 400, quality: 80 })}
                  srcSet={generateSrcSet(project.image, [300, 600, 900])}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={project.title} 
                  loading="lazy"
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