import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toolsAPI = {
  // Get all tools
  getTools: async () => {
    const response = await api.get('/tools');
    return response.data;
  },

  // Create a new tool
  createTool: async (toolData) => {
    const response = await api.post('/tools', toolData);
    return response.data;
  },

  // Delete a tool
  deleteTool: async (toolId) => {
    const response = await api.delete(`/tools/${toolId}`);
    return response.data;
  },
};

export default api;