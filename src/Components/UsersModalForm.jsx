import React from 'react';
import UserForm from './UserForm';

const UsersModalForm = ( {handlerUser, form, formUpdate, handlerCloseeForm}) => {
    
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
                  <UserForm handlerUserForm={infoUser => handlerUser(infoUser)} initialForm={form} userSelectedForm={formUpdate} handlerCloseeForm={handlerCloseeForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UsersModalForm;
