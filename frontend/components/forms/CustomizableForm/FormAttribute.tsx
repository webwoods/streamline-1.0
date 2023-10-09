import React, { useState } from 'react';
import styles from '@/app/page.module.css'



function CustomizableForm(){

  return (
    <div className="form-container">
      <div className="component">
        <label htmlFor="attributeName">Attribute Name:</label>
        <input
          type="text"
          id="attributeName"
          placeholder="Enter Attribute Name"
          value="None"
           />
      </div>

         </div>
  );
}

export default CustomizableForm;
