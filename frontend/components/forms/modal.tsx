import React, { useState } from 'react';
import styles from '@/app/page.module.css'


const RectangularBox = () => {
  const [formData, setFormData] = useState({
    id: '',
    createdDate:  '',
    expectedDate: '',
    supplier: '',
    status: '',
    otherField: '',
  });

  const [isCreatedDateOpen, setIsCreatedDateOpen] = useState(false);
  const [isExpectedDateOpen, setIsExpectedDateOpen] = useState(false);
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCancel = () => {
    // Add your code to handle form submission here
    // You can access form data using the `formData` state
    console.log(formData);
  };

  const handleSave = () => {
    // Add your code to handle form submission here
    // You can access form data using the `formData` state
    console.log(formData);
  };
  const handleDateChange = (date: any, name: any) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };
  

  return (
    <div className="rectangular-box">
      <div className={styles['modal-header']}>
      <h1>Update</h1>
      <h2>Purchase Order</h2>
      
      </div>
      <div>
        <label className={styles['modal-label']}>Id</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} />
      </div>
      
      <div>
       <label className={styles['modal-label']}>Created Date</label>
       <input type="text" name="createdDate" value={formData.createdDate} onChange={handleChange} />
      </div>
      <div>
        <label className={styles['modal-label']}>Expected Date</label>
       <input type="text" name="expectedDate" value={formData.expectedDate} onChange={handleChange} />
       </div> 
      
     
      <div>
        <label className={styles['modal-label']}>Supplier</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} />
      </div>
      <div>
        <label className={styles['modal-label']}>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className={styles['modal-label']}>Remarks</label>
        <input type="text" name="otherField" value={formData.otherField} onChange={handleChange} />
      </div>
      <div>
        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
        <button className='save-button' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default RectangularBox;
