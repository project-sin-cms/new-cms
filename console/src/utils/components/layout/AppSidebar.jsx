import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { ChevronDownIcon, GridIcon, ListIcon, PencilIcon } from '../../icons'
import { useSidebar } from '../../context/SidebarContext'

import { useAxios } from '../../hooks/useAxios'
import { config } from '../../../mod/content_model/utils/config'

let navItems = []
const baseNav = [
    {
        icon: <GridIcon />,
        name: 'Dashboard',
        path: '/',
    },
    {
        name: 'Content Model',
        icon: <ListIcon />,
        path: '/content/model',
        // subItems: [{ name: 'model', path: '/content_model', pro: false }],
    },
    {
        name: 'Action Log',
        icon: <ListIcon />,
        path: '/action_log',
    },
]

export const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
    const location = useLocation()

    const [openSubmenu, setOpenSubmenu] = useState(null)
    const [subMenuHeight, setSubMenuHeight] = useState({})
    const subMenuRefs = useRef({})

    const { loading, sendRequest, data } = useAxios()
    const initRef = useRef(false)

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback((path) => location.pathname === path, [location.pathname])

    useEffect(() => {
        let submenuMatched = false
        ;['admin'].forEach((menuType) => {
            const items = navItems
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                menuType,
                                index,
                            })
                            submenuMatched = true
                        }
                    })
                }
            })
        })

        if (!submenuMatched) {
            setOpenSubmenu(null)
        }
    }, [location, isActive])

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }))
            }
        }
    }, [openSubmenu])

    // 左メニュー取得
    useEffect(() => {
        if (!initRef.current) {
            ;(async () => {
                const response = await sendRequest({
                    method: 'get',
                    url: `${config.end_point}/resource`,
                })
                let clone = [...baseNav]
                if (response?.data) {
                    response.data.payload.data.map((menu, idx) => {
                        clone.splice(2 + idx, 0, {
                            name: menu.title,
                            icon: <PencilIcon />,
                            path: '/' + menu.alias,
                        })
                    })
                }
                navItems = clone
            })()
            initRef.current = true
        }
    }, [])

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null
            }
            return { type: menuType, index }
        })
    }

    const renderMenuItems = (items, menuType) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={index}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            } cursor-pointer ${
                                !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size  ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? 'menu-item-icon-active'
                                        : 'menu-item-icon-inactive'
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'
                                    }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : '0px',
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? 'menu-dropdown-item-active'
                                                    : 'menu-dropdown-item-inactive'
                                            }`}
                                        >
                                            {subItem.name}
                                            <span className="flex items-center gap-1 ml-auto">
                                                {subItem.new && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? 'menu-dropdown-badge-active'
                                                                : 'menu-dropdown-badge-inactive'
                                                        } menu-dropdown-badge`}
                                                    >
                                                        new
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    )

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-blue-200 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
            ${isExpanded || isMobileOpen ? 'w-[250px]' : isHovered ? 'w-[290px]' : 'w-[70px]'}
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-4 flex dark:text-gray-200 ${
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-center'
                }`}
            >
                <Link to="/">
                    {isExpanded || isHovered || isMobileOpen ? <>abi-CMS</> : <>CMS</>}
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>{renderMenuItems(navItems, 'main')}</div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
