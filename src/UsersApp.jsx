import UsersList from './Components/UsersList';
import UserForm from './Components/UserForm';
import useUsers from './hooks/useUsers';

const UsersApp = () => {

  // Custom hook para manejar la lógica de estado de los usuarios
  const { form, usersList, formUpdate, visibleForm, handlerUser, handlerDeleteUser, handlerUserForm, handlerCloseeForm, handlerOpenForm } = useUsers();

  return (

    <>
      {!visibleForm || <div className='col'>
        <div className="abrir-modal animacion fadeIn">
          <div className="modal" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{formUpdate.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios</h5>
                </div>
                <div className="modal-body">
                  <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} initialForm={form} userSelectedForm={formUpdate} handlerCloseeForm={handlerCloseeForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}

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

export default UsersApp;
