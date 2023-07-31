import {Buffer} from "buffer";
import axios from "axios";

export class User {
    static async  getToken() {
        try {
            return await localStorage.getItem('userToken');
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getFullName(user: any) {
        return user.firstName + ' ' + user.lastName;
    }

    static async getUserName() {
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/name/${payload.userId}`, {
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
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/follows/${payload.userId}`, {
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
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/followers/${payload.userId}`, {
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
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/name/${id}`, {
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
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/followers/${userId}`, {
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
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/follows/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateName(userName: string){
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                const response = await axios.patch(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/updateName/${payload.userId}`, {
                    userName: userName
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}
