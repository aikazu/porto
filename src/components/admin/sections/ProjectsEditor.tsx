import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FormLayout, FormSection, TextInput, TextArea, TagsInput } from '../common/FormComponents';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface ProjectFormData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
}

const ProjectsEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  
  // Local state for projects
  const [projects, setProjects] = useState([...content.projects]);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const emptyProject: ProjectFormData = {
    id: Date.now(),
    title: '',
    description: '',
    image: 'https://placehold.co/600x400/eee/333?text=New+Project',
    category: 'security',
    tags: [],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com'
  };
  
  const [formData, setFormData] = useState<ProjectFormData>(emptyProject);
  
  // Categories for filtering
  const categories = [
    { value: 'security', label: 'Cybersecurity' },
    { value: 'infrastructure', label: 'IT Infrastructure' },
    { value: 'development', label: 'Development' },
    { value: 'consulting', label: 'Consulting' }
  ];
  
  // Save all changes
  const handleSave = () => {
    setIsSaving(true);
    
    // Update the content in the context
    updateContent('projects', projects);
    
    // Save to localStorage
    saveContent();
    localStorage.setItem('lastContentEdit', Date.now().toString());
    
    // UI feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };
  
  // Form handling
  const handleFormChange = (field: keyof ProjectFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Add or update project
  const handleFormSubmit = () => {
    if (isEditing !== null) {
      // Update existing project
      const updatedProjects = [...projects];
      updatedProjects[isEditing] = formData;
      setProjects(updatedProjects);
    } else {
      // Add new project
      setProjects([...projects, formData]);
    }
    
    // Reset form
    setFormData(emptyProject);
    setShowForm(false);
    setIsEditing(null);
  };
  
  // Start editing a project
  const startEditing = (index: number) => {
    setIsEditing(index);
    setFormData(projects[index]);
    setShowForm(true);
  };
  
  // Delete a project
  const deleteProject = (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };
  
  // Move project up in the list
  const moveProjectUp = (index: number) => {
    if (index > 0) {
      const updatedProjects = [...projects];
      const temp = updatedProjects[index];
      updatedProjects[index] = updatedProjects[index - 1];
      updatedProjects[index - 1] = temp;
      setProjects(updatedProjects);
    }
  };
  
  // Move project down in the list
  const moveProjectDown = (index: number) => {
    if (index < projects.length - 1) {
      const updatedProjects = [...projects];
      const temp = updatedProjects[index];
      updatedProjects[index] = updatedProjects[index + 1];
      updatedProjects[index + 1] = temp;
      setProjects(updatedProjects);
    }
  };
  
  return (
    <FormLayout
      title="Edit Projects Section"
      description="Add, update, or remove your portfolio projects"
      onSave={handleSave}
      isLoading={isSaving}
    >
      {/* Projects List */}
      <FormSection
        title="Projects"
        description="Manage your portfolio projects"
      >
        <div className="space-y-4 mb-6">
          {projects.map((project, index) => (
            <div key={project.id} className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white flex-1">
                  {project.title}
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => moveProjectUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => moveProjectDown(index)}
                    disabled={index === projects.length - 1}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
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
                    onClick={() => deleteProject(index)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex flex-col md:flex-row gap-4">
                <div className="md:w-48 flex-shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-md mr-2">
                      {categories.find(cat => cat.value === project.category)?.label || project.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {project.description.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>GitHub: {project.githubLink}</span>
                    <span>Live: {project.liveLink}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!showForm ? (
          <button
            onClick={() => {
              setFormData(emptyProject);
              setIsEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FaPlus className="mr-2" /> Add New Project
          </button>
        ) : (
          <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {isEditing !== null ? `Edit Project: ${projects[isEditing].title}` : 'Add New Project'}
            </h4>
            
            <div className="space-y-4">
              <TextInput
                label="Project Title"
                id="project-title"
                value={formData.title}
                onChange={(e) => handleFormChange('title', e.target.value)}
                required
              />
              
              <TextArea
                label="Description"
                id="project-description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                required
              />
              
              <TextInput
                label="Image URL"
                id="project-image"
                value={formData.image}
                onChange={(e) => handleFormChange('image', e.target.value)}
                required
                helpText="Enter an image URL or use the placeholder"
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <TagsInput
                label="Tags"
                id="project-tags"
                tags={formData.tags}
                setTags={(tags) => handleFormChange('tags', tags)}
                helpText="Add relevant skills and technologies used in this project"
              />
              
              <TextInput
                label="GitHub Link"
                id="project-github"
                value={formData.githubLink}
                onChange={(e) => handleFormChange('githubLink', e.target.value)}
              />
              
              <TextInput
                label="Live Demo Link"
                id="project-live"
                value={formData.liveLink}
                onChange={(e) => handleFormChange('liveLink', e.target.value)}
              />
              
              <div className="flex space-x-3 pt-3">
                <button
                  onClick={handleFormSubmit}
                  disabled={!formData.title || !formData.description}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheck className="mr-2" /> {isEditing !== null ? 'Update Project' : 'Add Project'}
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

export default ProjectsEditor; 