import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Import the bell icon from react-icons/fa
import styles from './notification.module.css';

const NotificationButton: React.FC = () => {
  const [notifications, setNotifications] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.notificationButton}>
      <button onClick={toggleDropdown} className={styles.notificationIcon}>
        <FaBell  size ={30}/> {/* Use the FaBell icon component */}
        {notifications > 0 && (
          <span className={styles.notificationCount}>{notifications}</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.notificationDropdown}>
          {/* Add your notification items here */}
          <p>You have {notifications} new notifications.</p>
          {/* Additional notification items */}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
