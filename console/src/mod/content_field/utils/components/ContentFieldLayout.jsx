import { Outlet } from 'react-router-dom'
import { ContentFieldProvider } from '../context/ContentFieldContext'

export const ContentFieldLayout = () => {
    return (
        <ContentFieldProvider>
            <Outlet />
        </ContentFieldProvider>
    )
}
