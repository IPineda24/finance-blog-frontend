// api/post/createPost/index.ts
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";
import Swal from "sweetalert2";

interface PostData {
    title: string;
    description: string;
    }

const createPost = async (postData :PostData) => {
    try {
    const token = await getToken();
    const response = await axios.post(`${baseUrl}/post`, postData, {
        headers: {
        'accept': '*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
    } );
        const origin = window.location.origin;
        const loginUrl = `${origin}/dashboard`;

        setTimeout(() => {
            window.location.href = loginUrl;
        }, 2000 );
        return response.data;

    } catch (error) {
    console.error('Error creating post:', error);
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "No se pudo crear el post.",
            footer: `${error}`,
            } );
    }
};

export default createPost;
