import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';
import  useUsers  from '../hooks/useUsers'
import UsersRegisterPages from '../pages/UsersRegisterPages';

const UserRoutes = ({ login, handlerLogout }) => {

    // Custom hook para manejar la lógica de estado de los usuarios
  const { form, usersList, formUpdate, visibleForm, handlerUser, handlerDeleteUser, handlerUserForm, handlerCloseeForm, handlerOpenForm } = useUsers();
    return (
        <>
            <Navbar login={login} handlerLogout={handlerLogout} />
            <Routes>

                <Route path='users' element={<UsersPages 
                form={form}
                usersList={usersList}
                formUpdate={formUpdate}
                visibleForm={visibleForm}
                handlerUser={handlerUser}
                handlerDeleteUser={handlerDeleteUser}
                handlerUserForm={handlerUserForm}
                handlerCloseeForm={handlerCloseeForm}
                handlerOpenForm={handlerOpenForm}/>} />
                <Route path='users/register' element={ < UsersRegisterPages handlerUser={handlerUser} initialForm={form}/>} />
                <Route path='/' element={<Navigate to='/users' />} />

            </Routes>
        </>
    );
}

export default UserRoutes;
