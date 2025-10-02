import axios from "axios";

const loginUrl = "http://localhost:8080/login"
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