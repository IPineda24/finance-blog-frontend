
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";

const register = async ( data: any ) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/register`, data );
        console.log( "Cuenta creada con exito" );
        const origin = window.location.origin;
        const loginUrl = `${origin}/auth/login`;
        window.location.href = loginUrl;
        
    } catch (error) {
    console.log(error);
    }
}; 
export default register;