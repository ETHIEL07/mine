import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// Supprimer le loader une fois React monté
const loader = document.getElementById('app-loader')
if (loader) loader.remove()

// ❌ TEMPORAIREMENT COMMENTÉ POUR DEBUG
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch(() => {})
//   })
// }