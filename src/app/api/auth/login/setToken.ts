
'use server'
import { cookies } from 'next/headers'
function setCookies( key: string) {
cookies().set( 'token',key );
}

export default setCookies;



