import UsersList from '../Components/UsersList';
import useUsers from '../hooks/useUsers';
import UsersModalForm from '../Components/UsersModalForm';

export const UsersPages = () => {

  // Custom hook para manejar la lógica de estado de los usuarios
  const { form, usersList, formUpdate, visibleForm, handlerUser, handlerDeleteUser, handlerUserForm, handlerCloseeForm, handlerOpenForm } = useUsers();

  return (

    <>
      {!visibleForm || 
      <UsersModalForm handlerUser={handlerUser} form={form} formUpdate={formUpdate} handlerCloseeForm={handlerCloseeForm}/>
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
            {console.log(visibleForm)}

            {usersList.length === 0
              ? <div className='alert alert-warning'>No hay usuarios en el sistema!</div>
              : <UsersList users={usersList} handlerDeleteUser={id => handlerDeleteUser(id)} handlerUpdateUser={infoUserUpdate => handlerUserForm(infoUserUpdate)} />}

          </div>

        </div>
      </div>
    </>
  );
}
