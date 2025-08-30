import React, { useReducer } from 'react';
import Swal from 'sweetalert2';
import { loginReducers } from '../reducers/loginReducer';
import { validateUser } from '../service/authService';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined
}
export const useAuth = () => {

  const [login, dispatch] = useReducer(loginReducers, initialLogin);
  const navigate = useNavigate();


  const handlerLogin = ({ username, password }) => {
    const isLogin = validateUser({ username, password });
    if (isLogin) {
      const user = { username: 'admin' }
      dispatch(
        {
          type: 'LOGIN',
          payload: user,
        }
      )
      sessionStorage.setItem("login", JSON.stringify({
        isAuth: true,
        user
      }));

      navigate('/users');
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