import {Buffer} from "buffer";
import axios from "axios";


export class User {
    static async  getToken() {
        try {
            let token = await localStorage.getItem('userToken');
            return token;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getUserName() {
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.get(`http://localhost:3333/user/name/${payload.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollows() {
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.get(`http://localhost:3333/user/follows/${payload.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollowers() {
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.get(`http://localhost:3333/user/followers/${payload.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getUserNameById(id: string) {
        try {
            let token = await this.getToken();
            if (token !== null) {

                const response = await axios.get(`http://localhost:3333/user/name/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollowersById(userId: string) {
        try {
            let token = await this.getToken();
            if (token !== null) {

                const response = await axios.get(`http://localhost:3333/user/followers/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollowsById(userId: string) {
        try {
            let token = await this.getToken();
            if (token !== null) {
                const response = await axios.get(`http://localhost:3333/user/follows/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
