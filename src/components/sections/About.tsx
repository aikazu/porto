import { motion } from 'framer-motion';
import ScrollDownButton from '../common/ScrollDownButton';
import { useContent } from '../../context/ContentContext';
import { DynamicIcon } from '../common/IconMapper';

const About = () => {
  const { content } = useContent();
  const { introduction, services } = content.about;

  return (
    <section id="about" className="section bg-white dark:bg-gray-900">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Get to know me
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              {introduction.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="btn btn-primary">
                Let's Talk
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400">
                  <DynamicIcon iconName={service.icon} size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <ScrollDownButton targetSection="skills" />
      </div>
    </section>
  );
};

export default About; 