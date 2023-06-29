import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {inspect} from "util";
import styles from "@/app/components/profile/mobile/styles.module.css"
import Link from "next/link";

export default function ProfileDrawer() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = (open: any) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={styles.box}>
                <div className={styles.drawerHeader}>
                    <IconButton onClick={toggleDrawer(false)}  style={{color: "white", margin: "10px"}}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={styles.linkContainer}>
                    <Link href={'/feed'}>
                        <p className={styles.underline}>Navigate to feed</p>
                    </Link>
                </div>
                <div className={styles.linkContainer}>
                    <p>Link2 </p>
                </div>
                <div className={styles.linkContainer}>
                    <p>Link3 </p>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <IconButton style={{color: "white", margin: "10px"}} edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Drawer
                anchor={'left'}
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}
