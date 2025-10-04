import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { AuthContext } from '../Auth/Context/AuthContext';

const UsersRow = ({ id, username, email, admin }) => {

    const { handlerDeleteUser, handlerUserForm } = useContext(UserContext);
    const { login } = useContext(AuthContext);

    const onDeleteId = (id) => {
        handlerDeleteUser(id)
    }
    return (
        <tr>
            <td><p style={{ fontWeight: 'inherit', color: 'blue', fontSize: '1em' }}>{id}</p></td>
            <td><p style={{ fontWeight: 'bold', color: 'blue', fontSize: '1em' }}>{username}</p></td>
            <td><p style={{ fontWeight: 'bold', color: 'blue', fontSize: '1em' }}>{email}</p></td>
            {!login.isAdmin ||
                <>


                    <td>
                        <button type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerUserForm({ id, username, email, admin })}>
                            Update
                        </button>
                    </td>
                    <td>
                        <NavLink className="btn btn-secondary btn-sm"
                            to={'/users/edit/' + id}>
                            update route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => onDeleteId(id)}>
                            Remove
                        </button>
                    </td>
                </>}
                <td><p style={{ fontWeight: 'bold', color: 'blue', fontSize: '1em' }}>{admin?"Administrador":"Usuario"}</p></td>
        </tr>
    );
}

export default UsersRow;
