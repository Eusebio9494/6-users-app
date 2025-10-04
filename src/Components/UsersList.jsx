import { useContext } from "react";
import UsersRow from "./UsersRow";
import { AuthContext } from "../Auth/Context/AuthContext";


const UsersList = ({ users = [] }) => {

    const { login } = useContext(AuthContext);

    return (
        <div>

            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        {!login.isAdmin ||
                            <>
                                <th>update</th>
                                <th>update route</th>
                                <th>remove</th>
                            </>
                        }
                        <th>rol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ id, username, email, admin }) => (
                            <UsersRow
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                                admin={admin}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
}

export default UsersList;
