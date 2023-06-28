"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/classes/User";
import Link from "next/link";
import styles from '@/styles/styles.module.css';
import MobileUserProfile from "@/app/components/profile/userProfile/mobile/MobileUserProfile";
import DesktopUserProfile from "@/app/components/profile/userProfile/desktop/DesktopUserProfile";


export default function Profile({params}: { params: { userId: string } }) {
    const [isMobile, setIsMobile] = useState(false);
    const userId = params.userId;


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
                <MobileUserProfile userId={userId}/>
                :
                <DesktopUserProfile userId={userId}/>
            }
        </div>
    );
}
