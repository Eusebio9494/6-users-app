import { useEffect, useReducer, useState } from 'react';
import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useListSession = JSON.parse(sessionStorage.getItem("usersList")) || [];
const form = {
    id: 0,
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

    const handlerUser = (infoUser) => {
        // Verifica si el usuario ya existe por ID
        const exists = usersList.some(user => user.id === infoUser.id);

        if (exists) {
            dispatch({
                type: 'UpdateUser',
                payload: infoUser
            });
        } else {

            dispatch({
                type: 'AddUser',
                payload: infoUser
            });
        }

        Swal.fire({
            title: !exists ? "Usuario Creado" : `Usuario Actualizado`,
            text: !exists ? `El usuario ${infoUser.username} ha sido creado` : `El usuario ${infoUser.username} ha sido actualizado`,
            icon: "success"
        });
        handlerCloseeForm();
        navigate('/users')

    }
    
    //* Sincroniza el estado de la lista de usuarios con sessionStorage
    useEffect(() => {
        sessionStorage.setItem("usersList", JSON.stringify(usersList))
                console.log("Users: "+ usersList)

    }, [usersList])

    const handlerDeleteUser = (id) => {
        console.log(id)

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
    }
    // Cierra el formulario cuando se cancela la edición o se envía el formulario
    const handlerCloseeForm = () => {
        setVisibleForm(false)
        setFormUpdate(form)
    }
    return {
        form,
        usersList,
        formUpdate,
        visibleForm,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm,
        handlerCloseeForm,
        handlerOpenForm
    }
}

export default useUsers;