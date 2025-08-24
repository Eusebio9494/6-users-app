import React, { useEffect, useState } from 'react';
import UsersList from './UsersList';
import Swal from 'sweetalert2';

const UserForm = ({ handlerUserForm, initialForm, userSelectedForm }) => {

    const [form, setFormState] = useState(initialForm);

    const { id, username, password, email } = form;

    useEffect(() => {
        console.log("Default Form: ", form);
        setFormState({
            ...userSelectedForm,
            password: ''
        });
    }, [userSelectedForm])

    const onInputChange = ({ target }) => {

        setFormState({ ...form, [target.name]: target.value }) //propiedad computada [target.name]
    }

    const onUserForm = (event) => {
        event.preventDefault();

        // Validación de username
        if (!username.trim()) {
            Swal.fire({
                        title: "Error con el nombre",
                        text: "El nombre no debe estar vacío",
                        icon: "error"
                    });
            return;
        }
        if (username.length < 3) {
            Swal.fire({
                title: "Error con el nombre",
                text: "El nombre debe tener al menos 3 caracteres",
                icon: "error"
            });
            return;
        }

        // Validación de password en caso de que sea un nuevo usuario y no tenga contraseña
        // Si el ID es 0, significa que es un nuevo usuario pero si no es así, se permite que el usuario mantenga su contraseña
        // Esto es para que no se valide cuando el usuario está editando su información
        if (!password && id === 0){

            // Validación de password
            if (password.length < 8) {
                Swal.fire({
                    title: "Error con la contraseña",
                    text: "La contraseña debe tener mínimo 8 caracteres",
                    icon: "error"
                });
                return;
            }
            // Ejemplo: al menos una mayúscula, una minúscula y un número
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
            if (!passwordRegex.test(password)) {
                Swal.fire({
                    title: "Error con la contraseña",
                    text: "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
                    icon: "error"
                });
                return;
            }
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            Swal.fire({
                title: "Error con el correo electrónico",
                text: "Ingrese un correo electrónico válido",
                icon: "error"
            });
            return;
        }

        // Calcula el siguiente ID para el usuario.
        // Si el ID del formulario es 0 (nuevo usuario), busca el mayor ID en la lista de usuarios almacenada en sessionStorage,
        // y le suma 1 para asignar un nuevo ID único. Si no hay usuarios, empieza desde 1.
        // Si el formulario ya tiene un ID distinto de 0, reutiliza ese ID.
        const nextId = form.id === 0
            ? Math.max(...(JSON.parse(sessionStorage.getItem("usersList")) || []).map(user => user.id), 0) + 1
            : form.id;

        // Muestra en consola el ID actual (el anterior al nuevo asignado)
        console.log("Actual ID:", nextId );

        // Muestra en consola el siguiente ID que se va a asignar
        console.log("Next ID:", nextId + 1);

        // Llama al manejador del formulario de usuario con los datos actualizados, incluyendo el nuevo ID
        handlerUserForm({ ...form, id: nextId });

        setFormState(initialForm)

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
                {id > 0 || <input
                    className='form-control my-3 w-75'
                    placeholder='Password'
                    type='password'
                    value={password}
                    name='password'
                    onChange={event => { onInputChange(event) }} />}
                <input
                    className='form-control my-3 w-75'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={onInputChange} />
                <button
                    className='btn btn-primary'
                    type='submit'>
                    {id>0 ? 'Actualizar': 'Crear'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;
