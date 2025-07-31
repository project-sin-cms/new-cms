import {
    Modal as FModal,
    ModalHeader as FModalHeader,
    ModalBody as FModalBody,
    ModalFooter as FModalFooter,
} from 'flowbite-react'

export const Modal = ({ show, children, ...props }) => {
    return (
        <FModal show={show} {...props}>
            {children}
        </FModal>
    )
}

export const ModalHeader = ({ children, ...props }) => {
    return <FModalHeader {...props}>{children}</FModalHeader>
}

export const ModalBody = ({ children, ...props }) => {
    return <FModalBody {...props}>{children}</FModalBody>
}

export const ModalFooter = ({ children, ...props }) => {
    return <FModalFooter {...props}>{children}</FModalFooter>
}
