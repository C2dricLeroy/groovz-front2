import {User} from "@/models/User";
import {Buffer} from "buffer";
import axios from "axios";

export default function useSpotifyLoginViewModel() {
    const redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_SERVER_HTTP + '/spotify/callback');
    const scopes = [
        'user-read-private',
        'user-read-email',
        'user-follow-read',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-top-read',
        'user-library-read',
        'user-library-modify'
    ];
    const scope = encodeURIComponent(scopes.join(' '));
    let client_id = process.env.CLIENT_ID;

    const handleLogin = async () => {
        const xsrfToken = await User.getToken();
        if (xsrfToken) {
            let userId = await User.getUserId();
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/spotify/generateState/${userId}`,
                {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                }
            );
            const state = await response.data;
            if (!client_id) {
                throw new Error("Client not found");
            }
            window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
        }
    }

    return {
        handleLogin,
    }
}