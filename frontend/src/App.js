import React, { useState, useEffect } from 'react';
import { toolsAPI } from './services/api';
import ToolList from './components/ToolList';
import ToolForm from './components/ToolForm';
import './App.css';

function App() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tools on component mount
  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const toolsData = await toolsAPI.getTools();
      setTools(toolsData);
      setError(null);
    } catch (err) {
      setError('Failed to load tools. Make sure the backend server is running.');
      console.error('Error loading tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTool = async (toolData) => {
    try {
      const newTool = await toolsAPI.createTool(toolData);
      setTools(prevTools => [...prevTools, newTool]);
      setError(null);
    } catch (err) {
      setError('Failed to add tool. Please try again.');
      console.error('Error adding tool:', err);
    }
  };

  const handleDeleteTool = async (toolId) => {
    try {
      await toolsAPI.deleteTool(toolId);
      setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
      setError(null);
    } catch (err) {
      setError('Failed to delete tool. Please try again.');
      console.error('Error deleting tool:', err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Vulcan Line Tools Manager</h1>
        <p>Manage your line tools efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <div className="app-content">
          <div className="form-section">
            <ToolForm onSubmit={handleAddTool} />
          </div>

          <div className="list-section">
            {loading ? (
              <div className="loading">Loading tools...</div>
            ) : (
              <ToolList tools={tools} onDeleteTool={handleDeleteTool} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;