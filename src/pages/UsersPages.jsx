import { useContext, useEffect } from 'react';
import UsersList from '../Components/UsersList';
import UsersModalForm from '../Components/UsersModalForm';
import { UserContext } from '../Context/UserContext';

export const UsersPages = () => {

  const {
    usersList,
    visibleForm,
    handlerOpenForm,
    getUsers
  } = useContext(UserContext);

  /**
   * Carga inicial de la lista de usuarios desde el backend mediante el contexto y la disposición del hook useUsers con la función 
   * getUsers que llama a la api rest de usuarios
   */
  useEffect(() => {
    getUsers();
  }, [])

  return (

    <>

      {!visibleForm ||
        <UsersModalForm />
      }

      <div className='container my-4'>
        <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px' }}>Users App</h2>
        {/* {!visibleForm ||<div className='col'>
          
            <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} initialForm={form} userSelectedForm={formUpdate} handlerCloseeForm={handlerCloseeForm}/>
         </div> }
         */}
        <div className='row'>
          <div className='col'>
            <h2 style={{ color: 'blue', fontSize: '15px', border: '1px solid black', padding: '8px' }}>Lista de usuarios</h2>
            {visibleForm || <button className='btn btn-primary'
              onClick={handlerOpenForm}
            >Agregar Usuario</button>
            }
            {console.log('%cBooleano para no mostrar boton Agregar Usuario:', 'color: green; font-weight: bold;', visibleForm)}


            {usersList.length === 0
              ? <div className='alert alert-warning'>No hay usuarios en el sistema!</div>
              : <UsersList users={usersList} />}

          </div>

        </div>
      </div>
    </>
  );
}
