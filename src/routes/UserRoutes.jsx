import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UsersPages';
import Navbar from '../Components/layout/Navbar';
import UsersRegisterPages from '../pages/UsersRegisterPages';
import { UserProvider } from '../Context/UserProvider';

const UserRoutes = ({ login, handlerLogout }) => {


    return (
        <>
            <UserProvider>

                <Navbar login={login} handlerLogout={handlerLogout} />
                <Routes>

                    <Route path='users' element={<UsersPages/>} />
                    <Route path='users/register' element={< UsersRegisterPages />} />
                    <Route path='users/edit/:id' element={< UsersRegisterPages />} />
                    <Route path='/' element={<Navigate to='/users' />} />

                </Routes>
            </UserProvider>
        </>
    );
}

export default UserRoutes;
