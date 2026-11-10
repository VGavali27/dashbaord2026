import React from 'react'
import PageHeader from '@/components/PageHeader'
import { MainContent } from '@/components/MainContent'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<PageHeader
				title="Dashboard"
				subtitle="Tasks, users and data health for this week"
				action={{ label: 'Create task', to: '/tasks/new', icon: Plus }}
			/>
			<MainContent />
		</div>
	)
}
