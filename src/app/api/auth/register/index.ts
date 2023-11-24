
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
const register = async ( data: object ) => {

    try {
        const response = await axios.post( `${baseUrl}/auth/register`, data );
        const origin = window.location.origin;
        const loginUrl = `${origin}/auth/login`;
        
        setTimeout(() => {
            window.location.href = loginUrl;
        }, 2000 );
        
    } catch ( error ) {
            Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "El usuario o el correo ya están registrados.",
            footer: `${error}`,
        });
    }
}; 
export default register;