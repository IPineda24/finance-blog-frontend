// Objetivo: login de usuario
'use server'
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import { cookies } from 'next/headers'
import Swal from "sweetalert2";

const login = async (data:any) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/log-in`, data );
        console.log( "se inicio sesion" );
        console.log(response.data);
        console.log(response.data.access_token);
        cookies().set( 'token', response.data.access_token );

    } catch ( error ) {
            Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "El usuario o la contraseña son incorrectos",
            footer: `${error}`,
        });
    }
};
export default login;