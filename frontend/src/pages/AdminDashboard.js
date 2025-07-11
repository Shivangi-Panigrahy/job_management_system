import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tab, setTab] = useState('users');

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line
  }, [statusFilter]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, jobsRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers(),
        adminAPI.getAllJobs(statusFilter),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setJobs(jobsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Fetch dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}>{status}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        {error && <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 mb-4 text-center">{error}</div>}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-5 text-center">
              <div className="text-2xl font-bold">{stats.stats.totalUsers}</div>
              <div className="text-gray-500">Total Users</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 text-center">
              <div className="text-2xl font-bold">{stats.stats.totalJobs}</div>
              <div className="text-gray-500">Total Jobs</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 text-center">
              <div className="text-2xl font-bold">{stats.stats.openJobs}</div>
              <div className="text-gray-500">Open Jobs</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 text-center">
              <div className="text-2xl font-bold">{stats.stats.doneJobs}</div>
              <div className="text-gray-500">Completed Jobs</div>
            </div>
          </div>
        )}
        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b">
          <button
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${tab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
            onClick={() => setTab('users')}
          >
            Users ({users.length})
          </button>
          <button
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${tab === 'jobs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
            onClick={() => setTab('jobs')}
          >
            Jobs ({jobs.length})
          </button>
        </div>
        {/* Tab Content */}
        {tab === 'users' && (
          <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
            <h5 className="font-semibold mb-4">All Users</h5>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{user.name}</td>
                    <td className="py-2 px-3">{user.email}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'jobs' && (
          <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold">All Jobs</h5>
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
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-3">Title</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{job.title}</td>
                    <td className="py-2 px-3">{job.description}</td>
                    <td className="py-2 px-3">{getStatusBadge(job.status)}</td>
                    <td className="py-2 px-3">{job.userId?.name || 'Unknown'}</td>
                    <td className="py-2 px-3">{new Date(job.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 