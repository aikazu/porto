import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaServer, FaLinux, FaLaptopCode,
  FaTasks, FaBug, FaClipboardCheck, FaPeopleArrows,
  FaFileAlt
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import ScrollDownButton from '../common/ScrollDownButton';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cybersecurity',
      skills: [
        { name: 'Information Security', icon: FaShieldAlt, color: 'text-blue-600' },
        { name: 'Penetration Testing', icon: FaBug, color: 'text-red-500' },
        { name: 'CompTIA Security+', icon: FaShieldAlt, color: 'text-green-500' },
        { name: 'Cybersecurity', icon: FaShieldAlt, color: 'text-purple-500' },
      ]
    },
    {
      title: 'IT Infrastructure',
      skills: [
        { name: 'Linux System Administration', icon: FaLinux, color: 'text-yellow-500' },
        { name: 'ISO 27001', icon: FaFileAlt, color: 'text-blue-500' },
        { name: 'Web Application Security', icon: FaLaptopCode, color: 'text-cyan-500' },
        { name: 'Network Security', icon: SiCisco, color: 'text-indigo-500' },
      ]
    },
    {
      title: 'Professional Skills',
      skills: [
        { name: 'Problem Solving', icon: FaTasks, color: 'text-orange-500' },
        { name: 'Troubleshooting', icon: FaClipboardCheck, color: 'text-pink-500' },
        { name: 'Interpersonal Skills', icon: FaPeopleArrows, color: 'text-teal-500' },
        { name: 'Project Management', icon: FaServer, color: 'text-gray-500' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <div className="space-y-10">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <motion.h3 
                className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {category.title}
              </motion.h3>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  
                  return (
                    <motion.div 
                      key={skillIndex}
                      className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                      variants={itemVariants}
                    >
                      <div className={`text-4xl mb-4 ${skill.color}`}>
                        <Icon />
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200 text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            I'm constantly expanding my skill set to stay current with the latest technologies and security practices.
          </p>
          <a 
            href="#projects" 
            className="btn btn-outline"
          >
            See My Work
          </a>
        </motion.div>

        <ScrollDownButton targetSection="projects" />
      </div>
    </section>
  );
};

export default Skills; 