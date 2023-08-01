"use client";
import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import usePlaylistViewModel from "@/viewModels/profile/PlaylistListViewModel";

export default function PlaylistLists() {
    const [isHoveredLeft, setHoveredLeft] = useState(false);
    const [isHoveredRight, setHoveredRight] = useState(false);

    const playlistViewModel = usePlaylistViewModel();

    if (playlistViewModel.loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
                onClick={playlistViewModel.scrollLeft}
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
                {playlistViewModel.playlists.slice(playlistViewModel.scrollIndex, playlistViewModel.scrollIndex + playlistViewModel.itemsToShow).map((playlist: any) => (
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
                onClick={playlistViewModel.scrollRight}
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
