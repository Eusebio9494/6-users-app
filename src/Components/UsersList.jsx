import UsersRow from "./UsersRow";


const UsersList = ({ users = [] }) => {
    return (
        <div>
            <h2 style={{ color: 'blue', fontSize: '15px', border: '1px solid black', padding: '8px' }}>Lista de usuarios</h2>

            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>update</th>
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
                                email={ email } />
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
}

export default UsersList;
