import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'
import { New, Edit } from '../page/Form'
import { ContentModelLayout } from '../utils/components/ContentModelLayout'

export const routes = [
    {
        element: ContentModelLayout,
        children: [
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
        ],
    },
]
