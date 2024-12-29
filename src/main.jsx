import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./App.css";
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
          position="bottom-center"
          theme="colored"
          hideProgressBar={true}
          closeButton={false}
          draggable={false}
        />
  </StrictMode>,
)
