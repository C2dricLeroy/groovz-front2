import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from "@/app/components/feed/mobile/styles.module.css"
import Link from "next/link";

export default function FeedDrawer() {
    const [isOpen, setIsOpen] = React.useState(false);
    const links = [
        { href: '/feed', text: 'Navigate to feed' },
        { href: '/link2', text: 'Link2' },
        { href: '/link3', text: 'Link3' }
    ];

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
                <div className={styles.drawerProfilePicture}>
                    <img src="/profil-de-lutilisateur.png" alt={"profile picture"}></img>
                </div>
                {links.map(link => (
                    <div className={styles.linkContainer} key={link.href}>
                        <Link href={link.href}>
                            <p className={styles.underline}>{link.text}</p>
                        </Link>
                    </div>
                ))}
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
