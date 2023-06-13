import styles from"@/app/components/profile/desktop/styles.module.css"
import SearchBar from "@/app/components/profile/desktop/SearchBar";
export default function DesktopHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.searchbar}>
                <SearchBar></SearchBar>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>icon</div>
                <div className={styles.icon}>icon</div>
                <div className={styles.icon}>icon</div>
            </div>
        </header>
    )
}