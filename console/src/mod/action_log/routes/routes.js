import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'
import { New, Edit } from '../page/Form'

export const routes = [
    {
        name: config.name,
        path: `${config.path}`,
        element: Index,
        menu: true,
    },
]
