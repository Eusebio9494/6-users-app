import UsersRow from "./UsersRow";


const UsersList = ({handlerDeleteUser, handlerUpdateUser, users = [] }) => {
    return (
        <div>

            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>update</th>
                        <th>update route</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ id, username, email }) => (
                            <UsersRow
                                key={ id }
                                id={ id }
                                username={ username }
                                email={ email } 
                                handlerDeleteUser={id => handlerDeleteUser(id)}
                                handlerUpdateUser={infoUser => handlerUpdateUser(infoUser)}
                                />
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
}

export default UsersList;
