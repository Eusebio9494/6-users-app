# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 6-users-app
Implementación de un servicio de usuarios con su login, según credenciales, contiene tambien acciones crud

# Forma 1 para enviar cabeceras en axios
const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem("token"),
            "Content-Type": "application/json" //Se envia por defecto

        }
    }
}

# Para sumar ramificaciones a la url base basta con:
// Esto hará una petición a: http://localhost:8080/users/pending
const response = await usersApi.get('/pending');

const response = await usersApi.get('/process/status');
const response = await usersApi.get('/process/123/status');

baseURL: 'http://localhost:8080/users'
endpoint: lo que agregas en el método (.get('/pending'))
URL final: axios concatena ambos → 'http://localhost:8080/users/pending'