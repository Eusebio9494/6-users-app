import React, { useReducer } from 'react';
import Swal from 'sweetalert2';
import { loginReducers } from '../reducers/loginReducer';

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined
}
export const useAuth = () => {

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

  return {
    login,
    handlerLogin,
    handlerLogout
  }
}