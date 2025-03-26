import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Painel from './pages/Painel.tsx'
import Protected from './pages/Protected.tsx'
import { Provider } from './components/ui/provider.tsx'
import Register from './pages/Register.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route path='/painel' element={<Painel />} />
            {/* All other routes that you want to protect will go inside here */}
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/entrar" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
