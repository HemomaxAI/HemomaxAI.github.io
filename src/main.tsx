import './index.css'

import { AuthProvider, Protected } from './components/Auth.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import { Provider } from './components/ui/provider.tsx'
import Report from './pages/Report.tsx'
import Register from './pages/Register.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BiomedicalPage from './pages/BiomedicalList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<Protected />}>
              <Route path='/hemomax/criar-laudo' element={<Report />} />
              <Route path='/hemomax/gerenciar-biomedicos' element={<BiomedicalPage />} />
            </Route>
            <Route path="/hemomax/" element={<Home />} />
            <Route path="/hemomax/registrar" element={<Register />} />
            <Route path="/hemomax/entrar" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
