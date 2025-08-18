import React from 'react';
import UsersList from './assets/Components/UsersList';
import UserForm from './assets/Components/UserForm';

const UsersApp = () => {

    const initialUsers = [
        {
            id: 1,
            name: "Jhon Doe",
            email: "jhon@hotmail.com",
            password: "sasa1234"
        }
    ]
  return (
    <div className='container my-4'>
        <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px'}}>Users App</h2>
        <div className='row'>
          <div className='col'>
            <UserForm />
          </div>
          <div className='col'>
            <UsersList users={initialUsers}/>
          </div>
        </div>

    </div>
  );
}

export default UsersApp;
