import { createContext, useContext } from 'react'

const SkeletonContext = createContext(undefined)

export const useSkeleton = () => {
    const context = useContext(SkeletonContext)
    if (context === undefined) {
        throw new Error('useSkeleton must be used within a SkeletonProvider')
    }
    return context
}

export const SkeletonProvider = ({ children }) => {
    // In the future, module-specific logic can be added here.
    const value = {}

    return <SkeletonContext.Provider value={value}>{children}</SkeletonContext.Provider>
}
