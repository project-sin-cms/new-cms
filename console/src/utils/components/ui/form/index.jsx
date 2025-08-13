import {
    Label as FLabel,
    TextInput as FTextInput,
    Textarea as FTextarea,
    Select as FSelect,
    Radio as FRadio,
    Checkbox as FCheckbox,
    ToggleSwitch as FToggleSwitch,
} from 'flowbite-react'
import { RSelect } from './ReactSelect'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../hooks/useAxios'
import { Spinner } from '../spinner'
import Flatpickr from 'react-flatpickr'
import { Japanese } from 'flatpickr/dist/l10n/ja.js'
import { twMerge } from 'tailwind-merge'

const customInputClasses =
    'block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 p-2.5 text-sm rounded-lg'

/**
 * Form component wrapping an HTML form element.
 * @param {object} props - Props passed to the form element.
 */
export const Form = ({ children, ...props }) => {
    return <form {...props}>{children}</form>
}

/**
 * FormGroup component for grouping form elements with margin.
 * @param {object} props - Props passed to the div element.
 */
export const FormGroup = ({ children, ...props }) => {
    return (
        <div className="mb-4" {...props}>
            {children}
        </div>
    )
}

/**
 * Label component wrapping flowbite-react's Label.
 * @param {object} props - Props including htmlFor and children passed to FLabel.
 */
export const Label = ({ htmlFor = '', children, ...props }) => {
    return (
        <div className="mb-2 block">
            <FLabel htmlFor={htmlFor} {...props}>
                {children}
            </FLabel>
        </div>
    )
}

/**
 * TextInput component wrapping flowbite-react's TextInput.
 *
 * @param {object} props - Props passed to FTextInput.
 * @param {string} props.id - ID of the input element.
 * @param {string} [props.name] - Name of the input field.
 * @param {string} [props.value] - Current value of the input.
 * @param {function(string, React.ChangeEvent<HTMLInputElement>): void} [props.onChange] - Callback with value and event.
 * @returns {JSX.Element}
 */
export const TextInput = ({ onChange = () => {}, ...props }) => {
    return (
        <FTextInput
            onChange={(e) => {
                onChange(e.target.value, e)
            }}
            {...props}
        />
    )
}

/**
 * Textarea component wrapping flowbite-react's Textarea.
 *
 * @param {object} props - Props passed to FTextarea.
 * @param {string} props.id - ID of the textarea element.
 * @param {string} [props.name] - Name of the textarea field.
 * @param {string} [props.value] - Current value of the textarea.
 * @param {function(string, React.ChangeEvent<HTMLTextAreaElement>): void} [props.onChange] - Callback with value and event.
 * @returns {JSX.Element}
 */
export const Textarea = ({ onChange = () => {}, ...props }) => {
    return (
        <FTextarea
            onChange={(e) => {
                onChange(e.target.value, e)
            }}
            {...props}
        />
    )
}

/**
 * Select component wrapping flowbite-react's Select.
 *
 * @param {object} props - Props passed to FSelect.
 * @param {string} props.id - ID of the select input.
 * @param {string} [props.name] - Name of the select input.
 * @param {Array<{ value: string, label: string }>} props.items - Array of option items.
 * @param {string} [props.value] - Selected value.
 * @param {function(string, React.ChangeEvent<HTMLSelectElement>): void} [props.onChange] - Callback when selected value changes.
 * @param {boolean} [props.required] - Whether the field is required.
 * @returns {JSX.Element}
 */
export const Select = ({ placeholder = null, onChange = () => {}, items, ...props }) => {
    return (
        <FSelect
            {...props}
            onChange={(e) => {
                onChange(e.target.value, e)
            }}
        >
            {placeholder && <option>{placeholder}</option>}
            {items.map((item) => (
                <option
                    key={item.value}
                    value={item.value}
                    checked={item.value === props.defaultValue}
                >
                    {item.label}
                </option>
            ))}
        </FSelect>
    )
}

/**
 * Radio component wrapping flowbite-react's Radio.
 *
 * @param {object} props
 * @param {boolean} [props.vertical=false] - Display options vertically instead of inline.
 * @param {function(string, React.ChangeEvent<HTMLInputElement>): void} [props.onChange] - Callback fired on value change.
 * @param {Array<{ value: string, label: string }>} props.items - Array of radio options.
 * @param {string} props.name - Name attribute for all radio inputs.
 * @param {string} [props.defaultValue] - Default selected value.
 * @returns {JSX.Element}
 */
export const Radio = ({
    vertical = false,
    onChange = () => {},
    items,
    defaultValue,
    name,
    ...props
}) => {
    return (
        <div className={`${vertical ?? 'flex flex-col'} gap-4`}>
            {items.map((item, idx) => {
                return (
                    <div className={`flex item-center gap-2 ${!vertical ?? 'inline-flex'}`}>
                        <FRadio
                            id={`${name}_${item.value}`}
                            name={name}
                            value={item.value}
                            defaultChecked={defaultValue === item.value}
                            onChange={(e) => {
                                onChange(e.target.value, e)
                            }}
                            {...props}
                        />
                        <FLabel htmlFor={`${name}_${item.value}`}>{item.label}</FLabel>
                    </div>
                )
            })}
        </div>
    )
}

/**
 * Checkbox component wrapping flowbite-react's Checkbox.
 *
 * @param {object} props
 * @param {boolean} [props.vertical=false] - Display options vertically instead of inline.
 * @param {function(string, React.ChangeEvent<HTMLInputElement>): void} [props.onChange] - Callback fired on value change.
 * @param {Array<{ value: string, label: string }>} props.items - Array of checkbox options.
 * @param {string} props.name - Name attribute for all checkbox inputs.
 * @param {string[]} [props.defaultValue] - Array of default selected values.
 * @returns {JSX.Element}
 */
export const Checkbox = ({
    vertical = false,
    onChange = () => {},
    items,
    defaultValue,
    name,
    ...props
}) => {
    return (
        <div className={`${vertical ?? 'flex flex-col'} gap-4`}>
            {items.map((item, idx) => {
                return (
                    <div className={`flex item-center gap-2 ${!vertical ?? 'inline-flex'}`}>
                        <FCheckbox
                            id={`${name}_${item.value}`}
                            name={name}
                            value={item.value}
                            defaultChecked={defaultValue === item.value}
                            onChange={(e) => {
                                onChange(e.target.value, e)
                            }}
                            {...props}
                        />
                        <FLabel htmlFor={`${name}_${item.value}`}>{item.label}</FLabel>
                    </div>
                )
            })}
        </div>
    )
}

/**
 * Switch component wrapping flowbite-react's ToggleSwitch.
 *
 * @param {object} props - Props passed to FToggleSwitch.
 * @param {boolean} props.defaultValue - Whether the switch is checked (controlled).
 * @param {function(boolean): void} [props.onChange] - Callback fired when the value changes.
 * @param {string} [props.label] - Optional label shown next to the switch.
 * @returns {JSX.Element}
 */
export const Switch = ({ defaultValue = false, ...props }) => {
    return <FToggleSwitch checked={defaultValue} {...props} />
}

/**
 * FormLabel component wrapping flowbite-react's Label to display a simple label.
 * @param {object} props - Props passed to FLabel.
 * @param {string} props.label - The text content of the label.
 * @returns {JSX.Element}
 */
export const FormLabel = ({ label, ...props }) => {
    return <FLabel>{label}</FLabel>
}

/**
 * TaxonomySelect component fetches options from an API endpoint and renders a react-select dropdown.
 *
 * @param {object} props - Props passed to the component.
 * @param {string} props.endpoint - API endpoint URL to fetch options from.
 * @param {string} [props.keyLabel='title'] - Object key to use for option labels.
 * @param {string} [props.keyValue='id'] - Object key to use for option values.
 * @returns {JSX.Element} A spinner while loading and a react-select dropdown after data is loaded.
 */
export const TaxonomySelect = ({
    defaultValue = [],
    endpoint,
    keyLabel = 'title',
    keyValue = 'id',
    ...props
}) => {
    const { data, sendRequest } = useAxios()
    const [loading, setLoading] = useState(true)
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (endpoint) {
            sendRequest({ url: endpoint, method: 'GET' })
        }
    }, [endpoint])

    useEffect(() => {
        if (data && Array.isArray(data?.payload.data)) {
            setOptions(
                data.payload.data.map((item) => ({
                    label: item[keyLabel],
                    value: item[keyValue],
                }))
            )
            setLoading(false)
        }
    }, [data])

    return (
        <>
            {loading && <Spinner />}
            {!loading && <RSelect value={defaultValue} options={options} {...props} />}
        </>
    )
}

/**
 * DatePicker component using react-flatpickr.
 *
 * @param {object} props - Props passed to Flatpickr.
 * @param {string|Date} [props.defaultValue] - The initial date value.
 * @param {function(Date): void} [props.onChange] - Callback fired when the date changes.
 * @returns {JSX.Element}
 */
export const DatePicker = ({ defaultValue, onChange = () => {}, className, ...props }) => {
    const options = {
        locale: Japanese,
        dateFormat: 'Y-m-d',
        ...props.options,
    }

    return (
        <Flatpickr
            value={defaultValue}
            onChange={([date]) => {
                onChange(date)
            }}
            options={options}
            className={twMerge(customInputClasses, className)}
            {...props}
        />
    )
}

/**
 * FormBuilder component dynamically renders form input components based on formType.
 * Supports 'text' (TextInput), 'textarea' (Textarea), 'select' (Select), and 'switch' (Switch).
 * @param {object} props - Props passed to the rendered component.
 * @param {string} formType - Type of form input to render.
 */
export const FormBuilder = ({ formType = 'text', ...props }) => {
    switch (formType) {
        case 'textarea':
            return <Textarea {...props} />
        case 'select':
            return <Select {...props} />
        case 'switch':
            return <Switch {...props} />
        case 'label':
            return <FormLabel {...props} />
        case 'taxonomy_select':
            return <TaxonomySelect {...props} />
        case 'date':
            return <DatePicker {...props} />
        default:
            return <TextInput {...props} />
    }
}
