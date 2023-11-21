import getToken from "@/app/utils/toke";
import axios from "axios";
import baseUrl from "@/app/utils/baseUrl";

const session = async () => {
    try {
    const token = getToken();
    const user = await axios.get( `${baseUrl}/users/me`,
    {
        headers: {
        'accept': '*',
        'Authorization': `Bearer ${token}`,
        },
    }
        );
        if (await !token ) {
            return false;
        }else{
            return user.data;
        }
    } catch (error) {
        
    }


};
export default session;
