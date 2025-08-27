export const loginReducers = (state = {}, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                isAuth: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                isAuth: false
            }
        default:
            return state;
    }

}