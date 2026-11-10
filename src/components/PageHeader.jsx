import React from 'react'
import { Link } from 'react-router-dom'

const actionVariants = {
	primary:
		'bg-g-900 text-white hover:bg-g-800 dark:bg-g-50 dark:text-g-900 dark:hover:bg-paper',
	secondary:
		'bg-paper dark:bg-g-850 text-g-700 dark:text-g-300 border border-g-200 dark:border-white/10 hover:bg-g-100 dark:hover:bg-g-800',
}

/**
 * Reusable page header.
 *
 * @param {string} title - Page title shown in the <h1>.
 * @param {string} [subtitle] - Optional description under the title.
 * @param {object} [action] - Optional action button.
 * @param {string} action.label - Button text.
 * @param {string} [action.to] - Route to navigate to (renders a <Link>).
 * @param {Function} [action.onClick] - Click handler (renders a <button> when `to` is omitted).
 * @param {React.ComponentType} [action.icon] - Optional lucide icon component.
 * @param {'primary'|'secondary'} [action.variant] - Button style. Defaults to primary.
 * @param {React.ReactNode} [children] - Custom action content rendered before the action button.
 */
export default function PageHeader({ title, subtitle, action, children, className = '' }) {
	const renderAction = () => {
		if (!action) return null

		const { label, to, onClick, icon: Icon, variant = 'primary', type = 'button', ...rest } = action
		const classes = `inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-g-50 dark:focus-visible:ring-offset-g-900 ${
			actionVariants[variant] || actionVariants.primary
		}`

		const content = (
			<>
				{Icon && <Icon size={16} strokeWidth={1.5} />}
				<span>{label}</span>
			</>
		)

		if (to) {
			return (
				<Link to={to} className={classes} {...rest}>
					{content}
				</Link>
			)
		}

		return (
			<button type={type} onClick={onClick} className={classes} {...rest}>
				{content}
			</button>
		)
	}

	const hasActions = action || children

	return (
		<div className={`flex flex-wrap items-center justify-between gap-3 ${className}`.trim()}>
			<div className="min-w-0">
				<h1 className="text-[28px] sm:text-[32px] font-medium leading-[1.15] tracking-[-0.01em] text-g-900 dark:text-g-50">
					{title}
				</h1>
				{subtitle && (
					<p className="mt-1.5 text-sm text-g-600 dark:text-g-400 max-w-2xl">{subtitle}</p>
				)}
			</div>

			{hasActions && (
				<div className="flex items-center gap-2 flex-shrink-0">
					{children}
					{renderAction()}
				</div>
			)}
		</div>
	)
}
