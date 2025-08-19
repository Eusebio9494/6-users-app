import { useState } from "react";

export const usersReducer = (state = [], action) => {
    switch(action.type){
        case 'AddUser': 
        return [...state,
            {
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                id: action.payload.id
            }
        ];
        default:
            return state;
    }
    
}