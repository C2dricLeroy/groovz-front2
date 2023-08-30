import axios from 'axios';
import {User} from '../../models/User';
import {Post} from "../../models/Post";


describe('Post', () => {

    const userId = 1;
    const xsrfToken = 'token123';
    const text = 'Some text';
    const playlist = { id: 1 };
    const now = new Date();
    const responseData = { success: true };

    beforeEach(() => {
        (User.getUserId as jest.Mock).mockResolvedValue(userId);
        (User.getToken as jest.Mock).mockResolvedValue(xsrfToken);
        (axios.post as jest.Mock).mockResolvedValue({ data: responseData });
    });

    describe('sharePlaylist', () => {
        it('should share a playlist successfully', async () => {

            const result = await Post.sharePlaylist(text, playlist);

            expect(User.getUserId).toHaveBeenCalled();
            expect(User.getToken).toHaveBeenCalled();
            expect(axios.post).toHaveBeenCalledWith(
                `${process.env.NEXT_PUBLIC_SERVER_HTTP}/post/share`,
                {
                    userId,
                    text,
                    postTypeId: 1,
                    createdAt: now,
                    playlistId: playlist
                },
                {
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    withCredentials: true
                }
            );
            expect(result).toEqual(responseData);
        });



    });
});
