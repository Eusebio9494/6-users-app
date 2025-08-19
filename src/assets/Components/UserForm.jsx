import React, { useState } from 'react';
import UsersList from './UsersList';

const UserForm = ({handlerUserForm}) => {

    const [form, setFormState] = useState({
        username: "",
        password: "",
        email: ""
    });

    const { username, password, email } = form;

    const [counter, setCounter] = useState(2);

    const onInputChange = ({ target }) => {

        setFormState({ ...form, [target.name]: target.value }) //propiedad computada [target.name]
    }

    const onUserForm = (event) => {
        event.preventDefault();

        // Validación de username
        if (!username.trim()) {
            alert("El nombre no debe estar vacío");
            return;
        }
        if (username.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres");
            return;
        }

        // Validación de password
        if (password.length < 8) {
            alert('La contraseña debe tener mínimo 8 caracteres');
            return;
        }
        // Ejemplo: al menos una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe contener al menos una mayúscula, una minúscula y un número');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            alert('Ingrese un correo electrónico válido');
            return;
        }

        setCounter(counter+1)
        
        handlerUserForm({...form, id: counter});

        setFormState({
            username: "",
            password: "",
            email: ""
        })

    }

    return (
        <div>
            <h2 style={{ color: 'blue', fontSize: '15px', border: '1px solid black', padding: '8px' }}>Formulario de usuario</h2>

            <form className='w-50' onSubmit={event => onUserForm(event)}>
                <input
                    className='form-control my-3 w-75'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={event => { onInputChange(event) }} />
                <input
                    className='form-control my-3 w-75'
                    placeholder='Password'
                    type='password'
                    value={password}
                    name='password'
                    onChange={event => { onInputChange(event) }} />
                <input
                    className='form-control my-3 w-75'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={onInputChange} />
                <button
                    className='btn btn-primary'
                    type='submit'>
                    Crear
                </button>
            </form>
        </div>
    );
}

export default UserForm;
