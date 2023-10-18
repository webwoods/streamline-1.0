import React from 'react';
import styles from './login.module.css';
import Image from 'next/image';

function LoginComponenet() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.centered}>
          <Image
            src="/nifs_logo.png"
            alt="Company Logo"
            width={150}
            height={150}
          />
          <h2>Welcome back!</h2>
          <p className={styles.centered}>
            Not a member? <a href="#" className={styles.blueText}>Create your account <span className={styles.blueText}>now!</span></a>
          </p>
        </div>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponenet;
