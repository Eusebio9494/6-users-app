import { useContext, useEffect, useState } from 'react';
import UserForm from '../Components/UserForm';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const UsersRegisterPages = () => {

  const { usersList = [], form } = useContext(UserContext)

  const [userSelectedForm, setUserSelectedForm] = useState(form);

  const {id} = useParams();

  useEffect(() => {
    console.log(id)
    const user = usersList.find(u => u.id == id) || form
    setUserSelectedForm(user);
  }, [id])
  
  return (

      <div className='container my-4'>
        <h4>
          {userSelectedForm.id>0 ? 'Editar Usuario': 'Registrar Usuario'}
        </h4>
        <div className='row'>
          <div className='col'>
            <UserForm userSelectedForm={userSelectedForm} />
          </div>
        </div>
      </div>
  );
}

export default UsersRegisterPages;
