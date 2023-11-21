// api/post/getPost/index.ts
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";

  interface Post {
        id: number;
        title: string;
        description: string;
        likes: number;
        createdAt: string;
        createdBy: {
            id: number;
            username: string;
        };
    }

const getPost = async (): Promise<Post[]> => {
    try {
    const token = await getToken();

    const response = await axios.get(`${baseUrl}/post/my-posts`, {
        headers: {
        'accept': '*',
        'Authorization': `Bearer ${token}`,
        },
    });

    return response.data;
    } catch (error) {
    return Promise.reject(error);
    }
};

const updatePost = async (postId: number, updatedData: any): Promise<boolean> => {
    try {
    const token = await getToken();

    const response = await axios.put(
        `${baseUrl}/post/edit/${postId}`,
        updatedData,
        {
        headers: {
            'accept': '*',
            'Authorization': `Bearer ${token}`,
        },
        }
    );

    return response.data.success; // Assuming your API returns a success property
    } catch (error) {
    return Promise.reject(error);
    }
};

export { getPost, updatePost };
