import {Buffer} from "buffer";
import axios from "axios";
import {User} from "@/classes/User";


export class UserFollow {

    static async isUserFollowed(userId: string) {
        try {
            let token = await User.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                let correctUserId = parseInt(userId);
                const response = await axios.post(`http://localhost:3333/follow/isUserFollowed`, {
                        followedUserId: correctUserId,
                        userId: parseInt(payload.userId)
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                console.log(response.data)
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async follow(userId: string) {
        try {
            let token = await User.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.post(`http://localhost:3333/follow/follow`, {
                    followedUserId: parseInt(userId),
                    userId: parseInt(payload.userId)
                },
                    {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async unfollow(userId: string) {
        try {
            let token = await User.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

                const response = await axios.post('http://localhost:3333/follow/unfollow', {
                        followedUserId: parseInt(userId),
                        userId: parseInt(payload.userId)
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}