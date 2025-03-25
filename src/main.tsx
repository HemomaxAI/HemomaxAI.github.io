import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import App from './pages/App.tsx'
import Home from './pages/Home.tsx'
import { Provider } from './components/ui/provider.tsx'
import Register from './pages/Register.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
