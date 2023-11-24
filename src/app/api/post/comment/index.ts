// api.js (o api.ts si estás utilizando TypeScript)
import baseUrl from "@/app/utils/baseUrl";
import getToken from "@/app/utils/toke";
import axios from "axios";


export const addComment = async (postId:number, comment:string) => {
    try {
    const token = await getToken();
    const response = await axios.post(`${baseUrl}/comments/add-comment/${postId}`, { comment }, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    return response.data; // Supongo que la respuesta de la API contiene los detalles del comentario recién agregado
    } catch (error) {
    throw new Error('Error al agregar comentario');
    }
};

export const deleteComment = async (commentId: string) => {
    try {
        const token = await getToken();
        await axios.delete(`${baseUrl}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Error al eliminar comentario');
    }
};