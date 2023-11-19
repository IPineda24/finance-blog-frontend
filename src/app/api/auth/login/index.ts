import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import setCookies from "./setToken";

const login = async ( data: any ) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/log-in`, data );
        Swal.fire({
            title: "Inicio de sesión exitoso.",
            text: "Redireccionando a la pantalla principal",
            icon: "success"
});
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
            text: "El usuario o la contraseña son incorrectos.",
            footer: `${error}`,
            } );
    }
};
export default login;