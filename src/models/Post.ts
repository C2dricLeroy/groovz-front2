import {User} from "@/models/User";
import {Buffer} from "buffer";
import axios from "axios";

export class Post {
    static async sharePlaylist(text: string, playlist: any) {
        try {
            const token = await User.getToken();
            const xsrf = localStorage.getItem('xsrf_token');
            const now = new Date();
            if (!token) {
                throw new Error("Token is not available.");
            }
            let payload;
            try {
                payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            } catch {
                throw new Error("Failed to decode the token.");
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HTTP}/post/share`, {
                    userId: payload.userId,
                    text: text,
                    postTypeId: 1,
                    createdAt: now,
                    playlistId: playlist
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-xsrf-token': xsrf
                    }
                });
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
            let token = await User.getToken();
            const xsrf = localStorage.getItem('xsrf_token');
            const now = new Date();
            if (token !== null) {
                try {
                    let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/post/${payload.userId}?limit=${limit}&skip=${skip}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'x-xsrf-token': xsrf
                            }
                        })
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
            let token = await User.getToken();
            const xsrf = localStorage.getItem('xsrf_token');
            const now = new Date();
            if (token !== null) {
                try {
                    let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/post/other/${payload.userId}?skip=${skip}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'x-xsrf-token': xsrf
                            }
                        })
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