import {Buffer} from "buffer";
import axios from "axios";
import Cookies from 'js-cookie';

export interface UserDataType {
    userName: string;
    userId: string;
}

export class User {
    static async getToken() {
        try {
            return await localStorage.getItem('xsrfToken');
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getUserId() {
        try {
            let userId = await localStorage.getItem('userId');
            return userId;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getUserName() {
        try {
            let userId = await this.getUserId();
            let xsrfToken = await this.getToken();
            if (userId && xsrfToken !== null) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/name/${userId}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                });
                return response.data;
            }
        } catch (error: any) {
            console.error(error);
            return { success: false, error: `Failed to get username: ${error.message}` };
        }
    }

    static async getFollows() {
        try {
            let userId = await this.getUserId();
            let xsrfToken = await this.getToken();
            if (userId && xsrfToken !== null) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/follows/${userId}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
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
            let userId = await this.getUserId();
            let xsrfToken = await this.getToken();
            if (userId && xsrfToken !== null) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/followers/${userId}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
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
            let xsrfToken = await this.getToken();
            if (xsrfToken) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/name/${id}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                });
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollowersById(userId: string) {
        try {
            let xsrfToken = await this.getToken();
            if (xsrfToken) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/followers/${userId}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                });
                return response.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getFollowsById(id: string) {
        try {
            let xsrfToken = await this.getToken();
            if (xsrfToken) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/follows/${id}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
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
            let userId = await this.getUserId();
            let xsrfToken = await this.getToken();
            if (xsrfToken) {
                const response = await axios.patch(process.env.NEXT_PUBLIC_SERVER_HTTP + `/user/updateName/${userId}`, {
                    userName: userName
                }, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                });
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async searchUsers(searchTerm: string): Promise<UserDataType[]> {
            let userId = await this.getUserId();
            let xsrfToken = await this.getToken();
            if (userId && xsrfToken) {
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/search/${searchTerm}`, {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                });
                let results = response.data.filter((item: UserDataType) => item.userId !== userId);
                console.log(results);
                return results;
            }

        return [];
    }
}
