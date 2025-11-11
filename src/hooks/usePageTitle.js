import { useEffect } from "react";

// Hook personalizado para establecer el título de la página
const usePageTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Users App`;
    }, [title]);

};

export default usePageTitle;