// Objetivo: login de usuario
'use server'
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";
import { cookies } from 'next/headers'

const login = async (data:any) => {
    try {
        const response = await axios.post( `${baseUrl}/auth/log-in`, data );


        console.log( "se inicio sesion" );
        console.log(response.data);
        console.log(response.data.access_token);
        cookies().set( 'token', response.data.access_token );

        
    } catch (error) {
    console.log(error);
    }
};
export default login;