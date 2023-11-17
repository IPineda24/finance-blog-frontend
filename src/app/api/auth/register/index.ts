import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";

const register = async (data:any) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/register`, data );
        console.log("Cuenta creada con exito");
    } catch (error) {
    console.log(error);
    }
};


export default register;