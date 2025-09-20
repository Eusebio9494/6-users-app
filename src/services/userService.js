import axios from "axios"


const BASE_URL = "http://localhost:8080/users"
/**
 * Obtiene todos los usuarios desde el servidor.
 * Realiza una petición GET a la URL especificada y retorna la respuesta.
 * 
 * @async
 * @function
 * @returns {Promise<Object|null>} Retorna la respuesta de la petición si es exitosa, o null si ocurre un error.
 */
export const findAll = async () => {
    try {
        // Realiza una petición HTTP GET al servidor local en el endpoint '/users'.
        // Axios gestiona la solicitud y devuelve una promesa que contiene la respuesta del servidor.
        const response = await axios.get(BASE_URL)
        return response;
    } catch (error) {
        console.error(error)
    }
    return null;
}

export const save = async ({username, email, password}) => {
    try{
        return await axios.post(BASE_URL, {
            username,
            email,
            password
        })
    }catch(error){
        throw error;
    }
}

export const update = async ({id, username, email}) => {
    try{
        return await axios.put(`${BASE_URL}/${id}?`,
            {
                username,
                email,
            }
        )

    }catch(error){
        throw error;
    }
};

export const remove = (id) => {
    try{
        axios.delete(`${BASE_URL}/${id}`)
    }catch(error){
        console.error(error)
    }
}