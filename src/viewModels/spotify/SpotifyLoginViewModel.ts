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
        const token = await User.getToken();
        if (token !== null) {
            let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            let userId = payload.userId;
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/spotify/generateState/${userId}`);
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