import { createContext, useContext } from 'react'

const ActionLogContext = createContext(undefined)

export const useActionLog = () => {
    const context = useContext(ActionLogContext)
    if (context === undefined) {
        throw new Error('useActionLog must be used within a ActionLogProvider')
    }
    return context
}

export const ActionLogProvider = ({ children }) => {
    const value = {}

    return <ActionLogContext.Provider value={value}>{children}</ActionLogContext.Provider>
}
