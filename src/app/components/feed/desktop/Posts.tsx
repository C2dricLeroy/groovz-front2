import {useEffect, useState} from "react";
import styles from '@/app/components/feed/desktop/styles.module.css'
import {Post} from "@/classes/Post";
import Link from "next/link";


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState<number>(10);
    const [loadedPostsCount, setLoadedPostsCount] = useState(10);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const initialPosts: any = await Post.getPosts();

            setPosts(initialPosts);
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

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    console.log(posts)

    return (

        <div className={styles.posts}>
            {posts.map((post) => {
                const dateObject = new Date(post.createdAt);
                const formattedDate = `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;

                return (
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.postProfilePicture}>
                                <Link href={`/profile/userProfile/${post.userId}`}>
                                    <img className={styles.profilePicture} src="/profil-de-lutilisateur.png" alt="profile picture" />
                                </Link>
                            </div>
                            <div className={styles.userName}>
                                <Link href={`/profile/userProfile/${post.userId}`}>
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

