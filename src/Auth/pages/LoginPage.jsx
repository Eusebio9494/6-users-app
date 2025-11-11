import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../css/modal.css'
import { useAuth } from '../hooks/useAuth';
import usePageLogin from '../hooks/usePageLogin';
const initialForm = {
    username: '',
    password: ''
}
const LoginPage = () => {

    const { handlerLogin, isLoginLoading } = useAuth();


    const [loginForm, setLoginForm] = useState(initialForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        setLoginForm({
            ...loginForm,
            [target.name]: target.value
        });
    }

    const onLoginForm = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validación', 'Username y password requeridos', 'error')
            return;
        }

        handlerLogin({ username, password })
        setLoginForm(initialForm);
    }

    // Establece el título de la página utilizando el hook personalizado
    usePageLogin();

    return (
        <div className="modal modal-modal" tabIndex="-1">
            <div className="modal-dialog dialog">
                <div className="modal-content content">
                    <div className="modal-header header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>
                    <form className='w-100 form' onSubmit={event => onLoginForm(event)}>
                        <div className="modal-body">
                            <input className='form-control form-input my-3 w-75'
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={(event) => onInputChange(event)}>

                            </input>
                            <input className='form-control form-input my-3 w-75'
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={onInputChange}>

                            </input>
                            <small className='form-text'>Tu contraseña debe de contener entre 4 y 8 caracteres de largo,
                                no debe de contener caracteres especiales ni espacios
                            </small>
                        </div>
                        {isLoginLoading && (

                            <div className="modal-footer pie">
                            <button className="btn btn-primary" type="button" disabled={true}>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status"> Loading...</span>
                            </button>
                            </div>
                        ) || <div className="modal-footer pie">
                                <button
                                    className="btn btn-primary button"
                                    type="submit">Login
                                </button>
                            </div>}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
