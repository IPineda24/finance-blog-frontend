'use server'
import { cookies } from 'next/headers'
const session = async () => {
const cookieStore = cookies()
    const token = cookieStore.get( 'token' );
    if ( !token ) {
            return false;
        }else{
            return true;
        }

};
export default session;