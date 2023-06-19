import axios from 'axios';
import {User} from './User';

class Spotify {
    static async getToken() {
        const appToken = await User.getToken();
        const {refreshToken, spotifyToken} = await axios.get(`http://localhost:3333/spotify/getSpotifyAccess/${appToken}`);

        const instance = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + spotifyToken }
        });

        instance.interceptors.response.use(response => response, async function axiosRetryInterceptor(error) {
            if (error.response && error.response.status === 401) {
                const originalRequest = error.config;
                const response = await axios.post('/api/spotify/refreshToken', {
                    refreshToken: refreshToken
                });
                if (response.status === 200) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
                    return axios(originalRequest);
                }
            }
            return Promise.reject(error);
        });

        return instance;
    }
}

export default Spotify;
