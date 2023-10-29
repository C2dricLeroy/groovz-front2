"use client";

import Link from 'next/link';
import styles from "@/app/signup/styles.module.css"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useSignupViewModel from "@/viewModels/signup/SignupViewModel";

function Signup() {
    const SignupViewModel = useSignupViewModel();

    return (
        <div className={styles.page}>
            <Link href='/'>
                <img src='/Groovz.png' alt="Groovz logo" className={styles.logo} width={100} height={100}/>
            </Link>
            <div className={styles.container}>
                <h1 className={styles.title}>SIGN UP</h1>
                <div className={styles.form}>
                    <div className={`${styles.formGroup} ${styles.field}`}>
                        <label className={styles.formLabel} htmlFor="username">Username</label>
                        <input type="input" className={styles.formField}
                               autoComplete={'off'}
                               onChange={e => SignupViewModel.setUsername(e.target.value)}
                               value={SignupViewModel.username} required id="username"/>
                    </div>

                    <div className={`${styles.formGroup} ${styles.field}`}>
                        <label className={styles.formLabel} htmlFor="password">Password</label>
                        <input type={SignupViewModel.showPassword ? 'text' : 'password'}
                               className={SignupViewModel.passwordError ? `${styles.inputError} ${styles.formField}` : styles.formField}
                               onChange={e => SignupViewModel.setPassword(e.target.value)}
                               onBlur={SignupViewModel.validatePassword}
                               value={SignupViewModel.password} required id="password"/>
                        <button type='button' className={styles.iconButton} onClick={() => SignupViewModel.setShowPassword(!SignupViewModel.showPassword)}>
                            {SignupViewModel.showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>

                    <div className={`${styles.formGroup} ${styles.field}`}>
                        <label className={styles.formLabel} htmlFor="email">Email</label>
                        <input type="input" className={styles.formField}
                               autoComplete={'off'}
                               onChange={e => SignupViewModel.setEmail(e.target.value)}
                               value={SignupViewModel.email} required id="email"/>
                    </div>
                </div>
                <button className={styles.button} title={"Submit"} onClick={SignupViewModel.signupSubmit}>Submit</button>
                <Link href="/signin">
                    <p className={styles.underline}>Already have an account? Signin</p>
                </Link>
            </div>
        </div>
    );
}

export default Signup;
