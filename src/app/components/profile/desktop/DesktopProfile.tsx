"use client";

import Link from "next/link";
import styles from "@/app/components/profile/desktop/styles.module.css";
import {useEffect, useState} from "react";
import {User} from "@/models/User";
import DesktopHeader from "@/app/components/common/desktop/DesktopHeader";
import DesktopNav from "@/app/components/profile/desktop/DesktopNav";
import Image from "next/image";
import PlaylistLists from "@/app/components/profile/PlaylistLists";
import RecentlyFollowed from "@/app/components/profile/RecentlyFollowed";
import useDesktopProfileViewModel from "@/viewModels/profile/ProfileviewModel";

export default function DesktopProfile(){
    const DesktopProfileViewModel = useDesktopProfileViewModel();

    return (
        <div className={styles.page}>
            <DesktopHeader></DesktopHeader>
            <DesktopNav></DesktopNav>
            <div className={styles.container}>
                <div className={styles.userInformations}>
                        <div className={styles.imageContainer}>
                            <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={250} height={250} className={styles.profileImage}></Image>
                            <button className={styles.underline} onClick={DesktopProfileViewModel.handleOpenModal}>Modify Profile</button>
                            {DesktopProfileViewModel.showModal &&
                                <div className={styles.modal} onClick={DesktopProfileViewModel.handleCloseModal}>
                                    <div className={styles.modalContent}>
                                        <label htmlFor="newName">New name:</label>
                                        <input type="text" id="newName" value={DesktopProfileViewModel.newName} onChange={DesktopProfileViewModel.handleNameChange} />
                                        <button onClick={DesktopProfileViewModel.handleUpdateName}>Validate</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.userStats}>
                            <p className={styles.userName}>{DesktopProfileViewModel.user?.userName}</p>
                            <div className={styles.stats}>
                                <p>follows {DesktopProfileViewModel.user?.follows.length}</p>
                                <p>followed by {DesktopProfileViewModel.user?.followers.length}</p>
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