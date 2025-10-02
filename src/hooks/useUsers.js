import { useContext, useEffect, useReducer, useState } from 'react';
import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, remove, save, update } from '../services/userService';
import { AuthContext } from '../Auth/Context/AuthContext';

// const useListSession = JSON.parse(sessionStorage.getItem("usersList")) || [];
const useListSession = []
const form = {
    id: 0,
    username: "",
    password: "",
    email: ""
}
const initialErrors= {
    username: "",
    password: "",
    email: ""
}
const useUsers = () => {

    const [usersList, dispatch] = useReducer(usersReducer, useListSession)
    const [formUpdate, setFormUpdate] = useState(form)
    //* Controla la visibilidad del formulario
    const [visibleForm, setVisibleForm] = useState(false)
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const [errors, setErrors] = useState(initialErrors);

    /**
     * Obtiene la lista de usuarios de la API utilizando la función findAll,
     * imprime los datos recibidos en la consola y despacha una acción para
     * actualizar el estado con los usuarios cargados.
     *
     * @async
     * @function getUsers
     * @returns {Promise<void>} No retorna ningún valor, pero actualiza el estado global mediante dispatch.
     */
    const getUsers = async() => {
        const response = await findAll()
        console.log(response)
        dispatch((
            {
                type: 'loadingUsers',
                payload: response.data
            }
        ))
    }

    const handlerUser = async(infoUser) => {
        if(!login.isAdmin){
            return;
        }
        // Verifica si el usuario ya existe por ID
        try{

            const exists = usersList.some(user => user.id === infoUser.id);
            if (exists) {
                let response = await update(infoUser)
                dispatch({
                    type: 'UpdateUser',
                    payload: response.data,
                });
            } else {
                let response = await save(infoUser)
                dispatch({
                    type: 'AddUser',
                    payload: response.data
                });
            }
            
        Swal.fire({
            title: !exists ? "Usuario Creado" : `Usuario Actualizado`,
            text: !exists ? `El usuario ${infoUser.username} ha sido creado` : `El usuario ${infoUser.username} ha sido actualizado`,
            icon: "success"
        });
        handlerCloseeForm();
        navigate('/users')
        {console.log('%cUsuario guardado:', 'color: green; font-weight: bold;', infoUser.username)}
    }catch(error){
        if(error.response && error.response.status === 400){
            setErrors(error.response.data)
            console.log(errors)
        } else if(error.response && error.response.status === 500
            && errors.response.data?.message.includes('constraint')){
            
            if(errors.response.data?.message.includes('UK_username')){
                setErrors({username: "El username ya existe"})
            }
            if (errors.response.data?.message.includes('UK_email')){
                setErrors({email: "El email ya existe"})
            }

        } else {
            throw error;
        }
    }
        
    }
    
    //* Sincroniza el estado de la lista de usuarios con sessionStorage
    useEffect(() => {
        sessionStorage.setItem("usersList", JSON.stringify(usersList))
                console.log("Users: "+ usersList)

    }, [usersList])

    const handlerDeleteUser = async(id) => {
        if(!login.isAdmin){
            return;
        }
        console.log(id);
        

        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                dispatch(
                    {
                        type: 'RemoveUser',
                        payload: id
                    }
                )
                Swal.fire({
                    title: "Eliminado!",
                    text: "El usuario ha sido eliminado",
                    icon: "success"
                });
            }
        });
    }

    
    const handlerUserForm = (infoUserUpdate) => {
        setFormUpdate({ ...infoUserUpdate })
        setVisibleForm(true)   
    }

    // Abre el formulario cuando se selecciona un usuario para editar o se quiere crear uno nuevo
    const handlerOpenForm = () => {
        setVisibleForm(true)
        {console.log('%cBooleano para mostrar formulario:', 'color: pink; font-weight: bold;', visibleForm)}
    }
    // Cierra el formulario cuando se cancela la edición o se envía el formulario
    const handlerCloseeForm = () => {
        setVisibleForm(false)
        {console.log('%cBooleano para ocultar formulario:', 'color: pink; font-weight: bold;', visibleForm)}
        setFormUpdate(form)
        setErrors({});
    }
    return {
        form,
        usersList,
        formUpdate,
        visibleForm,
        errors,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm,
        handlerCloseeForm,
        handlerOpenForm,
        getUsers
    }
}

export default useUsers;