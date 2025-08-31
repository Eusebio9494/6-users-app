import React, { useState } from 'react';
import UserForm from '../Components/UserForm';

const UsersRegisterPages = ({ handlerUser, initialForm }) => {

  const [userSelectedForm, setUserSelectedForm] = useState(initialForm);

  
  return (

      <div className='container my-4'>
        <h4>
          Registro de usuarios
        </h4>
        <div className='row'>
          <div className='col'>
            <UserForm handlerUserForm={handlerUser} initialForm={initialForm} userSelectedForm={userSelectedForm} />
          </div>
        </div>
      </div>
  );
}

export default UsersRegisterPages;
