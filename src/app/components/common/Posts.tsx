import {useEffect, useState} from "react";
import styles from '@/app/components/common/styles.module.css'
import {Post} from "@/classes/Post";
import Link from "next/link";
import Spotify from "@/classes/Spotify";

export default function Posts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<number>(10);
    const [loadedPostsCount, setLoadedPostsCount] = useState(10);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const initialPosts: any = await Post.getPosts();
            console.log(initialPosts)
            const playlistIds = initialPosts
                .filter((post: any) => post.playlistId != null)
                .map((post: any) => post.playlistId);

            const playlistsPromises = playlistIds.map((id: any) => Spotify.getPlaylistById(id));
            const playlists = await Promise.all(playlistsPromises);

            const postsWithPlaylists = initialPosts.map((post: any) => {
                if (post.playlistId != null) {
                    const playlist = playlists.find(pl => pl.id === post.playlistId);
                    return { ...post, playlist: playlist };
                } else {
                    return post;
                }
            });
            setPosts(postsWithPlaylists);
        };
        fetchPosts();
    }, []);

    const handleLoadMore = async () => {
        const newPosts = await Post.getOtherPosts(loadedPostsCount);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
        setLoadedPostsCount(prevCount => prevCount + 10);
    };

    const handleCommentSubmit = async () => {
        console.log('Thanks for commenting')
        alert('Comments are not available yet, please retry later!')
    }

    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <div className={styles.posts}>
            {posts.map((post) => {
                const dateObject = new Date(post.createdAt);
                const formattedDate = `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;

                return (
                    <div key={post.postId} className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.postProfilePicture}>
                                <Link target="_blank"
                                      rel="noopener noreferrer"
                                      href={`/profile/userProfile/${post.userId}`}>
                                    <img className={styles.profilePicture} src="/profil-de-lutilisateur.png" alt="profile picture" />
                                </Link>
                            </div>
                            <div className={styles.userName}>
                                <Link target="_blank"
                                      rel="noopener noreferrer"
                                      href={`/profile/userProfile/${post.userId}`}>
                                    <p><b>{post.user.userName}</b></p>
                                </Link>
                            </div>
                            <div className={styles.postDate}>
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                        <div key={post.postId} className={styles.postContainer}>
                            <p>{post.text}</p>
                        </div>
                        {post.playlist && (
                            <div key={post.playlist.id}>
                                <Link href={post.playlist.external_urls.spotify}>
                                    <div className={styles.postPlaylistContainer}>
                                        <h4 className={styles.postPlaylistTitle}><b>{post.playlist.name}</b></h4>
                                        <img className={styles.postPlaylistPicture} src={post.playlist.images[0].url} alt="Playlist Cover"/>
                                    </div>
                                </Link>
                            </div>

                        )}
                        <div className={styles.line}></div>
                        <div className={styles.postFooter}>
                            <div className={styles.commentsContainer}>
                                <div className={styles.comments}>
                                    <p>comment</p>
                                    <p>comment</p>
                                </div>
                                <form onSubmit={handleCommentSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={handleCommentChange}
                                        className={styles.commentInput}
                                    />
                                    <button type="submit" className={styles.commentSubmitButton}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div className={styles.iconsContainer}>
                            </div>
                        </div>
                    </div>
                );
            })}
            <button className={styles.loadMore} onClick={handleLoadMore}>Load more posts</button>
        </div>
    )
}

