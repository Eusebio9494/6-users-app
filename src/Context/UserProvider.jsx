import { UsersContext } from "./UserContext"

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
        <UsersContext.Provider value={
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

        </UsersContext.Provider>

    )
}