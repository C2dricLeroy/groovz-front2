"use client";

import Link from "next/link";
import styles from "@/app/components/profile/desktop/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import DesktopHeader from "@/app/components/common/desktop/DesktopHeader";
import DesktopNav from "@/app/components/profile/desktop/DesktopNav";
import Image from "next/image";
import PlaylistLists from "@/app/components/profile/PlaylistLists";
import RecentlyFollowed from "@/app/components/profile/RecentlyFollowed";

interface IUser {
    userName: string;
    follows: string;
    followers: string;
}


export default function DesktopProfile(){
    const [user, setUser] = useState<IUser | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");

    async function handleUpdateName() {
        if (newName && newName.trim() !== "") {
            await User.updateName(newName);
            setUser(prevUser => {
                if (prevUser === null) {
                    return null;
                } else {
                    return {...prevUser, userName: newName}
                }
            });
            setShowModal(false);
        } else {
            alert("User name cannot be empty");
        }
    }

    function handleOpenModal() {
        alert("Warning, your userName is the only way for your friends to find you on Groovz. Changing your name should be well considered decision");
        setShowModal(true);
    }

    function handleNameChange(e: any) {
        setNewName(e.target.value);
    }

    function handleCloseModal(e: any) {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    }

    useEffect(() => {
        async function fetchUser() {

            const name = await User.getUserName();
            const follows = await User.getFollows();
            const followers = await User.getFollowers();

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
            <DesktopHeader></DesktopHeader>
            <DesktopNav></DesktopNav>
            <div className={styles.container}>
                <div className={styles.userInformations}>
                        <div className={styles.imageContainer}>
                            <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={250} height={250} className={styles.profileImage}></Image>
                            <button className={styles.underline} onClick={handleOpenModal}>Modify Profile</button>
                            {showModal &&
                                <div className={styles.modal} onClick={handleCloseModal}>
                                    <div className={styles.modalContent}>
                                        <label htmlFor="newName">New name:</label>
                                        <input type="text" id="newName" value={newName} onChange={handleNameChange} />
                                        <button onClick={handleUpdateName}>Validate</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.userStats}>
                            <p className={styles.userName}>{user?.userName}</p>
                            <div className={styles.stats}>
                                <p>follows {user?.follows.length}</p>
                                <p>followed by {user?.followers.length}</p>
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
                    <PlaylistLists></PlaylistLists>
                </div>
                <div className={styles.followedContainer}>
                    <h2 className={styles.subtitle}>Recently followed</h2>
                    <RecentlyFollowed></RecentlyFollowed>
                </div>
            </div>
        </div>
    )
}