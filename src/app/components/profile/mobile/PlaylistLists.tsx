"use client";
import {useEffect, useState} from "react";
import {Customer} from "@/classes/Customer";

export default function PlaylistLists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlists = await Customer.getPlaylists();
            setPlaylists(playlists.items);
            setLoading(false);
        };
        fetchPlaylists();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto', backgroundColor: "white" }}>
            {Array.isArray(playlists) && playlists.map((playlist) => {
                console.log(playlist);
                return (
                    <div key={playlist.id}>
                        <img
                            src={playlist.images[0]?.url || 'defaultImageURL'}
                            alt={playlist.name}
                            width={200}
                            height={200}
                        />
                        <h2>{playlist.name}</h2>
                    </div>
                );
            })}
        </div>
    );

}
