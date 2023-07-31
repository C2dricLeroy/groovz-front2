"use client";

import Link from "next/link";
import styles from "@/app/components/profile/desktop/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/models/User";
import DesktopHeader from "@/app/components/common/desktop/DesktopHeader";
import DesktopNav from "@/app/components/profile/desktop/DesktopNav";
import Image from "next/image";
import {UserFollow} from "@/models/UserFollow";

interface IUser {
    userName: string;
    follows: string;
    followers: string;
}

interface DesktopUserProfileProps {
    userId: string;
}
export default function DesktopUserProfile({ userId }: DesktopUserProfileProps){
    const [user, setUser] = useState<IUser | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUser() {

            const name = await User.getUserNameById(userId);
            const follows = await User.getFollowsById(userId);
            const followers = await User.getFollowersById(userId);
            const following = await UserFollow.isUserFollowed(userId);

            setUser({
                userName: name.userName,
                follows: follows,
                followers: followers
            });
            setIsFollowing(following);
        }
        fetchUser();
    }, []);

    const toggleFollow = async () => {
        if (isFollowing) {
            await UserFollow.unfollow(userId);
        } else {
            await UserFollow.follow(userId);
        }
        setIsFollowing(!isFollowing);
    }

    return (
        <div className={styles.page}>
            <DesktopHeader></DesktopHeader>
            <DesktopNav></DesktopNav>
            <div className={styles.container}>
                <div className={styles.userInformations}>
                    <div className={styles.imageContainer}>
                        <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={250} height={250} className={styles.profileImage}></Image>
                    </div>
                    <div className={styles.userStats}>
                        <p className={styles.userName}>{user?.userName}</p>
                        <div className={styles.stats}>
                            <p>follows {user?.follows.length}</p>
                            <p>followed by {user?.followers.length}</p>
                        </div>
                    </div>
                    <button type="button" className={styles.createPlaylist} onClick={toggleFollow}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
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