import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'

export const routes = [
    {
        name: config.name,
        path: `${config.path}`,
        element: Index,
        menu: true,
    },
]
