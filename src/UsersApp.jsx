import LoginPage from './Auth/pages/LoginPage';
import { useAuth } from './Auth/hooks/useAuth';
import UserRoutes from './routes/UserRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';


const UsersApp = () => {

  const { login, handlerLogin, handlerLogout } = useAuth();

  return (

    <Routes>
      {!login.isAuth
        ?
        <>
          <Route path='/login' element={<LoginPage handlerLogin={formLogin => handlerLogin(formLogin)} />} />
          <Route path='/*' element={<Navigate to='/login' />} />
        
        </>

        : <>
          <Route path='/*' element={
            <UserRoutes
              login={login}
              handlerLogout={handlerLogout} />
          } />

        </>
      }

    </Routes>
  );
}

export default UsersApp;
