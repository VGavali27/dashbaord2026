import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [desktopCollapsed, setDesktopCollapsed] = useState(false)

	const toggleMobile = () => setMobileOpen((s) => !s)
	const toggleDesktopCollapse = () => setDesktopCollapsed((s) => !s)
	const pageMarginClass = desktopCollapsed ? 'lg:ml-20' : 'lg:ml-64'

	return (
		<div className="bg-g-50 dark:bg-g-900 min-h-screen flex flex-col">
			<Navbar 
				onMobileToggle={toggleMobile} 
				onDesktopToggle={toggleDesktopCollapse} 
				userName="John Doe" 
				userRole="Product Manager" 
			/>

			<div className="flex flex-1">
				<Sidebar 
					mobileOpen={mobileOpen} 
					desktopCollapsed={desktopCollapsed} 
					onMobileToggle={toggleMobile} 
				/>

				<div className={`flex-1 min-w-0 pt-6 px-4 sm:px-6 lg:px-8 pb-12 ${pageMarginClass}`}>
					<div className="max-w-[1440px] mx-auto">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}
