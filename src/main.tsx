import './index.css'

import { AuthProvider, Protected } from './components/Auth.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Painel from './pages/Painel.tsx'
import { Provider } from './components/ui/provider.tsx'
import Register from './pages/Register.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </StrictMode>,
)
