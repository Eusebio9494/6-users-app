import axios from "axios"
import { usersApi } from "../apis/usersApis";

const BASE_URL = ''

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
        const response = await usersApi.get()
        return response;
    } catch (error) {
        console.error(error)
    }
    return null;
}

export const save = async ({ username, email, password, admin }) => {
    try {
        return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        })
    } catch (error) {
        throw error;
    }
}

export const update = async ({ id, username, email, admin }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}?`,
            {
                username,
                email,
                admin,
            }
        )

    } catch (error) {
        throw error;
    }
};

export const remove = async(id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}