import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FormLayout, FormSection, TextInput, NumberInput } from '../common/FormComponents';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SkillsEditor = () => {
  const { content, updateContent, saveContent } = useContent();
  
  // Create local state for the skills section
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([...content.skills]);
  const [isSaving, setIsSaving] = useState(false);
  
  // States for add/edit functionality
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  
  // States for skill editing
  const [editingSkill, setEditingSkill] = useState<{ categoryIndex: number, skillIndex: number } | null>(null);
  const [skillFormData, setSkillFormData] = useState<Skill>({ name: '', level: 80 });
  const [isAddingSkill, setIsAddingSkill] = useState<number | null>(null);
  
  // Handle saving changes
  const handleSave = () => {
    setIsSaving(true);
    
    // Update the content in the context
    updateContent('skills', skillCategories);
    
    // Save changes to localStorage and update timestamp
    saveContent();
    localStorage.setItem('lastContentEdit', Date.now().toString());
    
    // UI feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };
  
  // Category handling
  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    setSkillCategories([
      ...skillCategories,
      {
        category: newCategoryName,
        skills: []
      }
    ]);
    
    setNewCategoryName('');
    setIsAddingCategory(false);
  };
  
  const updateCategoryName = () => {
    if (editingCategory === null || !editingCategoryName.trim()) return;
    
    const updatedCategories = [...skillCategories];
    updatedCategories[editingCategory].category = editingCategoryName;
    setSkillCategories(updatedCategories);
    
    setEditingCategory(null);
    setEditingCategoryName('');
  };
  
  const removeCategory = (index: number) => {
    const updatedCategories = [...skillCategories];
    updatedCategories.splice(index, 1);
    setSkillCategories(updatedCategories);
  };
  
  const startEditingCategory = (index: number) => {
    setEditingCategory(index);
    setEditingCategoryName(skillCategories[index].category);
  };
  
  // Skills handling
  const addSkill = (categoryIndex: number) => {
    if (!skillFormData.name.trim()) return;
    
    const updatedCategories = [...skillCategories];
    updatedCategories[categoryIndex].skills.push({
      name: skillFormData.name,
      level: skillFormData.level
    });
    
    setSkillCategories(updatedCategories);
    setSkillFormData({ name: '', level: 80 });
    setIsAddingSkill(null);
  };
  
  const updateSkill = () => {
    if (editingSkill === null || !skillFormData.name.trim()) return;
    
    const { categoryIndex, skillIndex } = editingSkill;
    const updatedCategories = [...skillCategories];
    updatedCategories[categoryIndex].skills[skillIndex] = {
      name: skillFormData.name,
      level: skillFormData.level
    };
    
    setSkillCategories(updatedCategories);
    setEditingSkill(null);
    setSkillFormData({ name: '', level: 80 });
  };
  
  const startEditingSkill = (categoryIndex: number, skillIndex: number) => {
    const skill = skillCategories[categoryIndex].skills[skillIndex];
    setEditingSkill({ categoryIndex, skillIndex });
    setSkillFormData({ name: skill.name, level: skill.level });
  };
  
  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...skillCategories];
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
    setSkillCategories(updatedCategories);
  };
  
  const moveSkillUp = (categoryIndex: number, skillIndex: number) => {
    if (skillIndex === 0) return;
    
    const updatedCategories = [...skillCategories];
    const category = updatedCategories[categoryIndex];
    const temp = category.skills[skillIndex];
    category.skills[skillIndex] = category.skills[skillIndex - 1];
    category.skills[skillIndex - 1] = temp;
    
    setSkillCategories(updatedCategories);
  };
  
  const moveSkillDown = (categoryIndex: number, skillIndex: number) => {
    const category = skillCategories[categoryIndex];
    if (skillIndex === category.skills.length - 1) return;
    
    const updatedCategories = [...skillCategories];
    const temp = category.skills[skillIndex];
    category.skills[skillIndex] = category.skills[skillIndex + 1];
    category.skills[skillIndex + 1] = temp;
    
    setSkillCategories(updatedCategories);
  };
  
  const moveCategoryUp = (index: number) => {
    if (index === 0) return;
    
    const updatedCategories = [...skillCategories];
    const temp = updatedCategories[index];
    updatedCategories[index] = updatedCategories[index - 1];
    updatedCategories[index - 1] = temp;
    
    setSkillCategories(updatedCategories);
  };
  
  const moveCategoryDown = (index: number) => {
    if (index === skillCategories.length - 1) return;
    
    const updatedCategories = [...skillCategories];
    const temp = updatedCategories[index];
    updatedCategories[index] = updatedCategories[index + 1];
    updatedCategories[index + 1] = temp;
    
    setSkillCategories(updatedCategories);
  };
  
  return (
    <FormLayout
      title="Edit Skills Section"
      description="Manage your technical skills and expertise"
      onSave={handleSave}
      isLoading={isSaving}
    >
      {/* Skill Categories */}
      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <FormSection
            key={categoryIndex}
            title={category.category}
            description={`Skills related to ${category.category}`}
          >
            {/* Category header with actions */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1">
                {editingCategory === categoryIndex ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={updateCategoryName}
                      className="p-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditingCategory(categoryIndex)}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => removeCategory(categoryIndex)}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <FaTrash size={16} />
                    </button>
                    <button
                      onClick={() => moveCategoryUp(categoryIndex)}
                      disabled={categoryIndex === 0}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                    >
                      <FaArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => moveCategoryDown(categoryIndex)}
                      disabled={categoryIndex === skillCategories.length - 1}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                    >
                      <FaArrowDown size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  setIsAddingSkill(categoryIndex);
                  setSkillFormData({ name: '', level: 80 });
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <FaPlus className="mr-1" /> Add Skill
              </button>
            </div>
            
            {/* Skills List */}
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="border rounded-md p-3 bg-gray-50 dark:bg-gray-700 flex items-center justify-between"
                >
                  {editingSkill && 
                   editingSkill.categoryIndex === categoryIndex && 
                   editingSkill.skillIndex === skillIndex ? (
                    <div className="flex-1 flex flex-col md:flex-row gap-3">
                      <TextInput
                        label="Skill Name"
                        id={`skill-name-${categoryIndex}-${skillIndex}`}
                        value={skillFormData.name}
                        onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                        required
                      />
                      
                      <NumberInput
                        label="Proficiency Level"
                        id={`skill-level-${categoryIndex}-${skillIndex}`}
                        value={skillFormData.level}
                        onChange={(e) => setSkillFormData({ ...skillFormData, level: parseInt(e.target.value) })}
                        min={0}
                        max={100}
                      />
                      
                      <div className="flex items-end gap-2 pb-4">
                        <button
                          onClick={updateSkill}
                          className="p-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => setEditingSkill(null)}
                          className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{skill.name}</div>
                        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Level: {skill.level}%</div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSkillUp(categoryIndex, skillIndex)}
                          disabled={skillIndex === 0}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                        >
                          <FaArrowUp size={16} />
                        </button>
                        <button
                          onClick={() => moveSkillDown(categoryIndex, skillIndex)}
                          disabled={skillIndex === category.skills.length - 1}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50"
                        >
                          <FaArrowDown size={16} />
                        </button>
                        <button
                          onClick={() => startEditingSkill(categoryIndex, skillIndex)}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {/* Add Skill Form */}
              {isAddingSkill === categoryIndex && (
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Skill</h4>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <TextInput
                      label="Skill Name"
                      id={`new-skill-name-${categoryIndex}`}
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                      required
                    />
                    
                    <NumberInput
                      label="Proficiency Level"
                      id={`new-skill-level-${categoryIndex}`}
                      value={skillFormData.level}
                      onChange={(e) => setSkillFormData({ ...skillFormData, level: parseInt(e.target.value) })}
                      min={0}
                      max={100}
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addSkill(categoryIndex)}
                      disabled={!skillFormData.name.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <FaCheck className="mr-2" /> Add Skill
                    </button>
                    <button
                      onClick={() => setIsAddingSkill(null)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </FormSection>
        ))}
        
        {/* Add Category Form */}
        {isAddingCategory ? (
          <div className="border rounded-md p-4 bg-white dark:bg-gray-800 shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Skill Category</h3>
            
            <TextInput
              label="Category Name"
              id="new-category-name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
              helpText="Examples: Programming Languages, Cloud Technologies, Soft Skills"
            />
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={addCategory}
                disabled={!newCategoryName.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <FaCheck className="mr-2" /> Add Category
              </button>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <FaPlus className="mr-2" /> Add Skill Category
            </button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default SkillsEditor; 