import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css' // <-- Make sure this line is present and not commented out

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)