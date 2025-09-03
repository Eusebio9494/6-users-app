import useUsers from "../hooks/useUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

    // Custom hook para manejar la lógica de estado de los usuarios
    const { form,
        usersList,
        formUpdate,
        visibleForm,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm,
        handlerCloseeForm,
        handlerOpenForm,
    } = useUsers();

    return (
        <UserContext.Provider value={
            {
                form,
                usersList,
                formUpdate,
                visibleForm,
                handlerUser,
                handlerDeleteUser,
                handlerUserForm,
                handlerCloseeForm,
                handlerOpenForm,
            }
        }>
            {children}

        </UserContext.Provider>

    )
}