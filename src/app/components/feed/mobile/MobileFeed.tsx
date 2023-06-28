import {useState} from "react";
import styles from "@/app/components/feed/mobile/styles.module.css";

import FeedDrawer from "@/app/components/feed/mobile/FeedDrawer";
import ProfileDrawer from "@/app/components/profile/mobile/ProfileDrawer";
import SearchBar from "@/app/components/common/mobile/SearchBar";
import Recommendations from "@/app/components/common/Recommendations";
import PostCreation from "@/app/components/common/Postcreation";
import Posts from "@/app/components/common/Posts";


export default function MobileFeed() {



    return (
        <div className={styles.page}>
            <div className={styles.mobileHeader}>
                <div className={styles.header}>
                    <FeedDrawer/>
                    <p>logo</p>
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar></SearchBar>
                </div>
            </div>
            <Recommendations></Recommendations>
            <PostCreation></PostCreation>
            <Posts></Posts>
        </div>
    )
}