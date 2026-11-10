import { useRoutes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { DashboardLayout } from '../components/DashboardLayout'
import Login from '../pages/Login'

// Pages
import DashboardPage from '../pages/DashboardPage'
import AnalyticsPage from '../pages/AnalyticsPage'
import UsersPage from '../pages/UsersPage'
import ReportsPage from '../pages/ReportsPage'
import DataPage from '../pages/DataPage'
import SecurityPage from '../pages/SecurityPage'
import TasksPage from '../pages/TasksPage'

// Tasks Pages
import MyTasks from '../pages/tasks/MyTasks'
import AllTasks from '../pages/tasks/AllTasks'
import AddTask from '../pages/tasks/AddTask'

// Analytics Pages
import Overview from '../pages/analytics/Overview'
import Revenue from '../pages/analytics/Revenue'
import Traffic from '../pages/analytics/Traffic'
import Conversion from '../pages/analytics/Conversion'

// Users Pages
import AllUsers from '../pages/users/AllUsers'
import ActiveUsers from '../pages/users/ActiveUsers'
import Roles from '../pages/users/Roles'
import Teams from '../pages/users/Teams'

// Reports Pages
import SalesReports from '../pages/reports/SalesReports'
import Performance from '../pages/reports/Performance'
import AuditLogs from '../pages/reports/AuditLogs'
import Export from '../pages/reports/Export'

// Data Pages
import Databases from '../pages/data/Databases'
import Backups from '../pages/data/Backups'
import SyncStatus from '../pages/data/SyncStatus'

// Security Pages
import AccessControl from '../pages/security/AccessControl'
import ApiKeys from '../pages/security/ApiKeys'
import AuditTrail from '../pages/security/AuditTrail'

// Settings
import GeneralSettings from '../pages/Settings/GeneralSettings'

export function useAppRoutes() {
	return useRoutes([
		// Public routes
		{ path: '/login', element: <Login /> },
		{ path: '/', element: <Login /> },

		// Protected routes with layout
		{
			element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
			children: [
				{ path: '/dashboard', element: <DashboardPage /> },

				// Tasks routes
				{ path: '/tasks', element: <TasksPage /> },
				{ path: '/tasks/my', element: <MyTasks /> },
				{ path: '/tasks/all', element: <AllTasks /> },
				{ path: '/tasks/new', element: <AddTask /> },

				// Analytics routes
				{ path: '/analytics', element: <AnalyticsPage /> },
				{ path: '/analytics/overview', element: <Overview /> },
				{ path: '/analytics/revenue', element: <Revenue /> },
				{ path: '/analytics/traffic', element: <Traffic /> },
				{ path: '/analytics/conversion', element: <Conversion /> },

				// Users routes
				{ path: '/users', element: <UsersPage /> },
				{ path: '/users/all', element: <AllUsers /> },
				{ path: '/users/active', element: <ActiveUsers /> },
				{ path: '/users/roles', element: <Roles /> },
				{ path: '/users/teams', element: <Teams /> },

				// Reports routes
				{ path: '/reports', element: <ReportsPage /> },
				{ path: '/reports/sales', element: <SalesReports /> },
				{ path: '/reports/performance', element: <Performance /> },
				{ path: '/reports/audit', element: <AuditLogs /> },
				{ path: '/reports/export', element: <Export /> },

				// Data routes
				{ path: '/data', element: <DataPage /> },
				{ path: '/data/databases', element: <Databases /> },
				{ path: '/data/backups', element: <Backups /> },
				{ path: '/data/sync', element: <SyncStatus /> },

				// Security routes
				{ path: '/security', element: <SecurityPage /> },
				{ path: '/security/access', element: <AccessControl /> },
				{ path: '/security/keys', element: <ApiKeys /> },
				{ path: '/security/audit', element: <AuditTrail /> },

				// Settings routes
				{ path: '/settings/general', element: <GeneralSettings /> },

				// Catch all inside protected area
				{ path: '*', element: <DashboardPage /> },
			],
		},

		// Catch all
		{ path: '*', element: <Login /> },
	])
}
