import styles from"@/app/components/profile/desktop/styles.module.css"
export default function DesktopHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.searchbar}>
                <p>searchbar</p>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>icon</div>
                <div className={styles.icon}>icon</div>
                <div className={styles.icon}>icon</div>
            </div>
        </header>
    )
}