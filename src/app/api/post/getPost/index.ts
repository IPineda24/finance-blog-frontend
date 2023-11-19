//api/post/getPost/index.ts
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";
const getPost = async (page: number) => {
    try {
        const per_page = 1;
        const token = await getToken();
    const response = await axios.get(
    `${baseUrl}/post?page=${page}&per_page=${per_page}`,
    {
        headers: {
        'accept': '*',
        'Authorization': `Bearer ${token}`,
        },
    }
    );
    return response.data;
} catch ( error ) {
    return false;
    
}
};

export default getPost;
