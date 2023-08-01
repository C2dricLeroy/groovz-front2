import { useEffect, useState } from "react";
import {Customer} from "@/models/Customer";

export default function usePlaylistViewModel() {
    const [playlists, setPlaylists] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [scrollIndex, setScrollIndex] = useState(0);
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

    return {
        playlists,
        loading,
        scrollLeft,
        scrollRight,
        itemsToShow,
        scrollIndex
    };
}
