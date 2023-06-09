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

    static async getUserInformations(token: any) {
        try {
            let token = await this.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                console.log(payload);
                const response = await axios.get(`http://localhost:3333/user/${payload.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);
                return response.data;
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
