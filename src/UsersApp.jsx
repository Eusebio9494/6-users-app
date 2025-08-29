import Login from './Auth/pages/Login';
import { UsersPages } from './pages/UsersPages';
import Navbar from './Components/layout/Navbar';
import { useAuth } from './Auth/hooks/useAuth';


const UsersApp = () => {

  const {login, handlerLogin, handlerLogout} = useAuth();

  return (

    <>
      {!login.isAuth
        ? <Login handlerLogin={formLogin => handlerLogin(formLogin)} />
        : <>
          <Navbar login ={login} handlerLogout={handlerLogout}/>
          <UsersPages />
        </>
      }

    </>
  );
}

export default UsersApp;
