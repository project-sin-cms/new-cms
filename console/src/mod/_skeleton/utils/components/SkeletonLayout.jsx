import { Outlet } from 'react-router-dom'
import { SkeletonProvider } from '../context/SkeletonContext'

export const SkeletonLayout = () => {
    return (
        <SkeletonProvider>
            <Outlet />
        </SkeletonProvider>
    )
}
