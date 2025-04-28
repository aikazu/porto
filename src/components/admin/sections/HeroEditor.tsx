import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { processImage } from '../../../utils/imageUtils';

const HeroEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  const [heroContent, setHeroContent] = useState(content.hero);
  const [isSaving, setIsSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Set initial state from content
  useEffect(() => {
    if (content.hero) {
      setHeroContent(content.hero);
      
      // Make sure profileImage is defined before setting previewImage
      if (content.hero.profileImage) {
        setPreviewImage(content.hero.profileImage);
      }
    }
  }, [content.hero]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Update content and save to storage
    updateContent('hero', heroContent);
    saveContent();
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Hero content saved successfully!');
    }, 1000);
  };
  
  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleImageUpload(e.dataTransfer.files[0]);
    }
  };
  
  // Process and handle the image upload
  const handleImageUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      
      // Check if file is too large (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        return;
      }
      
      // Validate image type
      if (!file.type.match('image.*')) {
        alert('Selected file is not a valid image.');
        return;
      }
      
      // Use our processImage utility
      const resizedImage = await processImage(file, 400, 400, 0.9);
      
      if (!resizedImage) {
        throw new Error('Failed to process image');
      }
      
      // Set preview and update hero content
      setPreviewImage(resizedImage);
      setHeroContent(prev => ({
        ...prev,
        profileImage: resizedImage
      }));
      
      // Ensure content is updated immediately
      updateContent('hero', {
        ...heroContent,
        profileImage: resizedImage
      });
      
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Clear the selected image
  const clearImage = () => {
    setPreviewImage('');
    setHeroContent(prev => ({
      ...prev,
      profileImage: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Hero Section</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Name/Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name/Title
          </label>
          <input
            type="text"
            name="title"
            value={heroContent.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Your Name"
          />
        </div>
        
        {/* Subtitle/Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subtitle/Role
          </label>
          <input
            type="text"
            name="subtitle"
            value={heroContent.subtitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Your Professional Role"
          />
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={heroContent.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Brief description about yourself"
          />
        </div>
        
        {/* CTA Button Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              name="ctaText"
              value={heroContent.ctaText}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="View My Work"
            />
          </div>
          
          {/* CTA Button Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CTA Button Link
            </label>
            <input
              type="text"
              name="ctaLink"
              value={heroContent.ctaLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="#projects"
            />
          </div>
        </div>
        
        {/* Profile Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Image (Recommended: 400x400px)
          </label>
          
          <div 
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
              dragActive 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Processing image...</p>
                </div>
              ) : previewImage ? (
                <div className="relative w-40 h-40 mx-auto">
                  <img 
                    src={previewImage} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="profile-image-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span className="block p-2">Upload a file</span>
                      <input
                        id="profile-image-upload"
                        name="profile-image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </label>
                    <p className="pl-1 pt-2">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 5MB (will be resized to 400x400)
                  </p>
                  <div className="flex justify-center mt-2">
                    <FaUpload className="h-10 w-10 text-gray-400" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isProcessing}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Hero Content'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor; 