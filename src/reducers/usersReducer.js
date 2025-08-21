import { useState } from "react";

export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'AddUser':
            return [...state,
            {
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                id: action.payload.id
            }
            ];
        case 'RemoveUser':
            return state.filter(user => user.id !== action.payload);
        case 'UpdateUser':
            console.log("Payload: ", action.payload)
            return state.map(user => {
                if (user.id === action.payload.id) {
                    return { ...action.payload,
                        password: user.password // Mantiene la contraseña existente
                     }
                };

                return user
            })
        default:
            return state;
    }

}