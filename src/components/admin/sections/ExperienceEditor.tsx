import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FormLayout, FormSection, TextInput, TextArea } from '../common/FormComponents';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface ExperienceItem {
  id: number;
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

const ExperienceEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  
  // Create local state for the experience section
  const [experiences, setExperiences] = useState<ExperienceItem[]>([...content.experience]);
  const [isSaving, setIsSaving] = useState(false);
  
  // States for editing experience
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExperienceItem>({
    id: Date.now(),
    position: '',
    company: '',
    location: '',
    duration: '',
    description: ['']
  });
  
  // States for description bullet points
  const [newBullet, setNewBullet] = useState('');
  const [editingBullet, setEditingBullet] = useState<{ expIndex: number, bulletIndex: number } | null>(null);
  const [editedBullet, setEditedBullet] = useState('');
  
  // Handle saving changes
  const handleSave = () => {
    setIsSaving(true);
    
    // Update the content in the context
    updateContent('experience', experiences);
    
    // Save changes to localStorage and update timestamp
    saveContent();
    localStorage.setItem('lastContentEdit', Date.now().toString());
    
    // UI feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };
  
  // Form handling
  const handleFormChange = (field: keyof ExperienceItem, value: any) => {
    if (field !== 'description') {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };
  
  // Add or update experience
  const handleFormSubmit = () => {
    if (!formData.position || !formData.company || !formData.duration) return;
    
    if (isEditing !== null) {
      // Update existing experience
      const updatedExperiences = [...experiences];
      updatedExperiences[isEditing] = formData;
      setExperiences(updatedExperiences);
    } else {
      // Add new experience
      setExperiences([...experiences, { ...formData, id: Date.now() }]);
    }
    
    // Reset form
    setFormData({
      id: Date.now(),
      position: '',
      company: '',
      location: '',
      duration: '',
      description: ['']
    });
    setShowForm(false);
    setIsEditing(null);
  };
  
  // Start editing an experience item
  const startEditing = (index: number) => {
    setIsEditing(index);
    setFormData(experiences[index]);
    setShowForm(true);
  };
  
  // Delete an experience item
  const deleteExperience = (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this experience?');
    if (confirmed) {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    }
  };
  
  // Move experience up in the list
  const moveExperienceUp = (index: number) => {
    if (index > 0) {
      const updatedExperiences = [...experiences];
      const temp = updatedExperiences[index];
      updatedExperiences[index] = updatedExperiences[index - 1];
      updatedExperiences[index - 1] = temp;
      setExperiences(updatedExperiences);
    }
  };
  
  // Move experience down in the list
  const moveExperienceDown = (index: number) => {
    if (index < experiences.length - 1) {
      const updatedExperiences = [...experiences];
      const temp = updatedExperiences[index];
      updatedExperiences[index] = updatedExperiences[index + 1];
      updatedExperiences[index + 1] = temp;
      setExperiences(updatedExperiences);
    }
  };
  
  // Add a bullet point to the current form
  const addBulletPoint = () => {
    if (!newBullet.trim()) return;
    
    const updatedDescription = [...formData.description, newBullet];
    setFormData({
      ...formData,
      description: updatedDescription
    });
    setNewBullet('');
  };
  
  // Remove a bullet point from the current form
  const removeBulletPoint = (index: number) => {
    const updatedDescription = [...formData.description];
    updatedDescription.splice(index, 1);
    setFormData({
      ...formData,
      description: updatedDescription
    });
  };
  
  // Start editing a bullet point
  const startEditingBullet = (bulletIndex: number) => {
    setEditingBullet({ expIndex: isEditing !== null ? isEditing : 0, bulletIndex });
    setEditedBullet(formData.description[bulletIndex]);
  };
  
  // Save the edited bullet point
  const saveBulletEdit = () => {
    if (editingBullet === null || !editedBullet.trim()) return;
    
    const updatedDescription = [...formData.description];
    updatedDescription[editingBullet.bulletIndex] = editedBullet;
    
    setFormData({
      ...formData,
      description: updatedDescription
    });
    
    setEditingBullet(null);
    setEditedBullet('');
  };
  
  return (
    <FormLayout
      title="Edit Experience Section"
      description="Update your work history and professional experience"
      onSave={handleSave}
      isLoading={isSaving}
    >
      {/* Experience List */}
      <FormSection
        title="Experience Items"
        description="Manage your work history and professional experience"
      >
        <div className="space-y-4 mb-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white flex-1">
                  {experience.position} at {experience.company}
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => moveExperienceUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => moveExperienceDown(index)}
                    disabled={index === experiences.length - 1}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    onClick={() => startEditing(index)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteExperience(index)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>{experience.location}</span>
                  <span>{experience.duration}</span>
                </div>
                
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {experience.description.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {!showForm ? (
          <button
            onClick={() => {
              setFormData({
                id: Date.now(),
                position: '',
                company: '',
                location: '',
                duration: '',
                description: ['']
              });
              setIsEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <FaPlus className="mr-2" /> Add New Experience
          </button>
        ) : (
          <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {isEditing !== null ? 'Edit Experience' : 'Add New Experience'}
            </h4>
            
            <div className="space-y-4">
              <TextInput
                label="Job Title/Position"
                id="position"
                value={formData.position}
                onChange={(e) => handleFormChange('position', e.target.value)}
                required
              />
              
              <TextInput
                label="Company/Organization"
                id="company"
                value={formData.company}
                onChange={(e) => handleFormChange('company', e.target.value)}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Location"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  helpText="City, Country or Remote"
                />
                
                <TextInput
                  label="Duration"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleFormChange('duration', e.target.value)}
                  required
                  helpText="Example: 2019 - Present or Jan 2020 - Dec 2021"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description Bullet Points
                </label>
                
                <div className="space-y-3 mb-4">
                  {formData.description.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      {editingBullet && editingBullet.bulletIndex === bulletIndex ? (
                        <>
                          <span className="mt-2.5">•</span>
                          <div className="flex-1">
                            <TextArea
                              label=""
                              id={`bullet-${bulletIndex}`}
                              value={editedBullet}
                              onChange={(e) => setEditedBullet(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={saveBulletEdit}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                <FaCheck className="mr-1" /> Save
                              </button>
                              <button
                                onClick={() => setEditingBullet(null)}
                                className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                <FaTimes className="mr-1" /> Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="mt-1">•</span>
                          <div className="flex-1">
                            <div className="text-gray-700 dark:text-gray-300">{bullet}</div>
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => startEditingBullet(bulletIndex)}
                                className="inline-flex items-center px-2 py-1 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                              >
                                <FaEdit className="mr-1" /> Edit
                              </button>
                              <button
                                onClick={() => removeBulletPoint(bulletIndex)}
                                className="inline-flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <FaTrash className="mr-1" /> Remove
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <TextArea
                      label="New Bullet Point"
                      id="new-bullet"
                      value={newBullet}
                      onChange={(e) => setNewBullet(e.target.value)}
                      rows={2}
                      helpText="Describe achievements, responsibilities, or key projects"
                    />
                  </div>
                  <button
                    onClick={addBulletPoint}
                    disabled={!newBullet.trim()}
                    className="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-3">
                <button
                  onClick={handleFormSubmit}
                  disabled={!formData.position || !formData.company || !formData.duration}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheck className="mr-2" /> {isEditing !== null ? 'Update Experience' : 'Add Experience'}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </FormSection>
    </FormLayout>
  );
};

export default ExperienceEditor; 