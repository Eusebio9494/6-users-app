export const validateUser = (userLogin) => {
    
    return (userLogin.username === 'admin' && userLogin.password=== '12345');
}