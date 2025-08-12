// src/components/AddProjectModal.tsx
import React, { useState } from 'react';
import { addProject } from '../services/projectService';
import type { NewProjectData } from '../services/projectService';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (newStat: { id: number; title: string; click_count: number }) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onProjectAdded }) => {
  const initialState: NewProjectData = {
    title: '',
    description: '',
    project_url: '',
    source_code_url: '',
    image_url: '',
    tech_stack: '',
  };

  const [projectData, setProjectData] = useState<NewProjectData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newProject = await addProject(projectData);
      // Create a stat object for the dashboard list
      onProjectAdded({ id: newProject.id, title: newProject.title, click_count: 0 });
      setProjectData(initialState); // Reset form
      onClose(); // Close modal on success
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

        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

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
              {isLoading ? 'Saving...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddProjectModal;