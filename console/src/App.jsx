import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AppLayout } from './utils/components/layout/AppLayout'
import { ScrollToTop } from './utils/components/common/ScrollToTop'
import { NotFound } from './utils/pages/OtherPage/NotFound'
import { routes as menuRoutes } from './routes/routes'
import { Toaster } from 'sonner' // Toasterをインポート

function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route element={<AppLayout />}>
                        {menuRoutes.map((menuRoute, idx) => {
                            return (
                                <Route
                                    path={menuRoute.path}
                                    element={<menuRoute.element />}
                                    key={idx}
                                />
                            )
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
