import Select from 'react-select'
import CreatabelSelect from 'react-select/creatable'
import { useTheme } from '../../../context/ThemeContext'

export const RSelect = ({ ...props }) => {
    const { theme } = useTheme()
    const isDarkMode = theme === 'dark'

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
            borderColor: state.isFocused
                ? isDarkMode
                    ? '#3B82F6'
                    : '#3B82F6'
                : isDarkMode
                ? '#4B5563'
                : '#D1D5DB',
            color: isDarkMode ? 'white' : 'black',
            minHeight: '40px',
            '&:hover': {
                borderColor: isDarkMode ? '#2563EB' : '#2563EB',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
            color: isDarkMode ? 'white' : 'rgb(16, 24, 40)',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? isDarkMode
                    ? '#2563EB'
                    : '#3B82F6'
                : isDarkMode && state.isSelected
                ? '#1E40AF'
                : !isDarkMode && state.isSelected
                ? '#3B82F6'
                : isDarkMode
                ? '#374151'
                : 'white',
            color: state.isSelected
                ? isDarkMode
                    ? 'white'
                    : 'white'
                : state.isFocused
                ? isDarkMode
                    ? 'white'
                    : 'white'
                : isDarkMode
                ? '#D1D5DB'
                : !state.isSelected
                ? 'rgb(16, 24, 40)'
                : 'white',
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? '#E5E7EB' : 'rgb(16, 24, 40)',
        }),
        input: (provided) => ({
            ...provided,
            color: isDarkMode ? '#E5E7EB' : 'rgb(16, 24, 40)',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
        }),
    }

    return (
        <CreatabelSelect
            styles={customStyles}
            classNamePrefix={'rs'}
            isClearable
            formatCreateLabel={(inputValue) => `"${inputValue}"を作成する`}
            {...props}
        />
    )
}
