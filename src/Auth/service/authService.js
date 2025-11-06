import axios from "axios";

const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`
export const validateUser = async({username, password}) => {

    try{
        const response = await axios.post(loginUrl, {
            username,
            password,
        });
        return response
    }catch(error){
        throw error;
    }
}