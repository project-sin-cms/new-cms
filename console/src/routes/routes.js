import App from '../App'
import { routes as skeletonRoutes } from '../mod/_skeleton/routes/routes'

export const routes = [...skeletonRoutes, [{ path: '/', element: App, name: 'Top' }]]
