'use server'
import { cookies } from 'next/headers'
const closeSession = () => {

    cookies().delete('token');
};

export default closeSession;