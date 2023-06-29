import {useEffect, useState} from "react";
import {Customer} from "@/classes/Customer";
import styles from '@/app/components/common/styles.module.css'
import {Post} from "@/classes/Post";

export default function PostCreation() {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlists = await Customer.getPlaylists();

            setPlaylists(playlists.items);

            if(playlists.items.length > 0) {
                setSelectedPlaylist(playlists.items[0].id);
            }
            setLoading(false);
        };
        fetchPlaylists();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await Post.sharePlaylist(comment, selectedPlaylist);
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className = {styles.postCreationComponent}>
            <form onSubmit={handleSubmit}>
                <div className={styles.postForm}>
                    <label className = {styles.playlistChoice}>
                        Choose a playlist:
                        <select style={{ width: '70%',
                        marginLeft: '5%'}}
                                placeholder="Select a playlist" value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                            {playlists.length > 0 && playlists.map(playlist =>
                                (playlist.public === true) ? (
                                    <option key={playlist.id} value={playlist.id}>
                                        {playlist.name}
                                    </option>
                                ) : null
                            )}
                        </select>
                    </label>
                </div>
                <div>
                    <label className = {styles.playlistComment}>
                        <p>Text:</p>
                        <textarea className={styles.textArea} value={comment} onChange={(e) => setComment(e.target.value)} />
                    </label>
                </div>
                <button type="submit" className={styles.postSubmitButton}>Poster</button>
            </form>
        </div>
    )
}