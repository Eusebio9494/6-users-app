import React, { useEffect, useReducer, useState } from 'react';
import UsersList from './Components/UsersList';
import UserForm from './Components/UserForm';
import { usersReducer } from './reducers/usersReducer';

const useListSession = JSON.parse(sessionStorage.getItem("usersList")) || [];
const form = {
  id: 0,
  username: "",
  password: "",
  email: ""
}
const UsersApp = () => {

  const [usersList, dispatch] = useReducer(usersReducer, useListSession)
  const [formUpdate, setFormUpdate] = useState(form)

  const handlerUser = (infoUser) => {
    // Verifica si el usuario ya existe por ID
    const exists = usersList.some(user => user.id === infoUser.id);
    if (exists) {
      dispatch({
        type: 'UpdateUser',
        payload: infoUser
      });
    } else {
      dispatch({
        type: 'AddUser',
        payload: infoUser
      });
    }
  }

  useEffect(() => {
    sessionStorage.setItem("usersList", JSON.stringify(usersList))
  }, [usersList])

  const handlerDeleteUser = (id) => {
    console.log(id)
    dispatch(
      {
        type: 'RemoveUser',
        payload: id
      }
    )
  }

  const handlerUserForm = (infoUserUpdate) => {
    setFormUpdate({ ...infoUserUpdate })
  }


  return (
    <div className='container my-4'>
      <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px' }}>Users App</h2>
      <div className='row'>
        <div className='col'>
          <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} initialForm={form} userSelectedForm={formUpdate} />
        </div>
        <div className='col'>
          {usersList.length === 0
            ? <div className='alert alert-warning'>No hay usuarios en el sistema!</div>
            : <UsersList users={usersList} handlerDeleteUser={id => handlerDeleteUser(id)} handlerUpdateUser={infoUserUpdate => handlerUserForm(infoUserUpdate)} />}

        </div>
      </div>

    </div>
  );
}

export default UsersApp;
