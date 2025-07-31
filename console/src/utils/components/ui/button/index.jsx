import { Button as FButton, ButtonGroup as FButtonGroup } from 'flowbite-react'

export const Button = ({ color = 'blue', size = 'md', children, ...props }) => {
    return (
        <FButton color={color} size={size} {...props}>
            {children}
        </FButton>
    )
}

export const ButtonGroup = ({ children, ...props }) => {
    return <FButtonGroup {...props}>{children}</FButtonGroup>
}
