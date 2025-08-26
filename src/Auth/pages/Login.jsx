import React, { useState } from 'react';
import Swal from 'sweetalert2';

const initialForm = {
    username: '',
    password: ''
}
const Login = () => {

    const [loginForm, setLoginForm] = useState(initialForm);
    const {username, password} = loginForm;

    const onInputChange = ({target}) => {
        setLoginForm({
            ...loginForm,
            [target.name]: target.value
        });
    }

    const onLoginForm = (event) => {
        event.preventDefault();
        if(!username || !password) {
            Swal.fire('Error de validación', 'Username y password requeridos', 'error')
            return;
        }

        if(username === 'admin' && password === '12345'){

        } else {
            Swal.fire('Error de validación', 'Username y password incorrectos', 'error')
        }
        setLoginForm(initialForm);
    }

    return (
        <div className="modal" style={ {display: 'block'}} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>
                    <form className='w-100' onSubmit={event => onLoginForm(event)}>
                        <div className="modal-body">
                            <input className='form-control my-3 w-75'
                            placeholder='Username'
                            name='username'
                            value={username}
                            onChange={(event) => onInputChange(event)}>

                            </input>
                            <input className='form-control my-3 w-75'
                            placeholder='Password'
                            name='password'
                            type='password'
                            value= {password}
                            onChange= {onInputChange}>

                            </input>
                        </div>
                        <div className="modal-footer">
                            <button 
                            className="btn btn-primary"
                            type="submit">Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
