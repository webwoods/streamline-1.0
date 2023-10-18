import React from 'react';
import styles from './login.module.css';
import Image from 'next/image';

function SignupComponent() {
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
                    <h2 className={styles.welcomeText} >Welcome back!</h2>
                    <p >
                        Already a member?<a href="#" className={styles.blueText}>Sign in</a>
                    </p>
                </div>
                <form className={styles.inputFieldForm}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" className={styles.inputBox} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" className={styles.inputBox} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" className={styles.inputBox} />
                    </div>
                    <div className={styles.checkboxAndForgotPassword}>
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" id="rememberMe" name="rememberMe" />
                            <label htmlFor="rememberMe">Keep me signed in</label>
                        </div>
                    </div>
                </form>
                <button className={styles.signInButton}>Sign In</button>
            </div>
        </div>
    )
}

export default SignupComponent