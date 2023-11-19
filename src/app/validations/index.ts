import getToken from "@/app/utils/toke";

const session = async () => {
    const token =  getToken();

    if (await !token ) {
            return false;
        }else{
            return true;
        }

};
export default session;
