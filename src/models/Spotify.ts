import axios from 'axios';
import {User} from './User';
import {Buffer} from "buffer";

class Spotify {
    static async getToken() {
        const appToken = await User.getToken();
        if (!appToken) {
            throw new Error('appToken is undefined');
        }
        const splitToken = appToken.split('.')[1];
        if (!splitToken) {
            throw new Error('Cannot get payload from appToken');
        }
        let payload = JSON.parse(Buffer.from(splitToken, 'base64').toString());
        try{
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/spotify/getSpotifyAccess/${payload.userId}`);
            const spotifyToken = response.data.spotifyAccessToken;
            const refreshToken = response.data.spotifyRefreshToken;
            return { spotifyToken, refreshToken };
        } catch (error: any) {
            throw new Error(`Failed to get tokens: ${error.message}`);
        }
    }

    static async createAxiosInstance() {
        const appToken = await User.getToken();
        if (!appToken) {
            throw new Error('appToken is undefined');
        }
        const splitToken = appToken.split('.')[1];
        if (!splitToken) {
            throw new Error('Cannot get payload from appToken');
        }
        let payload = JSON.parse(Buffer.from(splitToken, 'base64').toString());
        const { spotifyToken, refreshToken } = await Spotify.getToken();
        const instance = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + spotifyToken }
        });

        instance.interceptors.response.use(response => response, async function axiosRetryInterceptor(error) {

            if (error.response && error.response.status === 401) {
                const originalRequest = error.config;
                const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_HTTP + `/spotify/refreshToken/${payload.userId}`, {
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
        } catch (error: any) {
            console.log(error);
            throw new Error(`Failed to get Spotify user ID: ${error.message}`);
        }
    }
     static async getPlaylistById(id: any){
        const spotifyInstance = await Spotify.createAxiosInstance();
        try {
            const response = await spotifyInstance.get(`playlists/${id}`)
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to get Plalist By Id: ${error.message}`)
        }
     }
}

export default Spotify;
