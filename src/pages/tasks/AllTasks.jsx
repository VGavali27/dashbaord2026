import React from 'react'
import PageHeader from '@/components/PageHeader'
import { Plus } from 'lucide-react'

export default function AllTasks() {
	return (
		<div className="space-y-6">
			<PageHeader
				title="All tasks"
				action={{ label: 'Add task', to: '/tasks/new', icon: Plus }}
			/>
			<div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
				<p className="text-g-600 dark:text-g-400">All tasks across the team will appear here.</p>
			</div>
		</div>
	)
}
