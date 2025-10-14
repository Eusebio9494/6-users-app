import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';
import UsersRegisterPages from '../pages/UsersRegisterPages';
import { useAuth } from '../Auth/hooks/useAuth';

const UserRoutes = () => {

    const {login} = useAuth();

    return (
        <>

                <Navbar />
                <Routes>

                    <Route path='users' element={<UsersPages/>} />
                    {!login.isAdmin || <>
                    <Route path='users/register' element={< UsersRegisterPages />} />
                    <Route path='users/edit/:id' element={< UsersRegisterPages />} />
                    </>}
                    <Route path='/' element={<Navigate to='/users' />} />

                </Routes>
        </>
    );
}

export default UserRoutes;
