// likeHandler.js
import axios from 'axios';
import baseUrl from '@/app/utils/baseUrl';
import getToken from '@/app/utils/toke';

const handleLikes = async (postId: number) => {
    try {
        const token = await getToken();
        const response = await axios.patch(
            `${baseUrl}/post/react/${postId}`,
            {},
            {
                headers: {
                    accept: '*',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.likes;
    } catch (error) {
        console.error('Error al dar like al post', error);
        throw error;
    }
};

export default handleLikes;