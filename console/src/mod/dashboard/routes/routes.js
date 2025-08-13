import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'
import { DashboardLayout } from '../utils/components/DashboardLayout'

export const routes = [
    {
        element: DashboardLayout,
        children: [
            {
                name: config.name,
                path: `${config.path}`,
                element: Index,
                menu: true,
            },
        ],
    },
]
