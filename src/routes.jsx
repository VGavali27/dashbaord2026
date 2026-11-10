import {
  Home,
  LayoutGrid,
  Users,
  FileText,
  Database,
  Shield,
  Settings as SettingsIcon,
  ArrowRight,
  ListTodo,
} from 'lucide-react'

export const appRoutes = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: ListTodo,
    submenu: [
      { label: 'My Tasks', path: '/tasks/my', icon: ArrowRight },
      { label: 'All tasks', path: '/tasks/all', icon: ArrowRight },
    ],
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: LayoutGrid,
    submenu: [
      { label: 'Overview', path: '/analytics/overview', icon: ArrowRight },
      { label: 'Revenue', path: '/analytics/revenue', icon: ArrowRight },
      { label: 'Traffic', path: '/analytics/traffic', icon: ArrowRight },
      { label: 'Conversion', path: '/analytics/conversion', icon: ArrowRight },
    ],
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
    submenu: [
      { label: 'All Users', path: '/users/all', icon: ArrowRight },
      { label: 'Active users', path: '/users/active', icon: ArrowRight },
      { label: 'Roles & permissions', path: '/users/roles', icon: ArrowRight },
      { label: 'Teams', path: '/users/teams', icon: ArrowRight },
    ],
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: FileText,
    submenu: [
      { label: 'Sales Reports', path: '/reports/sales', icon: ArrowRight },
      { label: 'Performance', path: '/reports/performance', icon: ArrowRight },
      { label: 'Audit Logs', path: '/reports/audit', icon: ArrowRight },
      { label: 'Export', path: '/reports/export', icon: ArrowRight },
    ],
  },
  {
    label: 'Data',
    path: '/data',
    icon: Database,
    submenu: [
      { label: 'Databases', path: '/data/databases', icon: ArrowRight },
      { label: 'Backups', path: '/data/backups', icon: ArrowRight },
      { label: 'Sync Status', path: '/data/sync', icon: ArrowRight },
    ],
  },
  {
    label: 'Security',
    path: '/security',
    icon: Shield,
    submenu: [
      { label: 'Access Control', path: '/security/access', icon: ArrowRight },
      { label: 'API Keys', path: '/security/keys', icon: ArrowRight },
      { label: 'Audit Trail', path: '/security/audit', icon: ArrowRight },
    ],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
    submenu: [
      { label: 'General', path: '/settings/general', icon: ArrowRight },
    ],
  },
]
