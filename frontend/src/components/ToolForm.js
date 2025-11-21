import React, { useState } from 'react';

const ToolForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      description: ''
    });
  };

  return (
    <form className="tool-form" onSubmit={handleSubmit}>
      <h2>Add New Tool</h2>
      
      <div className="form-group">
        <label htmlFor="name">Tool Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter tool name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter tool description"
          rows="3"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Add Tool
      </button>
    </form>
  );
};

export default ToolForm;