import useUsers from "../hooks/useUsers";
import { UserContext } from "./UserContext"

/**
 * Proveedor del contexto de usuario.
 * 
 * Este componente envuelve a sus hijos con el contexto de usuario, proporcionando
 * acceso a los estados y funciones relacionados con la gestión de usuarios.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos que serán envueltos por el proveedor de contexto,
 * permitiendo que accedan a los valores y funciones del contexto de usuario.
 * 
 * @returns {JSX.Element} Proveedor de contexto que envuelve a los componentes hijos.
 */
export const UserProvider = ({ children }) => {

    // Custom hook para manejar la lógica de estado de los usuarios
    const { form,
        usersList,
        formUpdate,
        visibleForm,
        errors,
        handlerUser,
        handlerDeleteUser,
        handlerUserForm,
        handlerCloseeForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    return (
        <UserContext.Provider value={
            {
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
                getUsers,
            }
        }>
            {children}

        </UserContext.Provider>

    )
}