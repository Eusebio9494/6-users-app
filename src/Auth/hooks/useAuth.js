import React, { useReducer } from 'react';
import Swal from 'sweetalert2';
import { loginReducers } from '../reducers/loginReducer';
import { validateUser } from '../service/authService';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined
}
export const useAuth = () => {

  const [login, dispatch] = useReducer(loginReducers, initialLogin);
  const navigate = useNavigate();


  const handlerLogin = async({ username, password }) => {
    try{
      const response = await validateUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      console.log(claims)
      const user = { username: claims.sub }
      dispatch(
        {
          type: 'LOGIN',
          payload: {user, isAdmin: claims.admin}
        }
      )
      sessionStorage.setItem("login", JSON.stringify({
        isAuth: true,
        isAdmin: claims.admin,
        user: user
      }));
      sessionStorage.setItem("token", `Bearer ${token}`)

      navigate('/users');
    } catch(error) {
      if (error.response?.status == 401){
        Swal.fire('Error de validación', 'Username y password incorrectos', 'error')
        
      }else if(error.response?.status ==403){
        Swal.fire('Error de validación', 'No tiene acceso al recurso o permisos', 'error')

      } else {
        throw error;
      }
    }
  }

  const handlerLogout = () => {
    dispatch(
      {
        type: 'LOGOUT'
      }
    );
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login");
    sessionStorage.clear()
  }

  return {
    login,
    handlerLogin,
    handlerLogout
  }
}