import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import ContactForm, { ContactFormData } from '../common/ContactForm';
import ContactInfo from '../common/ContactInfo';
import ErrorBoundary from '../common/ErrorBoundary';

const Contact = () => {
  const { content } = useContent();
  const { contact } = content;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    try {
      // In a real app, this would send data to a server
      // For demo purposes, we'll simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', data);
      
      // Simulate successful submission
      setFormStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {contact.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {contact.description}
          </p>
        </motion.div>
        
        {formStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg ${
              formStatus.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}
          >
            {formStatus.message}
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ErrorBoundary fallback={
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Unable to load contact information. Please refresh the page or try again later.
              </p>
            </div>
          }>
            <ContactInfo 
              email={contact.email} 
              phone={contact.phone} 
              address={contact.address} 
            />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contact Form</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Unable to load contact form. Please refresh the page or try again later.
              </p>
            </div>
          }>
            <ContactForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default Contact; 