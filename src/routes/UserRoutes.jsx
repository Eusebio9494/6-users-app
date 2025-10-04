import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';
import UsersRegisterPages from '../pages/UsersRegisterPages';
import { UserProvider } from '../Context/UserProvider';
import { useContext } from 'react';
import { AuthContext } from '../Auth/Context/AuthContext';

const UserRoutes = () => {

    const {login} = useContext(AuthContext);

    return (
        <>
            <UserProvider>

                <Navbar />
                <Routes>

                    <Route path='users' element={<UsersPages/>} />
                    {!login.isAdmin || <>
                    <Route path='users/register' element={< UsersRegisterPages />} />
                    <Route path='users/edit/:id' element={< UsersRegisterPages />} />
                    </>}
                    <Route path='/' element={<Navigate to='/users' />} />

                </Routes>
            </UserProvider>
        </>
    );
}

export default UserRoutes;
