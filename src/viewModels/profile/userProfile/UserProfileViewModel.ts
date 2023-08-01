import { useEffect, useState } from "react";
import {User} from "@/models/User";
import {UserFollow} from "@/models/UserFollow";

interface IUser {
    userName: string;
    follows: string;
    followers: string;
}

interface DesktopUserProfileProps {
    userId: string;
}

export default function useUserProfileViewModel(userId: any) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const name = await User.getUserNameById(userId);
            const follows = await User.getFollowsById(userId);
            const followers = await User.getFollowersById(userId);
            const following = await UserFollow.isUserFollowed(userId);

            setUser({
                userName: name.userName,
                follows: follows,
                followers: followers
            });
            setIsFollowing(following);
        }
        fetchUser();
    }, [userId]);

    const toggleFollow = async () => {
        if (isFollowing) {
            await UserFollow.unfollow(userId);
        } else {
            await UserFollow.follow(userId);
        }
        setIsFollowing(!isFollowing);
    }

    return { user, isFollowing, toggleFollow };
}
