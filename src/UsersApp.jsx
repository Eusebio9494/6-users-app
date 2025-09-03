import LoginPage from './Auth/pages/LoginPage';
import { useAuth } from './Auth/hooks/useAuth';
import UserRoutes from './routes/UserRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Auth/Context/AuthContext';


const UsersApp = () => {

  const {login} = useContext(AuthContext)

  return (

    <Routes>
      {!login.isAuth
        ?
        <>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={<Navigate to='/login' />} />
        
        </>

        : <>
          <Route path='/*' element={
            <UserRoutes/>
          } />

        </>
      }

    </Routes>
  );
}

export default UsersApp;
