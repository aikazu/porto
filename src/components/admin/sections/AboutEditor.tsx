import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FormLayout, FormSection, TextInput, TextArea, SubmitButton } from '../common/FormComponents';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

interface AboutService {
  icon: string;
  title: string;
  description: string;
}

const AboutEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  
  // Create local state for the about section
  const [introduction, setIntroduction] = useState<string[]>([...content.about.introduction]);
  const [services, setServices] = useState<AboutService[]>([...content.about.services]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedParagraph, setEditedParagraph] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle service form
  const [newService, setNewService] = useState<AboutService>({
    icon: '',
    title: '',
    description: ''
  });
  const [isAddingService, setIsAddingService] = useState(false);
  
  // Available icon options (we'll use a simple approach for the demo)
  const iconOptions = [
    { value: 'FaShieldAlt', label: 'Shield (Security)' },
    { value: 'FaServer', label: 'Server (Infrastructure)' },
    { value: 'FaCode', label: 'Code (Development)' },
    { value: 'FaDatabase', label: 'Database' },
    { value: 'FaCloud', label: 'Cloud' },
    { value: 'FaNetworkWired', label: 'Network' }
  ];

  // Handle saving changes
  const handleSave = () => {
    setIsSaving(true);
    
    // Update the content in the context
    updateContent('about', {
      introduction,
      services
    });
    
    // Save changes to localStorage and update timestamp
    saveContent();
    localStorage.setItem('lastContentEdit', Date.now().toString());
    
    // UI feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  // Introduction paragraph handlers
  const startEditingParagraph = (index: number) => {
    setIsEditing(index);
    setEditedParagraph(introduction[index]);
  };

  const saveParagraphEdit = () => {
    if (isEditing !== null) {
      const newIntroduction = [...introduction];
      newIntroduction[isEditing] = editedParagraph;
      setIntroduction(newIntroduction);
      setIsEditing(null);
      setEditedParagraph('');
    }
  };

  const cancelParagraphEdit = () => {
    setIsEditing(null);
    setEditedParagraph('');
  };

  const addParagraph = () => {
    setIntroduction([...introduction, 'New paragraph']);
    startEditingParagraph(introduction.length);
  };

  const removeParagraph = (index: number) => {
    const newIntroduction = [...introduction];
    newIntroduction.splice(index, 1);
    setIntroduction(newIntroduction);
  };

  // Service handlers
  const handleNewServiceChange = (field: keyof AboutService, value: string) => {
    setNewService({
      ...newService,
      [field]: value
    });
  };

  const addService = () => {
    if (newService.title && newService.description) {
      setServices([...services, { ...newService }]);
      setNewService({
        icon: '',
        title: '',
        description: ''
      });
      setIsAddingService(false);
    }
  };

  const removeService = (index: number) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  return (
    <FormLayout
      title="Edit About Section"
      description="Update your personal information and services"
      onSave={handleSave}
      isLoading={isSaving}
    >
      {/* Introduction Content */}
      <FormSection
        title="About Introduction"
        description="Edit the paragraphs that appear in your about section"
      >
        <div className="space-y-4">
          {introduction.map((paragraph, index) => (
            <div key={index} className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
              {isEditing === index ? (
                <div>
                  <TextArea
                    label={`Paragraph ${index + 1}`}
                    id={`para-${index}`}
                    value={editedParagraph}
                    onChange={(e) => setEditedParagraph(e.target.value)}
                    rows={3}
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={saveParagraphEdit}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaCheck className="mr-1" /> Save
                    </button>
                    <button
                      onClick={cancelParagraphEdit}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <FaTimes className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{paragraph}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => startEditingParagraph(index)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => removeParagraph(index)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <button
            onClick={addParagraph}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FaPlus className="mr-2" /> Add Paragraph
          </button>
        </div>
      </FormSection>

      {/* Services */}
      <FormSection
        title="Services"
        description="Manage the services you offer"
      >
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{service.title}</h4>
                <button
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="mt-2">
                <p><strong>Icon:</strong> {service.icon}</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}

          {isAddingService ? (
            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Service</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Icon
                  </label>
                  <select
                    value={newService.icon}
                    onChange={(e) => handleNewServiceChange('icon', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select an icon</option>
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <TextInput
                  label="Title"
                  id="service-title"
                  value={newService.title}
                  onChange={(e) => handleNewServiceChange('title', e.target.value)}
                  required
                />
                
                <TextArea
                  label="Description"
                  id="service-description"
                  value={newService.description}
                  onChange={(e) => handleNewServiceChange('description', e.target.value)}
                  required
                />
                
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={addService}
                    disabled={!newService.title || !newService.description || !newService.icon}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCheck className="mr-2" /> Add Service
                  </button>
                  <button
                    onClick={() => setIsAddingService(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingService(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaPlus className="mr-2" /> Add Service
            </button>
          )}
        </div>
      </FormSection>
    </FormLayout>
  );
};

export default AboutEditor; 