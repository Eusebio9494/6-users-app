import { useReducer } from 'react';
import Login from './Auth/pages/Login';
import { loginReducers } from './Auth/reducers/loginReducer';
import { UsersPages } from './pages/UsersPages';
import Swal from 'sweetalert2';

const initialLogin = {
  isAuth: false,
  user: undefined
}
const UsersApp = () => {

  const [login, dispatch] = useReducer(loginReducers, initialLogin);


  const handlerLogin = ( { username, password } ) => {
    console.log("handlerLogin: "+username, password)
    if (username === 'admin' && password === '12345') {
      const user = {username: 'admin'}
      dispatch(
        {
          type: 'LOGIN',
          action: user,
        }
      )
      console.log(user)
    } else {
      Swal.fire('Error de validación', 'Username y password incorrectos', 'error')
    }
  }

  return (

    <>
      {!login.isAuth
        ? <Login handlerLogin={formLogin => handlerLogin(formLogin)} />
        : <UsersPages />}

    </>
  );
}

export default UsersApp;
