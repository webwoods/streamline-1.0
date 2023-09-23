import React, { useState } from 'react';
import styles from './avatar.module.css';
import avatarImage from './OIP.jpeg';
import Image from 'next/image';
import logo from './nifs_logo.png'
import { BiUser } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";

const UserProfileButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.userProfileButton} ${isExpanded ? styles.expanded : ''}`}>
      <button className={styles.avatarButton} onClick={toggleExpand}>
        <div >
          <Image className={styles.avatar} src={avatarImage} alt='Avatar'/>
        </div>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <div className={styles.namePosition}>
              <p className={styles.name}>Dammika Rathnasri</p>
              <p className={styles.position}>HOD, Dept.of Physics</p>
            </div>
            <div>
            <Image className={styles.logo} src={logo} alt='logo'/>
            </div>
            {isExpanded && (
              <div className={styles.buttonsContainer}>
                <BiUser size={20}/>
                <button className={styles.profileButton}>Profile</button>
                <BiLogIn size={20}/>
                <button className={styles.logoutButton}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default UserProfileButton;
