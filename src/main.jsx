import React from 'react'
import ReactDOM from 'react-dom/client'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'
import './index.css'
import App from './App.jsx'

OverlayScrollbars(document.body, { scrollbars: { autoHide: 'move', autoHideSuspend: false } })
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
