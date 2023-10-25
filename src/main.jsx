import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RouterBrowser from './router/RouterBrowser.jsx'
import { UserProvider } from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterBrowser>
        <App />
      </RouterBrowser>
    </UserProvider>
  </React.StrictMode>,
)
