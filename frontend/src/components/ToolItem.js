import React from 'react';

const ToolItem = ({ tool, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${tool.name}"?`)) {
      onDelete(tool.id);
    }
  };

  return (
    <div className="tool-item">
      <div className="tool-info">
        <h3 className="tool-name">{tool.name}</h3>
        <p className="tool-description">{tool.description}</p>
        <span className="tool-id">ID: {tool.id}</span>
      </div>
      <button 
        className="delete-button"
        onClick={handleDelete}
        aria-label={`Delete ${tool.name}`}
      >
        Delete
      </button>
    </div>
  );
};

export default ToolItem;