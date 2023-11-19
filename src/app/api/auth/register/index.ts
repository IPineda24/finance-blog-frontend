
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
const register = async ( data: object ) => {

    try {
        const response = await axios.post( `${baseUrl}/auth/register`, data );
        //fixme: redireccionar a login
        const origin = window.location.origin;
        const loginUrl = `${origin}/auth/login`;

            Swal.fire({
            title: "Cuanta creada con exito",
            text: "redireccionando a login",
            icon: "success"
            } );
        
        setTimeout(() => {
            window.location.href = loginUrl;
        }, 2000 );
        
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