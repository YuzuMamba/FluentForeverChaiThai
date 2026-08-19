import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/baloo-2'
import '@fontsource-variable/noto-sans-thai'
import '@fontsource/noto-sans-thai-looped/400.css'
import '@fontsource/noto-sans-thai-looped/500.css'
import '@fontsource/noto-sans-thai-looped/700.css'
import './styles/global.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
