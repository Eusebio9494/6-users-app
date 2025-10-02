export const loginReducers = (state = {}, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                isAuth: true,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
            }
        case 'LOGOUT':
            return {
                isAuth: false,
                isAdmin: false,
                user: undefined,
            }
        default:
            return state;
    }

}