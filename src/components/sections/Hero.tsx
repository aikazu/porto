import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import ScrollDownButton from '../common/ScrollDownButton';
import { useContent } from '../../context/ContentContext';
import { optimizeImage, generateSrcSet } from '../../utils/imageOptimizer';

const Hero = () => {
  const { content } = useContent();
  const { hero } = content;
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Content */}
      <div className="container relative z-10 flex flex-col">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block text-primary-600 dark:text-primary-400 text-lg font-medium mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hi there, I'm
            </motion.span>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {hero.title}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-primary-600 dark:text-primary-400">{hero.subtitle}</span> passionate about creating impactful applications
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {hero.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a href={hero.ctaLink} className="btn btn-primary">
                {hero.ctaText}
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </motion.div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img 
                src={optimizeImage(hero.profileImage || "https://placehold.co/400x400/eee/333?text=Profile+Image", { width: 320, height: 320, quality: 90 })}
                srcSet={generateSrcSet(hero.profileImage || "https://placehold.co/400x400/eee/333?text=Profile+Image", [160, 320, 480])}
                sizes="(max-width: 640px) 256px, 320px"
                alt={hero.title} 
                className="w-full h-full object-cover"
                loading="eager"
                width={320}
                height={320}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <ScrollDownButton targetSection="about" />
      </div>
    </section>
  );
};

export default Hero; 