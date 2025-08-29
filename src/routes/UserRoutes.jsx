import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';

const UserRoutes = ({ login, handlerLogout }) => {
    return (
        <>
            <Navbar login={login} handlerLogout={handlerLogout} />
            <Routes>

                <Route path='users' element={<UsersPages />} />
                <Route path='/' element={<Navigate to='/users' />} />

            </Routes>
        </>
    );
}

export default UserRoutes;
