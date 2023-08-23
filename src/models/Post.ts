import {User} from "@/models/User";
import {Buffer} from "buffer";
import axios from "axios";

export class Post {
    static async sharePlaylist(text: string, playlist: any) {
        try {
            const userId = await User.getUserId();
            const xsrfToken = await User.getToken();
            const now = new Date();
            if (!xsrfToken) {
                throw new Error("Token is not available.");
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HTTP}/post/share`, {
                    userId: userId,
                    text: text,
                    postTypeId: 1,
                    createdAt: now,
                    playlistId: playlist
                },
                {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }


    static async getPosts() {
        let limit = 10;
        let skip = 10;
        try {
            let userId = await User.getUserId();
            const xsrfToken = await User.getToken();
            const now = new Date();
            if (xsrfToken && userId) {
                try {
                    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/post/${userId}?limit=${limit}&skip=${skip}`,
                        {
                            headers: {
                                'x-xsrf-token': xsrfToken
                            },
                            withCredentials: true
                        }
                    );
                    return response.data;
                } catch (error: any) {
                    throw new Error(`Failed to share the Playlist : ${error.message}`)
                }
            }
        } catch (error: any) {
            throw new Error(`Failed to Get UserId ${error.message}`)
        }
    }

    static async getOtherPosts(skip: number) {
        try {
            let userId = await User.getUserId();
            const xsrfToken = await User.getToken();
            const now = new Date();
            if (xsrfToken) {
                try {

                    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/post/other/${userId}?skip=${skip}`,
                        {
                            headers: {
                                'x-xsrf-token': xsrfToken
                            },
                            withCredentials: true
                        }
                    );
                    return response.data;
                } catch (error: any) {
                    throw new Error(`Failed to share the Playlist : ${error.message}`)
                }
            }
        } catch (error: any) {
            throw new Error(`Failed to Get UserId ${error.message}`)
        }
    }
}