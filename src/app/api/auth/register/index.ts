
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import router from "next/router";
import { time } from "console";
import { setTimeout } from "timers";



const register = async ( data: object ) => {

    try {
        const response = await axios.post( `${baseUrl}/auth/register`, data );
        console.log( "Cuenta creada con exito" );
        console.log( response.data );
        //fixme: redireccionar a login
        const origin = window.location.origin;
        const loginUrl = `${origin}/auth/login`;

        //timer 3 segundos
        setTimeout( () => {
            Swal.fire({
            title: "Cuanta creada con exito",
            text: "redireccionando a login",
            icon: "success"
            });
        }, 3000 );
        window.location.href = loginUrl;
    } catch ( error ) {
            Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "El usuario o la contraseña ya existen",
            footer: `${error}`,
        });
    }
}; 
export default register;