"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {inspect} from "util";
import styles from "@/app/signin/styles.module.css"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useSigninViewModel from "@/viewModels/login/signinViewModel";


function Login() {
    const signinViewModel = useSigninViewModel();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={signinViewModel.signinSubmit}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input id="email" className={styles.input} type="email" placeholder="Email"
                           onChange={(e) => signinViewModel.setEmail(e.target.value)}
                           value={signinViewModel.email} required />
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input id="password" className={styles.input} type={signinViewModel.showPassword ? 'text' : 'password'} placeholder="Password"
                           onChange={(e) => signinViewModel.setPassword(e.target.value)}
                           onFocus={() => signinViewModel.setError(false)}
                           value={signinViewModel.password} required />
                    {signinViewModel.error && <p className={styles.error}>Invalid email or password. Please try again</p>}
                    <button type='button' className={styles.iconButton} onClick={() => signinViewModel.setShowPassword(!signinViewModel.showPassword)}>
                        {signinViewModel.showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
                <Link href="/signup">
                    <p className={styles.underline}>Don&apos;t have an account? Signup</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
