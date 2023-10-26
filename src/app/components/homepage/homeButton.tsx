'use client';
import Image from "next/image";
import styles from '@/styles/styles.module.css';
import {useRouter} from "next/navigation";

interface HomeButtonProps {
    title: string;
    link: string;
}

function useMyRouter() {
    try {
        return useRouter();
    } catch {
        console.log("Failed to use Router");
    }
}

export default function HomeButton({ title, link }: HomeButtonProps) {
        const router = useMyRouter();

        return (
            <button className={styles.pushable} onMouseUp={() => {
                    setTimeout(() => {
                        router?.push(link);
                    }, 200);
                }}>
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    {title}
                </span>
            </button>
    );
}

