import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Header from './components/Header/index.tsx'
import Footer from './components/Footer/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1'>
        <App />
      </div>
      <Footer />
    </div>
  </StrictMode>,
)
