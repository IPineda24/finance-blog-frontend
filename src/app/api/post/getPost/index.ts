//api/post/getPost/index.ts
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";
const getPost = async () => {
    try {
        const per_page = 1;
        const token = await getToken();
    const response = await axios.get(
    `${baseUrl}/post`,
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
