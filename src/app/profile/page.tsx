"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import Link from "next/link";
import styles from '@/styles/styles.module.css';
import MobileProfile from "@/app/components/profile/mobile/MobileProfile";
import DesktopProfile from "@/app/components/profile/desktop/DesktopProfile";


export default function Profile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ?
                <MobileProfile/>
                :
                <DesktopProfile/>
            }
        </div>
    );
}
