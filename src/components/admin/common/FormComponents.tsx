import React from 'react';

// Text input component with label
export const TextInput = ({ 
  label, 
  id,
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  helpText = ''
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      />
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Text area component with label
export const TextArea = ({ 
  label, 
  id,
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  rows = 4,
  helpText = ''
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  helpText?: string;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      ></textarea>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Number input component with label
export const NumberInput = ({ 
  label, 
  id,
  value, 
  onChange, 
  min = 0,
  max = 100,
  step = 1,
  required = false,
  helpText = ''
}: {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  helpText?: string;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      />
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Select input component with label
export const SelectInput = ({ 
  label, 
  id,
  value, 
  onChange, 
  options,
  required = false,
  helpText = ''
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  helpText?: string;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Form section component for grouping form elements
export const FormSection = ({ 
  title, 
  description = '',
  children 
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Icon with text
export const FormIconSelect = ({ 
  label, 
  id,
  value, 
  onChange, 
  options,
  required = false,
  helpText = ''
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  helpText?: string;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Tags input component
export const TagsInput = ({ 
  label, 
  id,
  tags, 
  setTags,
  required = false,
  helpText = ''
}: {
  label: string;
  id: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  required?: boolean;
  helpText?: string;
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md">
            <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter to add tags"
          className="flex-grow outline-none bg-transparent py-1 px-2 text-gray-700 dark:text-white"
        />
      </div>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// Submit button
export const SubmitButton = ({ 
  label, 
  onClick,
  isLoading = false,
  loadingLabel = 'Saving...',
  disabled = false
}: {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
};

// Form layout wrapper
export const FormLayout = ({ 
  title,
  description,
  children,
  onSave,
  isLoading = false
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
  isLoading?: boolean;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        <SubmitButton 
          label="Save Changes" 
          onClick={onSave} 
          isLoading={isLoading} 
        />
      </div>
      <div>
        {children}
      </div>
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <SubmitButton 
          label="Save Changes" 
          onClick={onSave} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}; 