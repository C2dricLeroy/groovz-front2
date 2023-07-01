import {User} from "@/classes/User";
import {Buffer} from "buffer";
import axios from "axios";

export class Post {
    static async sharePlaylist(text: string, playlist: any) {
        try {
            let token = await User.getToken();
            const now = new Date();
            if (token !== null) {
                try {
                    let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    const response = await axios.post(`https://api.groovz.fr:3333/post/share`, {
                        userId: payload.userId,
                        text: text,
                        postTypeId: 2,
                        createdAt: now,
                        playlistId: playlist

                    });
                    return response.data;
                } catch (error: any) {
                    throw new Error(`Failed to share the Playlist : ${error.message}`)
                }
            }
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
            const now = new Date();
            if (token !== null) {
                try {
                    let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    const response = await axios.get(`https://api.groovz.fr:3333/post/${payload.userId}?limit=${limit}&skip=${skip}`)
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
            const now = new Date();
            if (token !== null) {
                try {
                    let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    const response = await axios.get(`https://api.groovz.fr:3333/post/other/${payload.userId}?skip=${skip}`)
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