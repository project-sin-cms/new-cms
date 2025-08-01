import { Link } from 'react-router'
import { UserIcon } from '../../icons/index'
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from '../ui/dropdown'
import { HiCog, HiLogout } from 'react-icons/hi'

export const UserDropdown = () => {
    return (
        <Dropdown
            renderTrigger={() => (
                <button className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-8 w-8 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                    <UserIcon />
                </button>
            )}
        >
            <DropdownHeader className="text-center">
                <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                    アビリブ太郎
                </span>
                <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                    taro@ab-net.co.jp
                </span>
            </DropdownHeader>
            <DropdownItem icon={HiCog}>編集</DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={HiLogout}>サインアウト</DropdownItem>
        </Dropdown>
    )
}
