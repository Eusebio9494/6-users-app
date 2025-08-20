import React, { useEffect, useReducer } from 'react';
import UsersList from './Components/UsersList';
import UserForm from './Components/UserForm';
import { usersReducer } from './reducers/usersReducer';

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

  const handlerDeleteUser= (id) => {
    console.log(id)
    dispatch(
      {
        type: 'RemoveUser',
        payload: id
      }
    )
  }

  const nextId = Math.max(...usersList.map(user => user.id), 0) + 1;
  console.log("Actual Lenght:", nextId - 1)
  console.log("Next ID:", nextId)

  return (
    <div className='container my-4'>
      <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px' }}>Users App</h2>
      <div className='row'>
        <div className='col'>
          <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} counterId={nextId} />
        </div>
        <div className='col'>
          <UsersList users={usersList} handlerDeleteUser={id => handlerDeleteUser(id)}/>
        </div>
      </div>

    </div>
  );
}

export default UsersApp;
