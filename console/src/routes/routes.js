import { routes as skeletonRoutes } from '../mod/_skeleton/routes/routes'
import { routes as dashboardRoutes } from '../mod/dashboard/routes/routes'

export const routes = [...skeletonRoutes, ...dashboardRoutes]
