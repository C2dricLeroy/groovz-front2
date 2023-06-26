import {User} from "@/classes/User";
import {Buffer} from "buffer";
import axios from "axios";

export class Post{
static async sharePlaylist(text, playlist) {
    try {
        let token = await User.getToken();
        const now = new Date();
        if (token !== null) {
            try {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.post(`http://localhost:3333/post/share`, {
                    userId: payload.userId,
                    text: text,
                    postTypeId: 2,
                    createdAt: now,
                    playlistId: playlist

                });
                return response.data;
            } catch (error) {
                throw new Error(`Failed to share the Playlist : ${error.message}`)
            }

        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
}