'use client';

import Link from "next/link";
import styles from '@/styles/styles.module.css';
import { useRouter } from 'next/navigation';
import SpotifyLoginButton from "@/app/components/Spotify/SpotifyLoginButton";
import {useEffect, useState} from "react";
import MobileProfile from "@/app/components/profile/mobile/MobileProfile";
import DesktopProfile from "@/app/components/profile/desktop/DesktopProfile";
import DesktopFeed from "@/app/components/feed/desktop/DesktopFeed";
import MobileFeed from "@/app/components/feed/mobile/MobileFeed";

export default function Feed() {

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
                <MobileFeed/>
                :
                <DesktopFeed/>
            }
        </div>
    );
}