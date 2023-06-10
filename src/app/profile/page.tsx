"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import Link from "next/link";
import {inspect} from "util";
import styles from '@/styles/styles.module.css';


export default function Profile() {

    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const token =  await User.getToken();
            const user = await User.getUserInformations(token);
            setUser(user);
        }

        fetchUser();
    }, []);

    return (
        <div>
            <p>This page is for profile</p>
            <Link href={'/feed'}>
                <p style={styles.underline}>Navigate to feed</p>
            </Link>
        </div>
    );
}
