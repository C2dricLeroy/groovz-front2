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
import {Label} from "@mui/icons-material";


function Login() {
    const signinViewModel = useSigninViewModel();

    return (
        <div className={styles.page}>
            <Link href='/'>
                <img src='/Groovz.png' alt="Groovz logo" className={styles.logo} width={100} height={100}/>
            </Link>
            <div className={styles.container}>
                <h1 className={styles.title}>Sign In</h1>
                <form className={styles.form} onSubmit={signinViewModel.signinSubmit}>
                    <div className={`${styles.formGroup} ${styles.field}`}>
                        <label className={styles.formLabel} htmlFor="Email">Email</label>
                        <input type="input" className={styles.formField}
                               onChange={(e) => signinViewModel.setEmail(e.target.value)}
                               value={signinViewModel.email} required id="Email"/>
                    </div>
                    <div className={`${styles.formGroup} ${styles.field}`}>
                        <label className={styles.formLabel} htmlFor="password">Password</label>
                        <input type={signinViewModel.showPassword ? 'text' : 'password'} className={styles.formField}  autoComplete="off"
                               onChange={(e) => signinViewModel.setPassword(e.target.value)}
                               value={signinViewModel.password} required id="password"/>
                        <button type='button' className={styles.iconButton} onClick={() => signinViewModel.setShowPassword(!signinViewModel.showPassword)}>
                            {signinViewModel.showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>
                    {signinViewModel.error && <p className={styles.error}>Invalid email or password. Please try again</p>}

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
