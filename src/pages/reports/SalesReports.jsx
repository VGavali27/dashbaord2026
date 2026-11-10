import React from 'react'
import PageHeader from '@/components/PageHeader'

export default function SalesReports() {
	return (
		<div className="space-y-6">
			<PageHeader title="Sales reports" />
			<div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
				<p className="text-g-600 dark:text-g-400">Sales reports content</p>
			</div>
		</div>
	)
}
