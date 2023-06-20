import Spotify from "@/classes/Spotify";



export class Customer {

    static async getPlaylists(){
        const user_id = await Spotify.getSpotifyId();
        console.log(user_id);
        const spotifyInstance = await Spotify.createAxiosInstance();


        try {
            const response = await spotifyInstance.get(`users/${user_id}/playlists`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get playlists: ${error.message}`);
        }
    }
}