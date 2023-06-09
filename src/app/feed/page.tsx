'use client';

import Link from "next/link";
import styles from '@/styles/styles.module.css';
import { useRouter } from 'next/navigation';

export default function Feed() {
    const router = useRouter();
    const signOut = async () => {

        try {
            localStorage.removeItem('userToken');
            router.push('/');
        } catch (error) {
            console.error('Error during sign out', error);
        }
    };
    return (
        <div className={styles.container}>
            <p>This page is for feed</p>
            <Link href="/profile">
                <p className={styles.underline}>Navigate to profile page</p>
            </Link>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}