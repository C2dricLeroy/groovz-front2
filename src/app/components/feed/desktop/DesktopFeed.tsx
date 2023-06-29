import styles from '@/app/components/feed/desktop/styles.module.css'
import FeedNav from "@/app/components/feed/desktop/FeedNav";
import DesktopHeader from "@/app/components/common/desktop/DesktopHeader";
import Recommendations from "@/app/components/common/Recommendations";
import PostCreation from "@/app/components/common/Postcreation";
import Posts from "@/app/components/common/Posts";

export default function DesktopFeed() {

    return (
        <div className={styles.page}>
            <DesktopHeader></DesktopHeader>
            <FeedNav></FeedNav>
            <div className={styles.container}>
                <Recommendations></Recommendations>
                <PostCreation></PostCreation>
                <Posts></Posts>
            </div>
        </div>
    )
}