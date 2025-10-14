import { useContext } from 'react';
import UserForm from './UserForm';
import useUsers from '../hooks/useUsers';

const UsersModalForm = () => {

  const { formUpdate, handlerCloseeForm } = useUsers();

  return (
    <div className='col'>
      <div className="abrir-modal animacion fadeIn">
        <div className="modal" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{formUpdate.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios</h5>
              </div>
              <div className="modal-body">
                <UserForm userSelectedForm={formUpdate}
                  handlerCloseeForm={handlerCloseeForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersModalForm;
