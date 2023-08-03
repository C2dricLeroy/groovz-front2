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
            <div className={styles.container}>
                <h1 className={styles.title}>Signup</h1>
                <div className={styles.form}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <input id="username" className={styles.input} placeholder="Username" onChange={e => SignupViewModel.setUsername(e.target.value)}
                           value={SignupViewModel.username}/>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <div className={styles.inputContainer}>
                        <input
                            id="password"
                            className={SignupViewModel.passwordError ? styles.inputError : styles.input}
                            placeholder="Password"
                            type={SignupViewModel.showPassword ? 'text' : 'password'}
                            onChange={e => SignupViewModel.setPassword(e.target.value)}
                            onBlur={SignupViewModel.validatePassword}
                            value={SignupViewModel.password}
                        />
                        <button type='button' className={styles.iconButton} onClick={() => SignupViewModel.setShowPassword(!SignupViewModel.showPassword)}>
                            {SignupViewModel.showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={SignupViewModel.emailError ? styles.inputError : styles.input}
                        placeholder="Email"
                        onChange={e => SignupViewModel.setEmail(e.target.value)}
                        onBlur={SignupViewModel.validateEmail}
                        value={SignupViewModel.email}
                    />
                </div>
                <button className={styles.button} title={"Submit"} onClick={SignupViewModel.signupSubmit}>Submit</button>
                <Link href="/signin">
                    <p className={styles.underline}>already have an account? Signin</p>
                </Link>
            </div>
        </div>
    );
}

export default Signup;
