import { Breadcrumb as FBreadcrumb, BreadcrumbItem as FBreadcrumbItem } from 'flowbite-react'

export const Breadcrumb = ({ children, ...props }) => {
    return (
        <FBreadcrumb aria-label="breadcrumb" {...props}>
            {children}
        </FBreadcrumb>
    )
}

export const BreadcrumbItem = ({ children, ...props }) => {
    return <FBreadcrumbItem {...props}>{children}</FBreadcrumbItem>
}
