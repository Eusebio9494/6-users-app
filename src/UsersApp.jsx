import { useReducer } from 'react';
import Login from './Auth/pages/Login';
import { loginReducers } from './Auth/reducers/loginReducer';
import { UsersPages } from './pages/UsersPages';
import Swal from 'sweetalert2';
import Navbar from './Components/layout/Navbar';

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined
}
const UsersApp = () => {

  const [login, dispatch] = useReducer(loginReducers, initialLogin);


  const handlerLogin = ({ username, password }) => {
    console.log("handlerLogin: " + username, password)
    if (username === 'admin' && password === '12345') {
      const user = { username: 'admin' }
      dispatch(
        {
          type: 'LOGIN',
          action: user,
        }
      )
      sessionStorage.setItem("login", JSON.stringify({
        isAuth: true,
        user
      }));
      console.log(user)
    } else {
      Swal.fire('Error de validación', 'Username y password incorrectos', 'error')
    }
  }

  const handlerLogout = () => {
    dispatch(
      {
        type: 'LOGOUT'
      }
    );
    sessionStorage.removeItem("login");
  }

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
