"use client";
import Link from "next/link";
import styles from "@/app/components/profile/mobile/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import TemporaryDrawer from "@/app/components/profile/mobile/ProfileDrawer";
import Image from "next/image";
import {UserFollow} from "@/classes/UserFollow";
import SearchBar from "@/app/components/common/mobile/SearchBar";

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
            <div className={styles.mobileHeader}>
                <div className={styles.header}>
                    <TemporaryDrawer/>
                    <p>logo</p>
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar></SearchBar>
                </div>
            </div>
            <div className={styles.profilInformationsContainer}>
                <div className={styles.imageBackground}>
                    <div className={styles.profilInformations}>
                        <p className={styles.userName}>{user?.userName}</p>
                        <button type="button" className={styles.createPlaylist} onClick={toggleFollow}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
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