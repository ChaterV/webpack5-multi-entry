import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '@/css/tw.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)