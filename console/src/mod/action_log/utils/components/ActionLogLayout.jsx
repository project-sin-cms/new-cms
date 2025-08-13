import { Outlet } from 'react-router-dom'
import { ActionLogProvider } from '../context/ActionLogContext'

export const ActionLogLayout = () => {
    return (
        <ActionLogProvider>
            <Outlet />
        </ActionLogProvider>
    )
}
