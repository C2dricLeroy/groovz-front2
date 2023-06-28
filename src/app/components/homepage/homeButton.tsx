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
        console.log("Failed to use");
    }
}
export default function HomeButton({ title, link }: HomeButtonProps) {

        const router = useMyRouter();
        return (
        <button className={styles.button} type="button" onClick={() => router?.push(link)}>
            {title}
        </button>
    );
}

