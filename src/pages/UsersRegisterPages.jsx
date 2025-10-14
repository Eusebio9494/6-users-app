import { useContext, useEffect, useState } from 'react';
import UserForm from '../Components/UserForm';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import useUsers from '../hooks/useUsers';


const UsersRegisterPages = () => {

  const { usersList = [], form } = useUsers()

  const [userSelectedForm, setUserSelectedForm] = useState(form);

  const {id} = useParams();

    /**
   * useEffect hook que se ejecuta cada vez que cambia el parámetro 'id' de la URL.
   * 
   * - Busca en la lista de usuarios (`usersList`) el usuario cuyo `id` coincide con el parámetro `id`.
   * - Si encuentra el usuario, actualiza el estado `userSelectedForm` con los datos de ese usuario.
   * - Si no lo encuentra, utiliza el formulario por defecto (`form`).
   * - Esto permite que el formulario muestre los datos del usuario a editar o un formulario vacío para registrar uno nuevo.
   */
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
