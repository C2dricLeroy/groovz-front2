import styles from "@/app/components/Spotify/styles.module.css"
import {User} from "@/classes/User";
import {Buffer} from "buffer";
import axios from "axios";

const redirect_uri = encodeURIComponent('http://localhost:3333/spotify/callback');

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

export default function SpotifyLoginButton() {

    let client_id = process.env.CLIENT_ID;


    const handleLogin = async () => {

        const token = await User.getToken();

        if (token !== null) {

            let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            let userId = payload.userId;
            if (!client_id) {
                throw new Error("Client not found");
            }


            const response = await axios.get(`http://localhost:3333/spotify/generateState/${userId}`);

            const state = await response.data;



            window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

        }
    }

    return (
        <button className={styles.spotifyLoginButton} onClick={handleLogin}>
            Connexion avec Spotify
        </button>
    );
}
