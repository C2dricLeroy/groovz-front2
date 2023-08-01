import {useCallback, useEffect, useState} from "react";
import {Post} from "@/models/Post";
import Spotify from "@/models/Spotify";


export default function usePostViewModel() {
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

    const handleLoadMore = useCallback(async () => {
        const newPosts = await Post.getOtherPosts(loadedPostsCount);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
        setLoadedPostsCount(prevCount => prevCount + 10);
    }, []);

    const handleCommentSubmit = useCallback(async () => {
        console.log('Thanks for commenting')
        alert('Comments are not available yet, please retry later!')
    }, []);

    const handleCommentChange = useCallback((e: any) => {
        setComment(e.target.value);
    }, []);

    const formatDate = useCallback((dateObject: Date) => {
        return `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;
    }, []);

    return {
        handleCommentChange,
        handleCommentSubmit,
        handleLoadMore,
        setComment,
        setLoadedPostsCount,
        setPosts,
        setVisiblePosts,
        comment,
        visiblePosts,
        posts,
        loadedPostsCount,
        formatDate,
    }
}