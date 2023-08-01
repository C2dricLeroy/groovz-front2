import {useCallback, useEffect, useState} from "react";
import {Post} from "@/models/Post";
import {Customer} from "@/models/Customer";


export function usePostCreationViewModel() {
    const [playlists, setPlaylists] = useState<{public: boolean, id: string, name: string}[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchPlaylists = useCallback(async () => {
        const playlists = await Customer.getPlaylists();

        setPlaylists(playlists.items);

        if(playlists.items.length > 0) {
            setSelectedPlaylist(playlists.items[0].id);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault();
        await Post.sharePlaylist(comment, selectedPlaylist);
    }, [comment, selectedPlaylist]);

    return {
        playlists,
        selectedPlaylist,
        comment,
        loading,
        setComment,
        setSelectedPlaylist,
        handleSubmit
    };
}
