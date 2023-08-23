import {Buffer} from "buffer";
import axios from "axios";
import {User} from "@/models/User";


export class UserFollow {

    static async isUserFollowed(userId: string) {
        try {
            let token = await User.getToken();
            const xsrf = await localStorage.getItem('xsrf_token');
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                let correctUserId = parseInt(userId);
                const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_HTTP + `/follow/isUserFollowed`, {
                        followedUserId: correctUserId,
                        userId: parseInt(payload.userId)
                    },
                    {
                        headers: { Authorization: `Bearer ${token}`,
                        'x-xsrf-token': xsrf
                        }
                    });
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
            const xsrf = await localStorage.getItem('xsrf_token');
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_HTTP + `/follow/follow`, {
                    followedUserId: parseInt(userId),
                    userId: parseInt(payload.userId)
                },
                    {
                    headers: { Authorization: `Bearer ${token}`,
                    'x-xsrf-token': xsrf
                    }
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
            const xsrf = await localStorage.getItem('xsrf_token');
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

                const response = await axios.post(process.env.NEXT_PUBLIC_SEVRER_HTTP + '/follow/unfollow', {
                        followedUserId: parseInt(userId),
                        userId: parseInt(payload.userId)
                    },
                    {
                        headers: { Authorization: `Bearer ${token}`,
                        'x-xsrf-token': xsrf
                        }
                    });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}