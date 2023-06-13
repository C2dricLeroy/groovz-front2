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
}
