"use client";

import Link from "next/link";
import styles from "@/app/components/profile/desktop/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import DesktopHeader from "@/app/components/profile/desktop/DesktopHeader";
import DesktopNav from "@/app/components/profile/desktop/DesktopNav";
import Image from "next/image";

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

                        <div className={styles.imageContainer}>
                            <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={250} height={250} className={styles.profileImage}></Image>
                            <p>Change Profile Picture</p>
                        </div>

                        <div className={styles.userStats}>
                            <p>UserName</p>
                            <div className={styles.stats}>
                                <p>stat 1</p>
                                <p>stats 2</p>
                            </div>
                        </div>
                        <button type="button" className={styles.createPlaylist}>Create a Playlist</button>


                </div>
                <div className={styles.profileLinks}>
                    <p>Link 1</p>
                    <p>Link 2</p>
                    <p>Link 3</p>
                    <p>Link 4</p>
                    <p>Link 5</p>
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