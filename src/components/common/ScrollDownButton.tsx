import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

interface ScrollDownButtonProps {
  targetSection: string;
}

const ScrollDownButton = ({ targetSection }: ScrollDownButtonProps) => {
  return (
    <div className="w-full flex justify-center mt-16">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <a 
          href={`#${targetSection}`}
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          aria-label={`Scroll to ${targetSection} section`}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <FaArrowDown />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};

export default ScrollDownButton; 