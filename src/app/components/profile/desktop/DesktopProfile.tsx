"use client";

import Link from "next/link";
import styles from "@/app/components/profile/desktop/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import DesktopHeader from "@/app/components/profile/desktop/DesktopHeader";
import DesktopNav from "@/app/components/profile/desktop/DesktopNav";

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
        <div className={styles.page}>
            <DesktopHeader></DesktopHeader>
            <DesktopNav></DesktopNav>
            <div className={styles.container}>
                <div className={styles.userInformations}>

                </div>
                <div className={styles.playlistContainer}>
                    <h2 className={styles.subtitle}>My Playlists</h2>
                </div>
                <div className={styles.followedContainer}>
                    <h2 className={styles.subtitle}>Recently followed</h2>
                </div>
            </div>



        </div>
    )
}