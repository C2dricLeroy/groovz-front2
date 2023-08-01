import styles from "@/app/components/Spotify/styles.module.css"
import {User} from "@/models/User";
import {Buffer} from "buffer";
import axios from "axios";
import useSpotifyLoginViewModel from "@/app/viewModels/spotify/SpotifyLoginViewModel";

export default function SpotifyLoginButton() {
    const SpotifyLoginViewModel = useSpotifyLoginViewModel();

    return (
        <button className={styles.spotifyLoginButton} onClick={SpotifyLoginViewModel.handleLogin}>
            Connexion avec Spotify
        </button>
    );
}
