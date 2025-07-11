import React, { useState, useEffect } from 'react';
import { jobAPI } from '../services/api';

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
  });

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [statusFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getJobs(statusFilter);
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Fetch jobs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await jobAPI.updateJob(editingJob._id, formData);
      } else {
        await jobAPI.createJob(formData);
      }
      setShowModal(false);
      setEditingJob(null);
      resetForm();
      fetchJobs();
    } catch (err) {
      setError('Failed to save job');
      console.error('Save job error:', err);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      status: job.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobAPI.deleteJob(jobId);
        fetchJobs();
      } catch (err) {
        setError('Failed to delete job');
        console.error('Delete job error:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
    });
  };

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}>{status}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold">My Jobs</h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded shadow transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create New Job
          </button>
        </div>
        {error && <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  {getStatusBadge(job.status)}
                  <span className="text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm font-medium"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {jobs.length === 0 && !loading && (
          <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded px-4 py-3 mt-6 text-center">
            No jobs found. Create your first job!
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => {
                  setShowModal(false);
                  setEditingJob(null);
                  resetForm();
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">{editingJob ? 'Edit Job' : 'Create New Job'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                    onClick={() => {
                      setShowModal(false);
                      setEditingJob(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
                  >
                    {editingJob ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 