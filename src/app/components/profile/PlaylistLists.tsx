"use client";
import {useEffect, useState} from "react";
import {Customer} from "@/classes/Customer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function PlaylistLists() {
    const [playlists, setPlaylists] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [isHoveredLeft, setHoveredLeft] = useState(false);
    const [isHoveredRight, setHoveredRight] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(5);

    useEffect(() => {
        function handleResize() {
            if (window.matchMedia('(max-width: 600px)').matches) {
                setItemsToShow(2);
            } else if (window.matchMedia('(max-width: 900px)').matches) {
                setItemsToShow(3);
            } else if (window.matchMedia('(max-width: 1100px)').matches) {
                setItemsToShow(5);
            } else {
                setItemsToShow(6)
            }
        }
        const fetchPlaylists = async () => {
            const playlists = await Customer.getPlaylists();
            setPlaylists(playlists.items);
            setLoading(false);
        };
        fetchPlaylists();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollRight = () => {
        if (scrollIndex < playlists.length - itemsToShow) {
            setScrollIndex(scrollIndex + 1);
        }
    };
    const scrollLeft = () => {
        if (scrollIndex > 0) {
            setScrollIndex(scrollIndex - 1);
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
                onClick={scrollLeft}
                onMouseEnter={() => setHoveredLeft(true)}
                onMouseLeave={() => setHoveredLeft(false)}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <ChevronLeft
                    style={{
                        color: '#FB5012',
                        transform: isHoveredLeft ? 'scale(2)' : 'scale(1)',
                        transition: 'transform 0.3s'
                    }}
                />
            </button>
            <div style={{ display: 'flex', overflowX: 'auto', width: '90%', alignItems:'center', justifyContent: 'center', margin: '2vh'}}>
                {playlists.slice(scrollIndex, scrollIndex + itemsToShow).map((playlist: any) => (
                    <div key={playlist.id} style={{display: 'flex', flexDirection: 'column', flex: '0 0 auto', marginRight: '10px', alignItems:'center', justifyContent: 'center' }}>
                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <img
                            src={playlist.images[0]?.url || 'defaultImageURL'}
                            alt={playlist.name}
                            style={{
                                width: window.innerWidth <= 600 ? '130px' : '200px',
                                height: window.innerWidth <= 600 ? '130px' : '200px',
                                margin: '1vh'
                            }}
                        />
                            <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: window.innerWidth <= 600 ? '130px' : '200px', margin: '1vh' }}>{playlist.name}</h2>
                        </a>

                    </div>
                ))}
            </div>
            <button
                onClick={scrollRight}
                onMouseEnter={() => setHoveredRight(true)}
                onMouseLeave={() => setHoveredRight(false)}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <ChevronRight
                    style={{
                        color: '#FB5012',
                        transform: isHoveredRight ? 'scale(2)' : 'scale(1)',
                        transition: 'transform 0.3s'
                    }}
                />
            </button>
        </div>
    );
}
