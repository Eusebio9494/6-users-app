import { useEffect } from "react";

// Hook personalizado para establecer el título de la página en "Login Page - Users App"
const usePageLogin = () => {
    useEffect(() => {
        document.title= `Login Page - Users App`;
    }, [])
}

export default usePageLogin;