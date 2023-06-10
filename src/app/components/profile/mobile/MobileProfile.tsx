"use client";
import Link from "next/link";
import styles from "@/styles/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import TemporaryDrawer from "@/app/components/profile/mobile/Drawer";

interface IUser {
    userName: string;

}

export default function MobileProfile() {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        async function fetchUser() {

            const name = await User.getUserName();
            setUser({userName: name.userName});
        }

        fetchUser();
    }, []);



    return (
            <div>
                <div className={styles.mobileHeader}>
                    <TemporaryDrawer/>
                    <p>logo</p>
                    <p>searchbar</p>

                </div>
                <p>{user?.userName}</p>
                <Link href={'/feed'}>
                    <p className={styles.underline}>Navigate to feed</p>
                </Link>

            </div>
        )
}