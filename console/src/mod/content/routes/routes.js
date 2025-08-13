import React from 'react'
import { config } from '../utils/config'
import { Index } from '../page/Index'
import { New, Edit } from '../page/Form'
import { ContentLayout } from '../utils/components/ContentLayout'

import { Index as CateIndex } from '../page/category/Index'
import { New as CateNew, Edit as CateEdit } from '../page/category/Form'

export const routes = [
    {
        element: ContentLayout,
        children: [
            {
                name: config.name,
                path: `${config.path}/category`,
                element: CateIndex,
                menu: true,
            },
            {
                path: `${config.path}/category/new`,
                element: CateNew,
            },
            {
                path: `${config.path}/category/edit/:id`,
                element: CateEdit,
            },
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
