import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'
import { New } from '../page/New'
import { Edit } from '../page/Edit'

export const routes = [
    {
        name: config.name,
        path: `${config.path}`,
        element: Index,
        menu: true,
    },
    {
        path: `${config.path}/new`,
        element: New,
    },
    {
        path: `${config.path}/edit/:id`,
        element: Edit,
    },
]
