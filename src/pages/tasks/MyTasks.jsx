import React from 'react'
import PageHeader from '@/components/PageHeader'
import { ListTodo } from 'lucide-react'

export default function MyTasks() {
	return (
		<div className="space-y-6">
			<PageHeader
				title="My tasks"
				action={{ label: 'All tasks', to: '/tasks/all', icon: ListTodo, variant: 'secondary' }}
			/>
			<div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
				<p className="text-g-600 dark:text-g-400">Tasks assigned to you will appear here.</p>
			</div>
		</div>
	)
}
