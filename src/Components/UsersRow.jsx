import React from 'react';

const UsersRow = ({ id, username, email, handlerDeleteUser, handlerUpdateUser, password }) => {

    const onDeleteId = (id) => {
        handlerDeleteUser(id)
    }
    return (
            <tr>
                <td><p style={{fontWeight: 'inherit', color: 'blue', fontSize: '1em'}}>{id}</p></td>
                <td><p style={{fontWeight: 'bold', color: 'blue', fontSize: '1em'}}>{username}</p></td>
                <td><p style={{fontWeight: 'bold', color: 'blue', fontSize: '1em'}}>{email}</p></td>
                <td>
                    <button type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handlerUpdateUser({id, username, email, password})}>
                        Update
                    </button>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteId(id)}>
                        Remove
                    </button>
                </td>
            </tr>
    );
}

export default UsersRow;
