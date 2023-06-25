import styles from '@/app/components/feed/desktop/styles.module.css'
import FeedNav from "@/app/components/common/desktop/FeedNav";
import DesktopHeader from "@/app/components/common/desktop/DesktopHeader";
import Recommendations from "@/app/components/feed/desktop/Recommendations";
import PostCreation from "@/app/components/feed/desktop/Postcreation";


export default function DesktopFeed() {

    return (
        <div className={styles.page}>
            <DesktopHeader></DesktopHeader>
            <FeedNav></FeedNav>

            <div className={styles.container}>
                <Recommendations></Recommendations>
                <PostCreation></PostCreation>
            </div>



        </div>
    )
}