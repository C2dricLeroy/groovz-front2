import {useEffect, useState} from "react";
import {Customer} from "@/classes/Customer";
import styles from '@/app/components/feed/desktop/styles.module.css'

export default function PostCreation() {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlists = await Customer.getPlaylists();
            console.log(playlists.items)
            setPlaylists(playlists.items);
        };
        fetchPlaylists();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(`Playlist: ${selectedPlaylist}, Commentaire: ${comment}`);
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
                            {playlists.map(playlist => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className = {styles.playlistComment}>
                        Text:
                        <textarea style={{ width: '75%',
                            marginLeft: '5%'}} value={comment} onChange={(e) => setComment(e.target.value)} />
                    </label>
                </div>
                <button type="submit" className={styles.postSubmitButton}>Poster</button>
            </form>
        </div>
    )
}