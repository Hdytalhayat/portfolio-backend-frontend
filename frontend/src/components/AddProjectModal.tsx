// src/components/AddProjectModal.tsx
import React, { useState, useEffect } from 'react';
import { addProject, updateProject } from '../services/projectService';
import type { NewProjectData } from '../services/projectService';
import type { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null; // when provided, modal works in edit mode
  onSuccess: (project: Project, isEdit: boolean) => void;
}

const initialState: NewProjectData = {
  title: '',
  description: '',
  project_url: '',
  source_code_url: '',
  image_url: '',
  tech_stack: '',
};

const isValidUrl = (value: string) => {
  if (!value) return true; // optional fields
  try {
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, project, onSuccess }) => {
  const isEdit = !!project;

  const [projectData, setProjectData] = useState<NewProjectData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (project) {
        setProjectData({
          title: project.title || '',
          description: project.description || '',
          project_url: project.project_url || '',
          source_code_url: project.source_code_url || '',
          image_url: project.image_url || '',
          tech_stack: project.tech_stack || '',
        });
      } else {
        setProjectData(initialState);
      }
      setError(null);
    }
  }, [isOpen, project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    if (!projectData.title.trim()) return 'Title is required.';
    if (!projectData.description.trim()) return 'Description is required.';
    if (!projectData.project_url.trim()) return 'Project URL is required.';
    if (!projectData.image_url.trim()) return 'Image URL is required.';
    if (!projectData.tech_stack.trim()) return 'Tech stack is required.';
    if (!isValidUrl(projectData.project_url)) return 'Project URL is not valid.';
    if (projectData.source_code_url && !isValidUrl(projectData.source_code_url)) return 'Source code URL is not valid.';
    if (!isValidUrl(projectData.image_url)) return 'Image URL is not valid.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      let saved: Project;
      if (isEdit && project) {
        saved = await updateProject(project.id, projectData);
      } else {
        saved = await addProject(projectData);
      }
      onSuccess(saved, isEdit);
      setProjectData(initialState);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        style={{ backgroundColor: 'var(--card)', color: 'var(--text)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Project' : 'Add New Project'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={projectData.title}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border min-h-[80px]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Project URL</label>
              <input
                name="project_url"
                value={projectData.project_url}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Source Code URL (Optional)</label>
              <input
                name="source_code_url"
                value={projectData.source_code_url}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                name="image_url"
                value={projectData.image_url}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Tech Stack (comma-separated)</label>
              <input
                name="tech_stack"
                value={projectData.tech_stack}
                onChange={handleChange}
                placeholder="e.g., React, TypeScript, Node.js"
                required
                className="w-full p-2 rounded border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 font-semibold text-white rounded-lg shadow-md disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;