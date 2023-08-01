"use client";
import styles from "@/app/components/profile/mobile/styles.module.css";
import Image from "next/image";
import SearchBar from "@/app/components/common/SearchBar";
import PlaylistLists from "@/app/components/profile/PlaylistLists";
import RecentlyFollowed from "@/app/components/profile/RecentlyFollowed";
import ProfileDrawer from "@/app/components/profile/mobile/ProfileDrawer";
import useProfileViewModel from "@/app/viewModels/profile/ProfileviewModel";

export default function MobileProfile() {
    const ProfileViewModel = useProfileViewModel();

    return (
            <div className={styles.page}>
                <div className={styles.mobileHeader}>
                    <div className={styles.header}>
                        <ProfileDrawer/>
                        <p>logo</p>
                    </div>
                    <div className={styles.searchBarContainer}>
                        <SearchBar></SearchBar>
                    </div>
                </div>
                <div className={styles.profilInformationsContainer}>
                    <div className={styles.imageBackground}>
                        <div>
                            <p className={styles.userName}>{ProfileViewModel.user?.userName}</p>
                            <button className={styles.createPlaylist} type="button">Create a Playlist</button>
                        </div>
                    </div>
                    <button className={[styles.underline, styles.Stats].join(' ')} onClick={ProfileViewModel.handleOpenModal}>Modify Profile</button>
                    {ProfileViewModel.showModal &&
                        <div className={styles.modal} onClick={ProfileViewModel.handleCloseModal}>
                            <div className={styles.modalContent}>
                                <label htmlFor="newName">New name:</label>
                                <input type="text" id="newName" value={ProfileViewModel.newName} onChange={ProfileViewModel.handleNameChange} />
                                <button onClick={ProfileViewModel.handleUpdateName}>Validate</button>
                            </div>
                        </div>
                    }
                    <Image src={"/profil-de-lutilisateur.png"} alt={"profile picture"} width={100} height={100} className={styles.profileImage}></Image>
                    <div className={styles.secondContainer}>
                        <div className={styles.profileStats}>
                            <p className={styles.Stats}>follows {ProfileViewModel.user?.follows.length}</p>
                            <p className={styles.Stats}>followed by {ProfileViewModel.user?.followers.length}</p>
                        </div>
                        <div className={styles.profileLinks}>
                            <p className={styles.Stats}>Link1</p>
                            <p className={styles.Stats}>Link2</p>
                            <p className={styles.Stats}>Link3</p>
                        </div>
                    </div>
                </div>
                <div className={styles.playlistContainer}>
                    <h2 className={styles.subtitle}>My playlists</h2>
                    <PlaylistLists></PlaylistLists>
                </div>
                <div className={styles.followedContainer}>
                    <h2 className={styles.subtitle}>Recently followed</h2>
                    <RecentlyFollowed></RecentlyFollowed>
                </div>
            </div>
        )
}