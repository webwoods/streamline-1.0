import React from 'react';
import styles from './Auth.module.css';
import Image from 'next/image';

function SignupComponent() {
    return (
        <div className={styles.loginContainerFull} >
            <div className={styles.loginContainer}>
                <div className={styles.loginContent}>
                    <div className={styles.centered}>
                        <Image
                            src="/nifs_logo.png"
                            alt="Company Logo"
                            width={150}
                            height={150}
                        />
                        <h2 className={styles.welcomeText}>Become a member today!</h2>
                        <p>
                            Already a member?<a href="#" className={styles.blueText}> Sign in</a>
                        </p>
                    </div>
                    <form className={styles.inputFieldForm}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Email">Email:</label>
                            <input type="text" id="Email" name="Email" className={styles.inputBox} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" className={styles.inputBox} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Confirm Password">Confirm Password:</label>
                            <input type="ConfirmPassword" id="ConfirmPassword" name="Confirm Password" className={styles.inputBox} />
                        </div>
                        <div className={styles.checkboxAndForgotPassword}>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe">Keep me signed in</label>
                            </div>
                        </div>
                    </form>
                    <button className={styles.signInButton}>Sign Up</button>
                </div>

            </div>
            <p className={styles.poweredBy}>
                Powered by <span className={styles.boldText}>StreamLine</span>
            </p>
        </div>
    );
}

export default SignupComponent;
