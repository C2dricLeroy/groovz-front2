"use client";
import { useState } from 'react';
import axios from "axios";
import styles from '@/styles/styles.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const accountStatus = 5;
    const createdAt = new Date(Date.now());
    const isAdmin = false;
    const isSuspended = false;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

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

    const signupSubmit = () => {

        validateEmail();
        validatePassword();

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
        <div className={styles.container}>
            <h1 className={styles.title}>This page is for signup</h1>
            <div className={styles.form}>
                <p className={styles.label}>SignUp Form</p>
                <input className={styles.input} placeholder="Username" onChange={e => setUsername(e.target.value)}
                       value={username}/>
                <div className={styles.inputContainer}>
                    <input
                        className={passwordError ? styles.inputError : styles.input}
                        placeholder="Password"
                        type={isPasswordVisible ? "text" : "password"}
                        onChange={e => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        value={password}
                    />
                    <button onClick={togglePasswordVisibility} className={styles.icon}>
                        {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                </div>
                <input
                    className={emailError ? styles.inputError : styles.input}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    value={email}
                />
            </div>
            <button title={"Submit"} onClick={signupSubmit}>Submit</button>
            <Link href="/signin">
                <p className={styles.underline}>already have an account? Signin</p>
            </Link>
        </div>
    );
}

export default Signup;
