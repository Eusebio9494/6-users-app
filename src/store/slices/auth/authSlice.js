import { createSlice } from "@reduxjs/toolkit";


const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: initialLogin,
    isLoginLoading: false,
  },
  reducers: {
    LOGIN: (state, action)  => {
      state.login = {
                isAuth: true,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
            }
      state.isLoginLoading = false;
    },
    LOGOUT: (state) => {  
      state.login = {
                isAuth: false,
                isAdmin: false,
                user: undefined,
            }
      state.isLoginLoading = false;
    },
    ONLOADING: (state, action) => {
      state.isLoginLoading = true;
    }
  }
})

export const {
  LOGIN,
  LOGOUT,
  ONLOADING
} = authSlice.actions;