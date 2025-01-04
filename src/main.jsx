import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Authprovider } from './Context/Authprovider.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Authprovider>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </Authprovider>
    </BrowserRouter>
  </StrictMode>,
)
