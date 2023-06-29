import styles from "@/app/components/feed/desktop/styles.module.css"
import Link from "next/link";
import {useRouter} from "next/navigation";
export default function FeedNav() {
    const router = useRouter();
    const signOut = async () => {
        try {
            localStorage.removeItem('userToken');
            router.push('/');
        } catch (error) {
            console.error('Error during sign out', error);
        }
    };

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
            <button onClick={signOut}>Log out</button>
        </nav>
    )
}