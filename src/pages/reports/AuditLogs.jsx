import React from 'react'
import PageHeader from '@/components/PageHeader'

export default function AuditLogs() {
	return (
		<div className="space-y-6">
			<PageHeader title="Audit logs" />
			<div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
				<p className="text-g-600 dark:text-g-400">Audit logs content</p>
			</div>
		</div>
	)
}
