import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SEOHead 
        title="Page Not Found | Iqbal Attila"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex={true}
      />
      
      <div className="container flex-grow flex flex-col items-center justify-center px-4 py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10 
            }}
          >
            404
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Don't worry, you can find your way back home.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Iqbal Attila. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFound; 