import {
    Dropdown as FDropdown,
    DropdownItem as FDropdownItem,
    DropdownHeader as FDropdownHeader,
    DropdownDivider as FDropdownDivider,
} from 'flowbite-react'

export const Dropdown = ({
    label = '',
    dismissOnClick = false,
    renderTrigger = null,
    children,
    ...props
}) => {
    return (
        <FDropdown
            label={label}
            dismissOnClick={dismissOnClick}
            renderTrigger={renderTrigger}
            {...props}
        >
            {children}
        </FDropdown>
    )
}

export const DropdownItem = ({ children, ...props }) => {
    return <FDropdownItem {...props}>{children}</FDropdownItem>
}

export const DropdownHeader = ({ children, ...props }) => {
    return <FDropdownHeader {...props}>{children}</FDropdownHeader>
}

export const DropdownDivider = () => {
    return <FDropdownDivider />
}
