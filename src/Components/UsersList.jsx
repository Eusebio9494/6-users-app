import UsersRow from "./UsersRow";
import { useAuth } from "../Auth/hooks/useAuth";


const UsersList = ({ users = [] }) => {

    const { login } = useAuth();

    return (
        <div className="table-responsive-container">

            <table className='table table-hover table-striped table-sm table-bordered my-4 table-container'>
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
