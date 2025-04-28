import React, { useState, useEffect } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FormLayout, FormSection } from '../common/FormComponents';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ContactFormData {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

const ContactEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<ContactFormData>({
    defaultValues: content.contact
  });
  
  // Update form values when content changes
  useEffect(() => {
    reset(content.contact);
  }, [content.contact, reset]);
  
  // Handle form submission
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    setIsSaving(true);
    
    // Update the content in the context
    updateContent('contact', data);
    
    // Save changes to localStorage and update timestamp
    saveContent();
    localStorage.setItem('lastContentEdit', Date.now().toString());
    
    // UI feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };
  
  return (
    <FormLayout
      title="Edit Contact Section"
      description="Update your contact information and form settings"
      onSave={handleSubmit(onSubmit)}
      isLoading={isSaving}
    >
      <FormSection
        title="Contact Information"
        description="Edit your contact details and information"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Section Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
            {...register('title', { 
              required: 'Title is required' 
            })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description should be at least 10 characters'
              }
            })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A brief message to encourage people to contact you</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your professional email address</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
            {...register('phone', { 
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Please enter a valid phone number'
              }
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your contact phone number (optional)</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location/Address
          </label>
          <input
            id="address"
            type="text"
            className={`mt-1 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
            {...register('address')}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your location or business address</p>
        </div>
      </FormSection>
    </FormLayout>
  );
};

export default ContactEditor; 