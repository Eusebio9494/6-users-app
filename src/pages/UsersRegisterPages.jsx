import React, { useEffect, useState } from 'react';
import UserForm from '../Components/UserForm';
import { useParams } from 'react-router-dom';

const UsersRegisterPages = ({ usersList = [], handlerUser, initialForm }) => {

  const [userSelectedForm, setUserSelectedForm] = useState(initialForm);

  const {id} = useParams();

  useEffect(() => {
    console.log(id)
    const user = usersList.find(u => u.id == id) || initialForm
    setUserSelectedForm(user);
  }, [id])
  
  return (

      <div className='container my-4'>
        <h4>
          {userSelectedForm.id>0 ? 'Editar Usuario': 'Registrar Usuario'}
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
