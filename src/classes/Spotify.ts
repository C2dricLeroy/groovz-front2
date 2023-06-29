import axios from 'axios';
import {User} from './User';
import {Buffer} from "buffer";

class Spotify {
    static async getToken() {
        const appToken = await User.getToken();
        let payload = JSON.parse(Buffer.from(appToken?.split('.')[1], 'base64').toString());
        try{
            const response = await axios.get(`http://217.160.238.71:3333/spotify/getSpotifyAccess/${payload.userId}`);
            const spotifyToken = response.data.spotifyAccessToken;
            const refreshToken = response.data.spotifyRefreshToken;
            return { spotifyToken, refreshToken };
        } catch (error) {
            throw new Error(`Failed to get tokens: ${error.message}`);
        }
    }

    static async createAxiosInstance() {
        const appToken = await User.getToken();
        let payload = JSON.parse(Buffer.from(appToken?.split('.')[1], 'base64').toString());
        const { spotifyToken, refreshToken } = await Spotify.getToken();
        const instance = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + spotifyToken }
        });

        instance.interceptors.response.use(response => response, async function axiosRetryInterceptor(error) {

            if (error.response && error.response.status === 401) {
                const originalRequest = error.config;
                const res = await axios.post(`http://217.160.238.71:3333/spotify/refreshToken/${payload.userId}`, {
                    refreshToken: refreshToken
                });
                if (res.status === 200) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + res.data.spotifyAccessToken;
                    return axios(originalRequest);
                }
            }
            return Promise.reject(error);
        });
        return instance;
    }

    static async getSpotifyId(){
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get('/me');
            return response.data.id;
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to get Spotify user ID: ${error.message}`);
        }
    }
     static async getPlaylistById(id){
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`playlists/${id}`)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get Plalist By Id: ${error.message}`)
        }
     }
}

export default Spotify;
