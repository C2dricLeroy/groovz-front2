"use client";
import Link from "next/link";
import styles from "@/app/components/profile/mobile/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import TemporaryDrawer from "@/app/components/profile/mobile/Drawer";
import Image from "next/image";
import SearchBar from "@/app/components/profile/mobile/SearchBar";
import {Customer} from "@/classes/Customer";
import PlaylistLists from "@/app/components/profile/PlaylistLists";

interface IUser {
    userName: string;
    follows: string;
    followers: string;
    playlists: string

}

export default function MobileProfile() {
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
            const playlists = await Customer.getPlaylists();


            setUser({
                userName: name.userName,
                follows: follows,
                followers: followers,
                playlists: playlists
            });
        }
        fetchUser();
    }, []);

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
                            <button className={styles.createPlaylist} type="button">Create a Playlist</button>
                        </div>
                    </div>
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
                    <PlaylistLists></PlaylistLists>
                </div>
                <div className={styles.followedContainer}>
                    <h2 className={styles.subtitle}>Recently followed</h2>
                </div>



            </div>
        )
}