"use client";
import Link from "next/link";
import styles from "@/app/components/profile/mobile/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import TemporaryDrawer from "@/app/components/profile/mobile/Drawer";
import Image from "next/image";

interface IUser {
    userName: string;
    follows: string;
    followers: string;

}

interface MobileUserProfileProps {
    userId: string;
}

export default function MobileUserProfile({ userId }: MobileUserProfileProps) {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        async function fetchUser() {

            const name = await User.getUserNameById(userId);
            const follows = await User.getFollowsById(userId);
            const followers = await User.getFollowersById(userId);

            setUser({
                userName: name.userName,
                follows: follows,
                followers: followers
            });
        }

        fetchUser();
    }, []);



    return (
        <div className={styles.page}>
            <div className={styles.mobileHeader}>
                <TemporaryDrawer/>
                <p>logo</p>
                <p>searchbar</p>
            </div>
            <div className={styles.profilInformationsContainer}>
                <div className={styles.imageBackground}>
                    <div className={styles.profilInformations}>
                        <p className={styles.userName}>{user?.userName}</p>
                        <button className={styles.createPlaylist} type="button">Follow</button>
                    </div>
                </div>
                <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={100} height={100} className={styles.profileImage}></Image>

                <div className={styles.secondContainer}>
                    <div className={styles.profileStats}>
                        <p>follows {user?.follows.length}</p>
                        <p>followed by {user?.followers.length}</p>
                    </div>
                    <div className={styles.profileLinks}>
                        <p>Link1</p>
                        <p>Link2</p>
                        <p>Link3</p>
                    </div>
                </div>

            </div>

            <div className={styles.playlistContainer}>
                <h2 className={styles.subtitle}>My playlists</h2>
            </div>
            <div className={styles.followedContainer}>
                <h2 className={styles.subtitle}>Recently followed</h2>
            </div>



        </div>
    )
}