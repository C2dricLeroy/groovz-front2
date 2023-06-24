import Spotify from "@/classes/Spotify";



export class Customer {

    static async getPlaylists(){
        const user_id = await Spotify.getSpotifyId();
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/users/${user_id}/playlists`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get playlists: ${error.message}`);
        }
    }

    static async getFollowedArtists() {
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/me/following?type=artist`);
            console.log(response)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get followed artists: ${error.message}`);
        }
    }

    static async getFollowedUsers() {
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/me/following?type=user`);
            console.log(response)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get followed users: ${error.message}`);
        }
    }

}