// api/post/createPost/index.ts
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";
import Swal from "sweetalert2";

const createPost = async (postData: { title: string; description: string }) => {
  try {
    const token = await getToken();
    const response = await axios.post(`${baseUrl}/post`, postData, {
        headers: {
        'accept': '*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
    } );
        Swal.fire({
            title: "post creado con éxito.",
            text: "Redireccionando a la pantalla principal",
            icon: "success"
});
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
