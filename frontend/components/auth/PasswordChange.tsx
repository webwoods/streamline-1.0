import React from 'react';
import styles from './Auth.module.css';
import Image from 'next/image';


function PasswordChange() {
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
                        <h2 className={styles.welcomeText}>Let’s change your password!</h2>
                        <p>
                            Not a member?<a href="#" className={styles.blueText}> Create your account now!</a>
                        </p>
                    </div>
                    <form className={styles.inputFieldForm}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Email">Email:</label>
                            <input type="text" id="Email" name="Email" placeholder="demouser@email.com" className={styles.inputBox} />
                        </div>
                       
                    </form>
                    <button className={styles.signInButton}>Change</button>
                </div>

            </div>
            <p className={styles.poweredBy}>
                Powered by <span className={styles.boldText}>StreamLine</span>
            </p>
        </div>
    )
}

export default PasswordChange