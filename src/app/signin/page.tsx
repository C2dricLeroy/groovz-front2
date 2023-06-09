"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import styles from '@/styles/styles.module.css';


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
        <div className={styles.container}>
            <div>
                <p className={styles.title}>This page is for Signin</p>
                <div className={styles.form}>
                    <p className={styles.label}>Signin Form</p>
                    <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                    <input className={styles.input} placeholder="Password" type="password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <button title={"Submit"} onClick={signinSubmit}>Submit</button>
                <Link href="/signup">
                    <p className={styles.underline}>Doesn&apost;t have an account ? Signup</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
