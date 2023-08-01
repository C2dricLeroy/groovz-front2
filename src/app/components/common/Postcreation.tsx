import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";
import styles from '@/app/components/common/styles.module.css'
import {Post} from "@/models/Post";
import {usePostCreationViewModel} from "@/app/viewModels/common/PostCreationViewModel";

export default function PostCreation() {
    const PostCreationViewModel = usePostCreationViewModel();

    if (PostCreationViewModel.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className = {styles.postCreationComponent}>
            <form onSubmit={PostCreationViewModel.handleSubmit}>
                <div className={styles.postForm}>
                    <label className = {styles.playlistChoice}>
                        Choose a playlist:
                        <select style={{ width: '70%',
                        marginLeft: '5%'}}
                                placeholder="Select a playlist" value={PostCreationViewModel.selectedPlaylist} onChange={(e) => PostCreationViewModel.setSelectedPlaylist(e.target.value)}>
                            {(PostCreationViewModel.playlists || []).length > 0 && PostCreationViewModel.playlists?.map(playlist =>
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
                        <textarea className={styles.textArea} value={PostCreationViewModel.comment} onChange={(e) => PostCreationViewModel.setComment(e.target.value)} />
                    </label>
                </div>
                <button type="submit" className={styles.postSubmitButton}>Poster</button>
            </form>
        </div>
    )
}