"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {inspect} from "util";
import styles from "@/app/signin/styles.module.css"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()

    const signinSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.groovz.fr/user/signin', {
                email,
                password
            });
            localStorage.setItem('userToken', response.data.token);
            router.push('/feed');
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setError('Invalid email or password. Please try again.');
            }
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={signinSubmit}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input id="email" className={styles.input} type="email" placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email} required />
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input id="password" className={styles.input} type={showPassword ? 'text' : 'password'} placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password} required />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type='button' className={styles.iconButton} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
                <Link href="/signup">
                    <p className={styles.underline}>Don&apost have an account? Signup</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
