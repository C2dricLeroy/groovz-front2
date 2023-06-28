"use client";
import { useState } from 'react';
import axios from "axios";

import { useRouter } from 'next/router';
import Link from 'next/link';
import {inspect} from "util";
import styles from "@/app/signup/styles.module.css"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const accountStatus = 5;
    const createdAt = new Date(Date.now());
    const isAdmin = false;
    const isSuspended = false;



    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    const signupSubmit = async () => {
        await validateEmail();
        await validatePassword();


        if (emailError || passwordError) {
            return;
        }

        axios.post('http://localhost:3333/user/signup', {
            username,
            password,
            email,
            accountStatus,
            isAdmin,
            isSuspended,
            createdAt
        })
            .then((response) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const router = useRouter();
                console.log(response.data);
                router.push('/login');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Signup</h1>
                <div className={styles.form}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <input id="username" className={styles.input} placeholder="Username" onChange={e => setUsername(e.target.value)}
                           value={username}/>

                    <label className={styles.label} htmlFor="password">Password</label>
                    <div className={styles.inputContainer}>
                        <input
                            id="password"
                            className={passwordError ? styles.inputError : styles.input}
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            value={password}
                        />
                        <button type='button' className={styles.iconButton} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>

                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={emailError ? styles.inputError : styles.input}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        value={email}
                    />

                </div>
                <button className={styles.button} title={"Submit"} onClick={signupSubmit}>Submit</button>
                <Link href="/signin">
                    <p className={styles.underline}>already have an account? Signin</p>
                </Link>
            </div>
        </div>
    );

}

export default Signup;
