import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/dashboard.jsx'
import Test from './components/test.test.jsx'

createRoot(document.getElementById('root')).render(
    <Test />
)
