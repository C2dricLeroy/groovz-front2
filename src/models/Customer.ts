import Spotify from "@/models/Spotify";



export class Customer {

    static async getPlaylists(){
        const user_id = await Spotify.getSpotifyId();
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/users/${user_id}/playlists`);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to get playlists: ${error.message}`);
        }
    }

    static async getFollowedArtists() {
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/me/following?type=artist`);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to get followed artists: ${error.message}`);
        }
    }

    static async getFollowedUsers() {
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`/me/following?type=user`);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to get followed users: ${error.message}`);
        }
    }

    static async getRecommendations() {
        const spotifyInstance = await Spotify.createAxiosInstance();
        const response = await this.getFollowedArtists();
        const followedArtists = response.artists.items;
        const randomArtistIndex = Math.floor(Math.random() * followedArtists.length);
        const randomArtist = followedArtists[randomArtistIndex];
        try {
            const response = await spotifyInstance.get(`/recommendations?seed_artists=${randomArtist.id}&limit=3`)
            return response.data.tracks;
        } catch (error: any) {
            throw new Error(`Failed to get User's recommandations : ${error.message}`)
        }
    }

}