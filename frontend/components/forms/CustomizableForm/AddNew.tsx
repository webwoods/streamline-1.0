import React, { useState } from 'react';
import styles from '@/app/page.module.css'


function AddNew() {
  const [attributeName, setAttributeName] = useState('');
  const [attributeType, setAttributeType] = useState('text');

  const handleAddClick = () => {
    // Add your logic here when the "+" button is clicked
    console.log('Add button clicked');
  };

  return (
    <div className="rectangular-box">
      <label htmlFor="attributeName">Attribute Name:</label>
      <input
        type="text"
        id="attributeName"
        placeholder="Enter Attribute Name"
        value={attributeName}
        onChange={(e) => setAttributeName(e.target.value)}
      />
      <select
        id="attributeType"
        value={attributeType}
        onChange={(e) => setAttributeType(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        {/* Add more options as needed */}
      </select>
      <button className="add-button" onClick={handleAddClick}>
      </button>
    </div>
  );
}

export default AddNew;
