import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AppLayout } from './utils/components/layout/AppLayout'
import { ScrollToTop } from './utils/components/common/ScrollToTop'
import { NotFound } from './utils/pages/OtherPage/NotFound'
import { routes as menuRoutes } from './routes/routes'
import { Toaster } from 'sonner' // Toasterをインポート
import config from './config/configLoader'

function App() {
    return (
        <>
            <Router basename={config.basename}>
                <ScrollToTop />
                <Routes>
                    <Route element={<AppLayout />}>
                        {menuRoutes.map((route, idx) => {
                            if (route.children) {
                                return (
                                    <Route element={<route.element />} key={idx}>
                                        {route.children.map((childRoute, childIdx) => {
                                            return (
                                                <Route
                                                    path={childRoute.path}
                                                    element={<childRoute.element />}
                                                    key={childIdx}
                                                />
                                            )
                                        })}
                                    </Route>
                                )
                            }
                            return <Route path={route.path} element={<route.element />} key={idx} />
                        })}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Toaster position="top-right" richColors /> {/* Toasterを追加 */}
        </>
    )
}

export default App
