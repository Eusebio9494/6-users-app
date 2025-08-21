import { useEffect, useReducer, useState } from 'react';
import { usersReducer } from '../reducers/usersReducer';

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
    }

    useEffect(() => {
        sessionStorage.setItem("usersList", JSON.stringify(usersList))
    }, [usersList])

    const handlerDeleteUser = (id) => {
        console.log(id)
        dispatch(
            {
                type: 'RemoveUser',
                payload: id
            }
        )
    }

    const handlerUserForm = (infoUserUpdate) => {
        setFormUpdate({ ...infoUserUpdate })
    }
    return {
        form,
        usersList,
        formUpdate,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm
    }
}

export default useUsers;
