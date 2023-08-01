import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";

export default function useRecentlyFollowedViewModel() {
    const [artists, setArtists] = useState([]);
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
        const fetchArtists = async () => {
            const result = await Customer.getFollowedArtists();
            setArtists(result.artists.items);
            setLoading(false);
        };
        fetchArtists();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollRight = () => {
        if (scrollIndex < artists.length - itemsToShow) {
            setScrollIndex(scrollIndex + 1)
        }
    };
    const scrollLeft = () => {
        if (scrollIndex > 0) {
            setScrollIndex(scrollIndex - 1);
        }
    };

    return {
        scrollLeft,
        scrollRight,
        scrollIndex,
        artists,
        loading,
        itemsToShow,
    }
}