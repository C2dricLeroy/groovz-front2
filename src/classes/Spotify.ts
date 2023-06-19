import axios from "axios";

export class Spotify {
    static async tokenStorage(userId: number, accessToken: string, refreshToken: string) {
        try {
            const response = await axios.post('http://localhost:3333/spotify/tokenStorage', {
                userId: userId,
                accessToken: accessToken,
                refreshToken: refreshToken
            });


            if (response.status === 200) {
                console.log('Les jetons ont été enregistrés avec succès');
                return true;
            } else {
                console.error('Une erreur est survenue lors de l\'enregistrement des jetons');
                return false;
            }
        } catch (error) {
            console.error('Une erreur est survenue lors de l\'envoi des jetons au serveur :', error);
        }
    }
}