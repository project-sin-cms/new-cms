import { createContext, useContext } from 'react'

const ContentModelContext = createContext(undefined)

export const useContentModel = () => {
    const context = useContext(ContentModelContext)
    if (context === undefined) {
        throw new Error('useContentModel must be used within a ContentModelProvider')
    }
    return context
}

export const ContentModelProvider = ({ children }) => {
    const value = {}

    return <ContentModelContext.Provider value={value}>{children}</ContentModelContext.Provider>
}
