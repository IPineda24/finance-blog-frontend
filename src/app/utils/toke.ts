'use server'
   import { cookies } from 'next/headers'
const getToken = () => {
    const cookieStore = cookies()
    const token = cookieStore.get( 'token' );
    return token?.value;
};

export default getToken;