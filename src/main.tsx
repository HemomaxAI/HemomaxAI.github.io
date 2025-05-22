import './index.css'

import { AuthProvider, Protected } from './components/auth/Auth.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

import BiomedicalPage from './pages/BiomedicalList.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import { Provider } from './components/ui/provider.tsx'
import Register from './pages/Register.tsx'
import Report from './pages/Report.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<Protected />}>
              <Route path='/laudos' element={<Report />} />
              <Route path='/gerenciar-biomedicos' element={<BiomedicalPage />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/entrar" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
    </StrictMode>
)
