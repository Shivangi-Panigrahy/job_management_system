import axios from 'axios';

// Set base URL - use relative URL for proxy, full URL for production
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Job API functions
export const jobAPI = {
  // Get user's jobs
  getJobs: (status) => {
    const params = status ? { status } : {};
    return api.get('/jobs', { params });
  },

  // Create new job
  createJob: (jobData) => {
    return api.post('/jobs', jobData);
  },

  // Update job
  updateJob: (id, jobData) => {
    return api.put(`/jobs/${id}`, jobData);
  },

  // Delete job
  deleteJob: (id) => {
    return api.delete(`/jobs/${id}`);
  },

  // Get single job
  getJob: (id) => {
    return api.get(`/jobs/${id}`);
  }
};

// Admin API functions
export const adminAPI = {
  // Get all users
  getAllUsers: () => {
    return api.get('/admin/users');
  },

  // Get all jobs
  getAllJobs: (status) => {
    const params = status ? { status } : {};
    return api.get('/admin/jobs', { params });
  },

  // Get dashboard stats
  getDashboardStats: () => {
    return api.get('/admin/dashboard');
  }
};

export default api; 