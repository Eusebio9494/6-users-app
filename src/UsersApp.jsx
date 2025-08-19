import React, { useEffect, useReducer, useState } from 'react';
import UsersList from './assets/Components/UsersList';
import UserForm from './assets/Components/UserForm';
import { usersReducer } from './assets/Components/reducers/usersReducer';

// const initialUsers = [
//   {
//     id: 1,
//     username: "Jhon Doe",
//     email: "jhon_doe@doe.com",
//     password: "Sasa1267"
//   }
  
// ]
const useListSession = JSON.parse(sessionStorage.getItem("usersList")) || [];
const UsersApp = () => {

  const [usersList, dispatch] = useReducer(usersReducer, useListSession)

  const handlerUser = (infoUser) => {

    dispatch(
      {
        type: 'AddUser',
        payload: infoUser
      }
    )
  }

  useEffect(() => {
    sessionStorage.setItem("usersList", JSON.stringify(usersList))
  }, [usersList])

  return (
    <div className='container my-4'>
      <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px' }}>Users App</h2>
      <div className='row'>
        <div className='col'>
          <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} />
        </div>
        <div className='col'>
          <UsersList users={usersList} />
        </div>
      </div>

    </div>
  );
}

export default UsersApp;
