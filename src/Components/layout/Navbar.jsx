import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Auth/hooks/useAuth';
import '../../css/Navbar.css'

const Navbar = () => {

    const { login, handlerLogout } = useAuth();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-background">
                <div className="container-fluid nab">
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
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                id="opciones"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span>Opciones</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-button">
                                <li><NavLink className="dropdown-item" to='/users'>Users</NavLink></li>
                                <li><NavLink className="dropdown-item" to='/users/register'>Registrar Usuario</NavLink></li>
                                <li><button className="dropdown-item" type="button" onClick={handlerLogout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
