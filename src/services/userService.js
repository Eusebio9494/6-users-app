import axios from "axios"

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
        const response = await axios.get("http://localhost:8080/users")
        return response;
    } catch (error) {
        console.log(error)
    }
    return null;
}