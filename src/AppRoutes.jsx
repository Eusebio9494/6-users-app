import LoginPage from './Auth/pages/LoginPage';
import UserRoutes from './routes/UserRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './Auth/hooks/useAuth';

const AppRoutes = () => {
 
      const {login} = useAuth()

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
  )
}

export default AppRoutes;
