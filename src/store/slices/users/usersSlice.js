import { createSlice } from "@reduxjs/toolkit";

export const form = {
    id: 0,
    username: "",
    password: "",
    email: "",
    admin: false,
}
const initialErrors= {
    username: "",
    password: "",
    email: ""
}
export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        //* Un arreglo vacio por defecto como en useUsers
        usersList: [],
        formUpdate: form,
        visibleForm: false, //* Controla la visibilidad del formulario
        errors: initialErrors
    },
    reducers: {
        AddUser: (state, action) => {
            state.usersList = [...state.usersList,
            {
                ...action.payload,
            }
            ];
        },
        RemoveUser: (state, action) => {
            state.usersList = state.usersList.filter(user => user.id !== action.payload);
        },
        UpdateUser: (state, action) => {
            state.usersList = state.usersList.map(user => {
                if (user.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                };

                return user
            })
        },
        loadingUsers: (state, action) => {
            state.usersList = action.payload
        },
        onUserForm: (state, action) => {
            state.formUpdate = action.payload
            state.visibleForm = true
        },
        onOpenForm: (state) => {
            state.visibleForm = true
            { console.log('%cBooleano para mostrar formulario:', 'color: pink; font-weight: bold;', state.visibleForm) }
        },
        onCloseeForm: (state) => {
            state.formUpdate = form
            state.visibleForm = false
            { console.log('%cBooleano para ocultar formulario:', 'color: pink; font-weight: bold;', state.visibleForm) }
            state.errors = initialErrors
        },
        //Se puede desestructurar el payload del action
        loadingError: (state, {payload}) => {
            state.errors = payload
        }
    }
})

export const {
    AddUser,
    RemoveUser,
    UpdateUser,
    loadingUsers,
    onUserForm,
    onOpenForm,
    onCloseeForm,
    loadingError
} = usersSlice.actions