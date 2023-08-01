"use client";
import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useRecentlyFollowedViewModel from "@/app/viewModels/profile/RecentlyFollowedViewModel";

export default function RecentlyFollowed() {
    const [isHoveredLeft, setHoveredLeft] = useState(false);
    const [isHoveredRight, setHoveredRight] = useState(false);
    const RecentlyFollowedViewModel = useRecentlyFollowedViewModel();

    if (RecentlyFollowedViewModel.loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
                onClick={RecentlyFollowedViewModel.scrollLeft}
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
                {RecentlyFollowedViewModel.artists.slice(RecentlyFollowedViewModel.scrollIndex, RecentlyFollowedViewModel.scrollIndex + RecentlyFollowedViewModel.itemsToShow).map((artist: any) => (
                    <div key={artist.id} style={{display: 'flex', flexDirection: 'column', flex: '0 0 auto', marginRight: '10px', alignItems:'center', justifyContent: 'center' }}>
                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <img
                                src={artist.images[0]?.url || 'defaultImageURL'}
                                alt={artist.name}
                                style={{
                                    width: window.innerWidth <= 600 ? '130px' : '200px',
                                    height: window.innerWidth <= 600 ? '130px' : '200px',
                                    margin: '1vh'
                                }}
                            />
                            <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: window.innerWidth <= 600 ? '130px' : '200px', margin: '1vh' }}>{artist.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
            <button
                onClick={RecentlyFollowedViewModel.scrollRight}
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
