import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Services from './pages/Services'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {path === '/servicios' ? <Services /> : <App />}
  </React.StrictMode>
)
