import {useEffect, useState} from "react";
import {Post} from "@/classes/Post";


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState<number>(10);
    const [loadedPostsCount, setLoadedPostsCount] = useState(10);

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

    return(
        <div>
            {posts.map((post) => (
                <div key={post.postId}>
                    <p>{post.text}</p>
                </div>
            ))}
            <button onClick={handleLoadMore}>Charger plus</button>
        </div>
    )
}
