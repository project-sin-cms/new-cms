import {
    Label as FLabel,
    TextInput as FTextInput,
    Textarea as FTextarea,
    Select as FSelect,
    Radio as FRadio,
    Checkbox as FCheckbox,
} from 'flowbite-react'

export const Form = ({ children, ...props }) => {
    return <form {...props}>{children}</form>
}

export const FormGroup = ({ children, ...props }) => {
    return (
        <div className="mb-4" {...props}>
            {children}
        </div>
    )
}

export const Label = ({ htmlFor = '', children, ...props }) => {
    return (
        <div className="mb-2 block">
            <FLabel htmlFor={htmlFor} {...props}>
                {children}
            </FLabel>
        </div>
    )
}

export const TextInput = FTextInput

export const Textarea = FTextarea
