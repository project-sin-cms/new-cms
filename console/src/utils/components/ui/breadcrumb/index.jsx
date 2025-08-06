import { Breadcrumb as FBreadcrumb, BreadcrumbItem as FBreadcrumbItem } from 'flowbite-react'
import { useNavigation } from '../../../hooks/useNavigation'

export const Breadcrumb = FBreadcrumb

export const BreadcrumbItem = FBreadcrumbItem

export const BreadNavigation = ({ breads = [] }) => {
    const { navigateTo } = useNavigation()
    return (
        <Breadcrumb>
            {breads.map((item, index) => {
                let hasPath = typeof item.path !== 'undefined'
                return (
                    <BreadcrumbItem
                        key={index}
                        onClick={() => {
                            if (hasPath) {
                                navigateTo(item.path)
                            }
                        }}
                        style={hasPath ? { cursor: 'pointer' } : {}}
                    >
                        {item.name}
                    </BreadcrumbItem>
                )
            })}
        </Breadcrumb>
    )
}
