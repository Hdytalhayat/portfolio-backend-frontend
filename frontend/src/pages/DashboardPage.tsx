import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project, ProjectStat } from '../types';
import { getStats } from '../services/dashboardService';
import { logoutAdmin } from '../services/authService';
import { deleteProject, getProjectById, getAllProjects } from '../services/projectService';
import AddProjectModal from '../components/AddProjectModal';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<ProjectStat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await getStats();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = async (id: number) => {
    try {
      setError(null);
      let project: Project | undefined;
      try {
        project = await getProjectById(id);
      } catch {
        // Fallback for older backends that don't expose GET /:id
        const all = await getAllProjects();
        project = all.find(p => p.id === id);
      }
      if (!project) throw new Error('Project not found.');
      setEditingProject(project);
      setIsModalOpen(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setStats(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSuccess = (saved: Project, isEdit: boolean) => {
    if (isEdit) {
      setStats(prev => prev.map(s => (s.id === saved.id ? { ...s, title: saved.title } : s)));
    } else {
      setStats(prev => [{ id: saved.id, title: saved.title, click_count: 0 }, ...prev]);
    }
  };

  const totalClicks = stats.reduce((sum, current) => sum + Number(current.click_count), 0);
  const totalProjects = stats.length;

  return (
    <>
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
        project={editingProject}
        onSuccess={handleSuccess}
      />
      <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-1 opacity-70">Welcome back, Admin!</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0">
              <button
                onClick={handleAddClick}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md flex items-center gap-2"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <i className="fas fa-plus-circle"></i>
                Add Project
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border-color)' }}
              >
                Logout
              </button>
            </div>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-lg shadow-md flex items-center justify-between" style={{ backgroundColor: 'var(--card)' }}>
              <div>
                <p className="text-sm font-medium opacity-70">Total Projects</p>
                <h2 className="text-3xl font-bold">{totalProjects}</h2>
              </div>
              <div className="text-4xl opacity-30">
                <i className="fas fa-layer-group"></i>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-md flex items-center justify-between" style={{ backgroundColor: 'var(--card)' }}>
              <div>
                <p className="text-sm font-medium opacity-70">Total Clicks</p>
                <h2 className="text-3xl font-bold">{totalClicks}</h2>
              </div>
              <div className="text-4xl opacity-30">
                <i className="fas fa-mouse-pointer"></i>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <h2 className="text-xl font-bold">Project Management</h2>
              <p className="text-sm opacity-70 mt-1">View, edit, or delete your projects.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <tr>
                    <th className="px-6 py-4 font-semibold">Project Title</th>
                    <th className="px-6 py-4 font-semibold text-center">Clicks</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr><td colSpan={3} className="text-center p-8">Loading data...</td></tr>
                  )}
                  {error && (
                    <tr><td colSpan={3} className="text-center p-8 text-red-500">{error}</td></tr>
                  )}
                  {!isLoading && !error && stats.map(stat => (
                    <tr key={stat.id} className="border-b last:border-b-0 hover:bg-gray-500/10" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="px-6 py-4 font-medium">{stat.title}</td>
                      <td className="px-6 py-4 font-bold text-center">{stat.click_count}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => handleEditClick(stat.id)}
                            className="text-sm font-medium hover:underline"
                            style={{ color: 'var(--primary)' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(stat.id)}
                            disabled={deletingId === stat.id}
                            className="text-sm font-medium text-red-500 hover:underline disabled:opacity-50"
                          >
                            {deletingId === stat.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                   {!isLoading && stats.length === 0 && (
                    <tr><td colSpan={3} className="text-center p-8 opacity-70">No projects found. Add one to get started!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;