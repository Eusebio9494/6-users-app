import { createSlice } from "@reduxjs/toolkit";


const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: initialLogin
  },
  reducers: {
    LOGIN: (state, action)  => {
      state.login = {
                isAuth: true,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
            }
    },
    LOGOUT: (state) => {  
      state.login = {
                isAuth: false,
                isAdmin: false,
                user: undefined,
            }
    }
  }
})

export const {
  LOGIN,
  LOGOUT
} = authSlice.actions;