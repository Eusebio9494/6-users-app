import { useEffect} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, findAllPage, remove, save, update } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser, form, loadingError, loadingUsers, onCloseeForm, onOpenForm, onUserForm, RemoveUser, UpdateUser
    , setPageSize
 } from '../store/slices/users/usersSlice';
import { useAuth } from '../Auth/hooks/useAuth';


const useUsers = () => {

    const {usersList, formUpdate, visibleForm, errors, isLoading, page, sizePage} = useSelector(state => state.users); //Extrae estados
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
    const getUsers = async(pageNumber = 0, sizePage) => {
        try{
            console.log("pageNumber, sizePage", pageNumber, sizePage)
            const response = await findAllPage(pageNumber, sizePage)
            dispatch(loadingUsers(response.data));
            return response;
        } catch(error){
            console.error(error)
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
                // obtener información actualizada de paginación desde el backend
                const resp = await getUsers(0, sizePage); // primera llamada para obtener totalPages actualizado
                const lastPage = Math.max(0, (resp.data.totalPages || 1) - 1);
                // await getUsers(lastPage, sizePage); // cargar la última página donde estará el nuevo elemento
                navigate(`/users/page/${lastPage}`);
            }
            
        Swal.fire({
            title: !exists ? "Usuario Creado" : `Usuario Actualizado`,
            text: !exists ? `El usuario ${infoUser.username} ha sido creado` : `El usuario ${infoUser.username} ha sido actualizado`,
            icon: "success"
        });
        handlerCloseeForm();
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
                    // ahora preguntar al backend cómo quedó la página actual
                    const resp = await getUsers(page.number);
                    // si la página actual quedó vacía y no es la 0, retroceder a la anterior
                    const contentLength = (resp?.data?.content?.length) ?? 0;
                    const currentNumber = (resp?.data?.number) ?? page.number;
                    if (contentLength === 0 && currentNumber > 0) {
                        const newPage = currentNumber - 1;
                        await getUsers(newPage);
                        navigate(`/users/page/${newPage}`);
                    } else {
                        // quedarse en la misma página
                        navigate(`/users/page/${currentNumber}`);
                    }
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

    // Ajusta el tamaño de la página y recarga los usuarios
    const settingPageSize = (pageSize) => {
        dispatch(setPageSize(Number(pageSize)))
        navigate(`/users/page/0?sizePage=${pageSize}`);
    }
    
    return {
        form,
        usersList,
        formUpdate,
        visibleForm,
        errors,
        isLoading,
        page,
        sizePage,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm,
        handlerCloseeForm,
        handlerOpenForm,
        getUsers,
        settingPageSize
    }
}

export default useUsers;