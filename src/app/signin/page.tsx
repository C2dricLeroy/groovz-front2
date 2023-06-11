"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {inspect} from "util";
import styles from "@/app/signin/styles.module.css"



function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()


    const signinSubmit = async () => {

        try {
            const response = await axios.post('http://localhost:3333/user/signin', {
                email,
                password
            });
            localStorage.setItem('userToken', response.data.token);
            await router.push('/feed');
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
                <h1 className={styles.title}>This page is for Signin</h1>
                <form className={styles.form} onSubmit={signinSubmit}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input id="email" className={styles.input} type="email" placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email} required />
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input id="password" className={styles.input} type="password" placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password} required />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Submit</button>
                </form>
                <Link href="/signup">
                    <p className={styles.underline}>Don't have an account? Signup</p>
                </Link>
            </div>
        </div>


    );
}

export default Login;
