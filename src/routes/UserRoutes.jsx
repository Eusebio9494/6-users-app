import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';
import useUsers from '../hooks/useUsers'
import UsersRegisterPages from '../pages/UsersRegisterPages';
import { UserProvider } from '../Context/UserProvider';

const UserRoutes = ({ login, handlerLogout }) => {


    return (
        <>
            <UserProvider>

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
                        handlerOpenForm={handlerOpenForm} />} />
                    <Route path='users/register' element={< UsersRegisterPages handlerUser={handlerUser} initialForm={form} />} />
                    <Route path='users/edit/:id' element={< UsersRegisterPages usersList={usersList} handlerUser={handlerUser} initialForm={form} />} />
                    <Route path='/' element={<Navigate to='/users' />} />

                </Routes>
            </UserProvider>
        </>
    );
}

export default UserRoutes;
