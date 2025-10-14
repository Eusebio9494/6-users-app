import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import UsersApp from './UsersApp.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
      <UsersApp />
  </BrowserRouter>
  // </StrictMode>,
)
