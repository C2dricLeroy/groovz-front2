"use client";

import Link from "next/link";
import styles from "@/styles/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";

export default function DesktopProfile(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const user = await User.getUserName();
            setUser(user);
        }

        fetchUser();
    }, []);
    return (
        <div>
            <p>desktop</p>
            <Link href={'/feed'}>
                <p className={styles.underline}>Navigate to feed</p>
            </Link>
        </div>
    )
}