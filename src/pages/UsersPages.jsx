import { useEffect } from 'react';
import UsersList from '../Components/UsersList';
import UsersModalForm from '../Components/UsersModalForm';
import useUsers from '../hooks/useUsers';
import { useAuth } from '../Auth/hooks/useAuth';
import { useParams } from 'react-router-dom';
import Paginator from '../Components/Paginator';

export const UsersPages = () => {


  const { page } = useParams()

  const {
    usersList,
    visibleForm,
    handlerOpenForm,
    getUsers,
    isLoading,
    page: pagination
  } = useUsers();

  const { login } = useAuth()
  /**
   * Carga inicial de la lista de usuarios desde el backend mediante el contexto y la disposición del hook useUsers con la función 
   * getUsers que llama a la api rest de usuarios
   */
  useEffect(() => {
    getUsers(page);
  }, [, page])

  if (isLoading) {
    return (
      <>
        <div className='container my-4'>
          <div className='text-center'>
            <div className="spinner-border text-primary" style={{ width: 50, height: 50 }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (

    <>


      {visibleForm &&
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
            {(visibleForm || !login.isAdmin) || <button className='btn btn-primary'
              onClick={handlerOpenForm}
            >Agregar Usuario</button>
            }
            {console.log('%cBooleano para no mostrar boton Agregar Usuario:', 'color: green; font-weight: bold;', visibleForm)}


            { usersList.length === 0
              ? <div className='alert alert-warning'>No hay usuarios en el sistema!</div>
              :
              <div>
                <UsersList users={usersList} />
                <Paginator url="/users/page" page={pagination}/>
              </div>
            }

          </div>

        </div>
      </div>
    </>
  );
}
