import styles from "@/app/components/profile/desktop/styles.module.css"
import Link from "next/link";
export default function DesktopNav() {
    return (
        <nav className={styles.nav}>
            <p>LOGO</p>
            <div className={styles.linkContainer}>
                <Link href={'/feed'}>
                    <p className={styles.underline}>Feed</p>
                </Link>
                <p>Link2</p>
                <p>link3</p>
            </div>
        </nav>
    )
}