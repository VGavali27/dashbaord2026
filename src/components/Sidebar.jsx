import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BarChart3, Settings, Users, FileText, Home, Database, Shield, ListTodo, ChevronDown } from 'lucide-react'

const menuItems = [
	{
		icon: Home,
		label: 'Dashboard',
		path: '/dashboard',
		submenu: null,
	},
	{
		icon: ListTodo,
		label: 'Tasks',
		path: '/tasks',
		submenu: [
			{ label: 'My tasks', path: '/tasks/my' },
			{ label: 'All tasks', path: '/tasks/all' },
		],
	},
	{
		icon: BarChart3,
		label: 'Analytics',
		path: '/analytics',
		submenu: [
			{ label: 'Overview', path: '/analytics/overview' },
			{ label: 'Revenue', path: '/analytics/revenue' },
			{ label: 'Traffic', path: '/analytics/traffic' },
			{ label: 'Conversion', path: '/analytics/conversion' },
		],
	},
	{
		icon: Users,
		label: 'Users',
		path: '/users',
		submenu: [
			{ label: 'All users', path: '/users/all' },
			{ label: 'Active users', path: '/users/active' },
			{ label: 'Roles & permissions', path: '/users/roles' },
			{ label: 'Teams', path: '/users/teams' },
		],
	},
	{
		icon: FileText,
		label: 'Reports',
		path: '/reports',
		submenu: [
			{ label: 'Sales reports', path: '/reports/sales' },
			{ label: 'Performance', path: '/reports/performance' },
			{ label: 'Audit logs', path: '/reports/audit' },
			{ label: 'Export', path: '/reports/export' },
		],
	},
	{
		icon: Database,
		label: 'Data',
		path: '/data',
		submenu: [
			{ label: 'Databases', path: '/data/databases' },
			{ label: 'Backups', path: '/data/backups' },
			{ label: 'Sync status', path: '/data/sync' },
		],
	},
	{
		icon: Shield,
		label: 'Security',
		path: '/security',
		submenu: [
			{ label: 'Access control', path: '/security/access' },
			{ label: 'API keys', path: '/security/keys' },
			{ label: 'Audit trail', path: '/security/audit' },
		],
	},
	{
		icon: Settings,
		label: 'Settings',
		path: '/settings',
		submenu: [
			{ label: 'General', path: '/settings/general' },
		],
	},
]

const rowBase =
	'relative w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors'
const rowIdle =
	'text-g-600 dark:text-g-400 hover:bg-g-100 dark:hover:bg-g-800 hover:text-g-900 dark:hover:text-g-100'
const rowActive =
	'bg-g-100 dark:bg-g-800 text-g-900 dark:text-g-50'

function ActiveTick() {
	return (
		<span
			aria-hidden="true"
			className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500"
		/>
	)
}

export function Sidebar({ mobileOpen = false, desktopCollapsed = false, onMobileToggle }) {
	const [expandedMenus, setExpandedMenus] = useState({})
	const location = useLocation()

	const toggleSubmenu = (path) => {
		setExpandedMenus((prev) => {
			const isOpen = !!prev[path]
			if (isOpen) return {}
			return { [path]: true }
		})
	}

	const isRouteActive = (item) => {
		if (location.pathname === item.path) return true
		if (item.submenu?.some((sub) => location.pathname === sub.path)) return true
		return location.pathname.startsWith(`${item.path}/`)
	}

	const handleNavClick = () => {
		// Only close mobile sidebar on mobile screens
		if (window.innerWidth < 1024 && onMobileToggle) {
			onMobileToggle()
		}
	}

	const mobileVisibleClass = mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
	const desktopWidthClass = desktopCollapsed ? 'lg:w-20' : 'lg:w-64'
	const base = [
		'fixed left-0 top-16 bottom-0 z-50 flex flex-col bg-paper dark:bg-g-950 border-r border-g-200 dark:border-white/10 transition-transform duration-300 ease-ui overflow-hidden',
		'w-64 sm:w-72',
		desktopWidthClass,
		mobileVisibleClass,
	].join(' ')

	return (
		<>
			{mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onMobileToggle} />}
			<aside className={base} aria-hidden={!mobileOpen && typeof window !== 'undefined' && window.innerWidth < 1024}>
				<div className="flex-1 overflow-y-auto">
					{/* Menu */}
					<div className="p-3 space-y-0.5">
						{menuItems.map((item) => {
							const submenuOpen = !!expandedMenus[item.path]
							const active = isRouteActive(item)

							return (
								<div key={item.path}>
									{item.submenu ? (
										<button
											onClick={() => !desktopCollapsed && toggleSubmenu(item.path)}
											title={desktopCollapsed ? item.label : ''}
											aria-expanded={submenuOpen}
											className={`${rowBase} ${active ? rowActive : rowIdle}`}
										>
											{active && <ActiveTick />}
											<span className="w-5 flex items-center justify-center flex-shrink-0 text-g-500 dark:text-g-500">
												<item.icon size={18} strokeWidth={1.5} />
											</span>

											{!desktopCollapsed && (
												<>
													<span className="flex-1 text-left font-medium">
														{item.label}
													</span>
													<ChevronDown
														size={16}
														strokeWidth={1.5}
														className={`flex-shrink-0 text-g-500 dark:text-g-500 transition-transform duration-200 ease-ui ${submenuOpen ? 'rotate-180' : ''}`}
													/>
												</>
											)}
										</button>
									) : (
										<NavLink
											to={item.path}
											onClick={handleNavClick}
											className={({ isActive }) =>
												`${rowBase} ${isActive ? rowActive : rowIdle}`
											}
											title={desktopCollapsed ? item.label : ''}
										>
											{({ isActive }) => (
												<>
													{isActive && <ActiveTick />}
													<span className="w-5 flex items-center justify-center flex-shrink-0 text-g-500 dark:text-g-500">
														<item.icon size={18} strokeWidth={1.5} />
													</span>

													{!desktopCollapsed && (
														<span className="flex-1 text-left font-medium">
															{item.label}
														</span>
													)}
												</>
											)}
										</NavLink>
									)}

									{/* Animated submenu container */}
									{!desktopCollapsed && item.submenu && (
										<div
											className={`grid transition-[grid-template-rows] duration-300 ease-ui ${submenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
											aria-hidden={!submenuOpen}
										>
											<div className="overflow-hidden">
												<div className="pl-8 pt-0.5 space-y-0.5">
													{item.submenu.map((sub) => (
														<NavLink
															key={sub.path}
															to={sub.path}
															onClick={handleNavClick}
															className={({ isActive }) =>
																`relative flex items-center w-full text-sm pl-2.5 pr-3 py-2 rounded-lg transition-colors ${isActive ? rowActive : rowIdle}`
															}
														>
															{({ isActive }) => (
																<>
																	{isActive && <ActiveTick />}
																	{sub.label}
																</>
															)}
														</NavLink>
													))}
												</div>
											</div>
										</div>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</aside>
		</>
	)
}
