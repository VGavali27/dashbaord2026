import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Users,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import TrendChart from './TrendChart'

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-3.5 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500"
      />
      <h2 className="text-sm font-medium text-g-900 dark:text-g-100">{children}</h2>
    </div>
  )
}

export function MainContent() {
  const navigate = useNavigate()

  // key = the one figure this screen is about; rendered in indigo.
  // goodWhen = the direction that counts as good for this metric.
  const stats = [
    {
      label: 'Completed · last 7 days',
      value: '86',
      change: '+23',
      trend: 'up',
      goodWhen: 'up',
      key: true,
    },
    {
      label: 'Open tasks',
      value: '1,248',
      change: '-142',
      trend: 'down',
      goodWhen: 'down',
      key: false,
    },
    {
      label: 'Active users',
      value: '2,543',
      change: '+118',
      trend: 'up',
      goodWhen: 'up',
      key: false,
    },
    {
      label: 'Overdue',
      value: '17',
      change: '+5',
      trend: 'up',
      goodWhen: 'down',
      key: false,
    },
  ]

  // Tasks completed per day, ending today. Sums to the 7-day stat above.
  const completions = [
    { label: 'Thu', value: 9 },
    { label: 'Fri', value: 12 },
    { label: 'Sat', value: 6 },
    { label: 'Sun', value: 8 },
    { label: 'Mon', value: 13 },
    { label: 'Tue', value: 15 },
    { label: 'Wed', value: 23 },
  ]

  const recentActivity = [
    {
      id: 1,
      title: 'New user registration',
      description: 'Alex Johnson joined the workspace',
      time: '2 hours ago',
      icon: Users,
    },
    {
      id: 2,
      title: 'Report generated',
      description: 'Q4 sales report has been created',
      time: '4 hours ago',
      icon: FileText,
    },
    {
      id: 3,
      title: 'System update',
      description: 'Database maintenance completed',
      time: '6 hours ago',
      icon: Activity,
    },
    {
      id: 4,
      title: 'Payment received',
      description: 'Invoice #2024-001 payment confirmed',
      time: '1 day ago',
      icon: TrendingUp,
    },
  ]

  const metrics = [
    { label: 'Completion rate', value: 75, key: true },
    { label: 'Performance score', value: 92, key: false },
    { label: 'User satisfaction', value: 88, key: false },
  ]

  const quickActions = [
    { label: 'Create task', to: '/tasks/new' },
    { label: 'My tasks', to: '/tasks/my' },
    { label: 'View settings', to: '/settings/general' },
  ]

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const good = stat.trend === stat.goodWhen
          return (
            <div
              key={stat.label}
              className="reveal bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 p-5"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <p className="text-xs text-g-600 dark:text-g-400">{stat.label}</p>
              <p
                className={`mt-2 text-[1.75rem] leading-none font-medium tabular-nums ${
                  stat.key
                    ? 'text-accent-700 dark:text-accent-500'
                    : 'text-g-900 dark:text-g-50'
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-g-600 dark:text-g-400">
                {stat.trend === 'up' ? (
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className={good ? 'text-positive' : 'text-negative'}
                  />
                ) : (
                  <ArrowDownRight
                    size={12}
                    strokeWidth={1.5}
                    className={good ? 'text-positive' : 'text-negative'}
                  />
                )}
                <span className="tabular-nums">{stat.change}</span>
                <span>vs last week</span>
              </p>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div
        className="reveal grid grid-cols-1 lg:grid-cols-3 gap-4"
        style={{ animationDelay: '160ms' }}
      >
        {/* Trend */}
        <div className="lg:col-span-2 bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 p-5">
          <SectionTitle>Completion trend</SectionTitle>
          <p className="mt-1 text-xs text-g-600 dark:text-g-400">
            Tasks completed per day, last 7 days
          </p>
          <div className="mt-4">
            <TrendChart
              points={completions}
              caption="Tasks completed per day, last 7 days"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-g-500 dark:text-g-500 tabular-nums">
              86 completed in the last 7 days
            </span>
            <span className="flex items-center gap-1.5 text-g-600 dark:text-g-400 tabular-nums">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              23 today
            </span>
          </div>
        </div>

        {/* Side */}
        <div className="space-y-4">
          {/* Metrics */}
          <div className="bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 p-5">
            <SectionTitle>Performance</SectionTitle>
            <div className="mt-4 space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-g-600 dark:text-g-400">
                      {metric.label}
                    </span>
                    <span className="text-sm font-medium tabular-nums text-g-900 dark:text-g-100">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-g-200 dark:bg-g-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        metric.key
                          ? 'bg-accent-600 dark:bg-accent-500'
                          : 'bg-g-500 dark:bg-g-400'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 p-5">
            <SectionTitle>Quick actions</SectionTitle>
            <div className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => navigate(action.to)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-g-700 dark:text-g-300 bg-g-100 dark:bg-g-800 border border-g-200 dark:border-white/10 hover:bg-g-200 dark:hover:bg-g-700 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div
        className="reveal bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 overflow-hidden"
        style={{ animationDelay: '240ms' }}
      >
        <div className="px-5 py-4 border-b border-g-200 dark:border-white/10">
          <SectionTitle>Recent activity</SectionTitle>
          <p className="mt-1 text-xs text-g-600 dark:text-g-400">
            Latest updates from this workspace
          </p>
        </div>

        <div className="divide-y divide-g-200 dark:divide-white/10">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-5 py-4 hover:bg-g-100 dark:hover:bg-g-800 transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-g-100 dark:bg-g-800 flex items-center justify-center flex-shrink-0 text-g-500 dark:text-g-500">
                <activity.icon size={16} strokeWidth={1.5} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-g-900 dark:text-g-100">
                  {activity.title}
                </p>
                <p className="mt-0.5 text-sm text-g-600 dark:text-g-400">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-g-500 dark:text-g-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-g-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => navigate('/reports/audit')}
            className="text-sm font-medium text-g-700 dark:text-g-300 hover:text-g-900 dark:hover:text-g-50 transition-colors"
          >
            View all activity
          </button>
        </div>
      </div>
    </div>
  )
}
