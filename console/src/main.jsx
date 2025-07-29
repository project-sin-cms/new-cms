import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes/routes.js'
import App from './App.jsx'
import config from './config/configLoader.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <Routes>
                {routes.map((route, idx) => {
                    return (
                        <Route
                            path={route.path}
                            element={<route.element config={config} />}
                            key={idx}
                        />
                    )
                })}
                <Route path={'/'} element={<App />} />
            </Routes>
        </HashRouter>
    </StrictMode>
)
