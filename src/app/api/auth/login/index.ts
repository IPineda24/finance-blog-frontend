import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import Swal from "sweetalert2";
import setCookies from "./setToken";

const login = async (data:any) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/log-in`, data );
        Swal.fire({
        title: "Inicio de sesion con exito",
        icon: "success"
});
        setCookies(  response.data.access_token );

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