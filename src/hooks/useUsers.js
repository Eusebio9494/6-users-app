import { useEffect} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, remove, save, update } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser, form, loadingError, loadingUsers, onCloseeForm, onOpenForm, onUserForm, RemoveUser, UpdateUser } from '../store/slices/users/usersSlice';
import { useAuth } from '../Auth/hooks/useAuth';


const useUsers = () => {

    const {usersList, formUpdate, visibleForm, errors} = useSelector(state => state.users); //Extrae estados
    const dispatch = useDispatch() //Invoca acciones/funciones que actualizan estados
    const navigate = useNavigate();
    const {login, handlerLogout} = useAuth();

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
        try{
            const response = await findAll()
            console.log(response)
            dispatch(loadingUsers([...response.data]));
            console.log(usersList)
        } catch(error){
            if(error.response.status === 401){
                handlerLogout();
            }
        }
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
                dispatch(UpdateUser({...response.data}))
            } else {
                let response = await save(infoUser)
                dispatch(AddUser({...response.data}))
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
            dispatch(loadingError(error.response.data))
            console.log(errors)
        } else if(error.response && error.response.status === 500
            && errors.response.data?.message.includes('constraint')){
            
            if(errors.response.data?.message.includes('UK_username')){
                dispatch(loadingError({username: "El username ya existe"}))
            }
            if (errors.response.data?.message.includes('UK_email')){
                dispatch(loadingError({email: "El email ya existe"}))
            } 
        }else if(error.response.status === 401){
                handlerLogout();
                console.log("Hacer logout")
        }else {
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
        }).then(async(result) => {
            if (result.isConfirmed) {
                try{
                    await remove(id);
                    dispatch(RemoveUser(id))
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El usuario ha sido eliminado",
                        icon: "success"
                    });

                }catch(error){
                    if(error.response.status === 401){
                     handlerLogout();
                    }
                }
            }
        });
    }

    
    const handlerUserForm = (infoUserUpdate) => {
        dispatch(onUserForm({...infoUserUpdate}))  
    }

    // Abre el formulario cuando se selecciona un usuario para editar o se quiere crear uno nuevo
    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }
    // Cierra el formulario cuando se cancela la edición o se envía el formulario
    const handlerCloseeForm = () => {
        dispatch(onCloseeForm())
        dispatch(loadingError({}));
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