import UsersList from './Components/UsersList';
import UserForm from './Components/UserForm';
import useUsers from './hooks/useUsers';

const UsersApp = () => {

  const {form, usersList, formUpdate, handlerUser, handlerDeleteUser, handlerUserForm} = useUsers();

  return (
    <div className='container my-4'>
      <h2 style={{ color: 'black', fontSize: '24px', border: '1px solid black', padding: '8px' }}>Users App</h2>
      <div className='row'>
        <div className='col'>
          <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} initialForm={form} userSelectedForm={formUpdate} />
        </div>
        <div className='col'>
          {usersList.length === 0
            ? <div className='alert alert-warning'>No hay usuarios en el sistema!</div>
            : <UsersList users={usersList} handlerDeleteUser={id => handlerDeleteUser(id)} handlerUpdateUser={infoUserUpdate => handlerUserForm(infoUserUpdate)} />}

        </div>
      </div>

    </div>
  );
}

export default UsersApp;
