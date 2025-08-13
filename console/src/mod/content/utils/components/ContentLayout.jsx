import { Outlet } from 'react-router-dom'
import { ContentContextProvider } from '../context/ContentContext'

export const ContentLayout = () => {
    return (
        <ContentContextProvider>
            <Outlet />
        </ContentContextProvider>
    )
}
