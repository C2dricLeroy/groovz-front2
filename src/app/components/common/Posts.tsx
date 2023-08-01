import {useEffect, useState} from "react";
import styles from '@/app/components/common/styles.module.css'
import {Post} from "@/models/Post";
import Link from "next/link";
import Spotify from "@/models/Spotify";
import usePostViewModel from "@/app/viewModels/common/PostViewModel";

export default function Posts() {
    const PostViewModel = usePostViewModel();

    return (
        <div className={styles.posts}>
            {PostViewModel.posts.map((post) => {
                const dateObject = new Date(post.createdAt);
                const formattedDate = PostViewModel.formatDate(dateObject);

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
                                <form onSubmit={PostViewModel.handleCommentSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={PostViewModel.comment}
                                        onChange={PostViewModel.handleCommentChange}
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
            <button className={styles.loadMore} onClick={PostViewModel.handleLoadMore}>Load more posts</button>
        </div>
    )
}

