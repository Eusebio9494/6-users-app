import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Auth/hooks/useAuth';

const Navbar = () => {

    const { login, handlerLogout } = useAuth();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Users App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavUser">
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/users' >
                                    Usuarios
                                </NavLink>
                            </li>
                            {!login.isAdmin ||
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/users/register'>
                                        Registrar Usuario
                                    </NavLink>
                                </li>
                            }
                        </ul>

                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                        <span className='nav-item nav-link text-primary mx-3'>
                            {login.user?.username}
                        </span>
                        <button
                            className='btn btn-outline-success'
                            onClick={handlerLogout}>
                            Logout
                        </button>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
