import React from 'react';
import ToolItem from './ToolItem';

const ToolList = ({ tools, onDeleteTool }) => {
  if (tools.length === 0) {
    return (
      <div className="tool-list">
        <h2>Tools</h2>
        <p className="no-tools">No tools available. Add some tools to get started!</p>
      </div>
    );
  }

  return (
    <div className="tool-list">
      <h2>Tools ({tools.length})</h2>
      <div className="tools-container">
        {tools.map(tool => (
          <ToolItem 
            key={tool.id} 
            tool={tool} 
            onDelete={onDeleteTool}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolList;