import { routes as skeletonRoutes } from '../mod/_skeleton/routes/routes'
import { routes as dashboardRoutes } from '../mod/dashboard/routes/routes'
import { routes as contentModelRoutes } from '../mod/content_model/routes/routes'
import { routes as actionLogRoutes } from '../mod/action_log/routes/routes'
import { routes as contentFieldRoutes } from '../mod/content_field/routes/routes'

export const routes = [
    ...skeletonRoutes,
    ...dashboardRoutes,
    ...contentModelRoutes,
    ...actionLogRoutes,
    ...contentFieldRoutes,
]
