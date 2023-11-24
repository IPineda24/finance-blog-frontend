import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import setCookies from "./setToken";

const login = async ( data: object ) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/log-in`, data );
        setCookies(  response.data.access_token.toString() );
        const origin = window.location.origin;
        
        const loginUrl = `${origin}/dashboard`;

        setTimeout(() => {
            window.location.href = loginUrl;
        }, 2000 );


    } catch ( error ) {
            Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Las credenciales son incorrectas.",
            footer: `${error}`,
            } );
    }
};
export default login;