'use client';
import Image from "next/image";
import styles from '@/styles/styles.module.css';

function ScrollButton() {
    const handlePress = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className={styles.arrow}>
            <button onClick={handlePress}>
                <Image src="/arrow-down.png" className={styles.arrowImage} alt={"arrow down"} width={50} height={50} />
            </button>
        </div>
    );
}

export default ScrollButton;
