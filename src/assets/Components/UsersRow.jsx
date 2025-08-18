import React from 'react';

const UsersRow = ({ id, username, email }) => {
    return (
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                    <button type="button"
                        className="btn btn-secondary btn-sm">
                        Update
                    </button>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm">
                        Remove
                    </button>
                </td>
            </tr>
    );
}

export default UsersRow;
