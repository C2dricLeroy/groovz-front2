import styles from "@/app/components/feed/desktop/styles.module.css"
import Link from "next/link";
import {useRouter} from "next/navigation";
import useFeedNavViewModel from "@/app/viewModels/feed/desktop/FeedNavViewModel";
export default function FeedNav() {

    const FeedNavViewModel = useFeedNavViewModel();

    return (
        <nav className={styles.nav}>
            <p>LOGO</p>
            <p>PROFILE PICTURE</p>
            <div className={styles.linkContainer}>
                <Link href="/profile">
                <p className={styles.underline}>My Profile</p>
                </Link>
                <Link href={'/feed'}>
                    <p className={styles.underline}>Feed</p>
                </Link>
                <p>link3</p>
            </div>
            <button onClick={FeedNavViewModel.signOut}>Log out</button>
        </nav>
    )
}