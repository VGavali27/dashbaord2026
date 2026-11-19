import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SwalModal from '@/components/ui/SwalModal'
import { Plus, X } from 'lucide-react'

const inputBase =
	'w-full h-11 px-3 rounded-lg bg-g-100 dark:bg-g-800 text-sm text-g-900 dark:text-g-100 placeholder-g-500 focus:outline-none disabled:opacity-60 transition-colors [color-scheme:light] dark:[color-scheme:dark]'

const textareaBase =
	'w-full px-3 py-2.5 rounded-lg bg-g-100 dark:bg-g-800 text-sm text-g-900 dark:text-g-100 placeholder-g-500 focus:outline-none disabled:opacity-60 transition-colors [color-scheme:light] dark:[color-scheme:dark]'

const labelClass = 'block text-sm font-medium text-g-700 dark:text-g-300 mb-1.5'

const priorityOptions = ['Low', 'Medium', 'High', 'Urgent']
const statusOptions = ['To Do', 'In Progress', 'Completed']
const statusDotClass = {
	'To Do': 'bg-g-400 dark:bg-g-500',
	'In Progress': 'bg-warning',
	Completed: 'bg-positive',
}

function SectionLabel({ label }) {
	return (
		<div className="flex items-center gap-2">
			<span aria-hidden="true" className="h-3.5 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500" />
			<h2 className="text-sm font-medium text-g-900 dark:text-g-100">{label}</h2>
		</div>
	)
}

function SegmentedControl({ labelledBy, name, value, options, onChange, disabled, dots }) {
	return (
		<div
			role="group"
			aria-labelledby={labelledBy}
			className="flex gap-1 p-1 rounded-lg border border-g-200 dark:border-white/10 bg-g-50 dark:bg-g-900/50"
		>
			{options.map((option) => {
				const selected = value === option
				return (
					<button
						key={option}
						type="button"
						aria-pressed={selected}
						disabled={disabled}
						onClick={() => onChange(name, option)}
						className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 h-[34px] rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 disabled:opacity-60 disabled:cursor-not-allowed ${
							selected
								? 'bg-g-200 dark:bg-g-700 text-g-900 dark:text-g-100 font-medium shadow-sm'
								: 'text-g-600 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800'
						}`}
					>
						{dots && (
							<span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dots[option]}`} />
						)}
						<span>{option}</span>
					</button>
				)
			})}
		</div>
	)
}

const initialForm = {
	title: '',
	description: '',
	assignee: '',
	priority: 'Medium',
	status: 'To Do',
	dueDate: '',
}

export default function AddTask() {
	const navigate = useNavigate()
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})
	const [saving, setSaving] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }))
		}
	}

	const handleSegmentChange = (name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }))
	}

	const fieldClass = (name, base = inputBase) =>
		errors[name]
			? `${base} border border-negative/60 focus:border-negative focus:ring-2 focus:ring-negative/40`
			: `${base} border border-g-200 dark:border-white/10 focus:border-accent-600 focus:ring-2 focus:ring-accent-600/50`

	const validate = () => {
		const next = {}
		if (!form.title.trim()) next.title = 'Task title is required'
		if (!form.dueDate) next.dueDate = 'Due date is required'
		return next
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const nextErrors = validate()
		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors)
			return
		}

		setSaving(true)
		try {
			SwalModal.showLoading('Creating task...')

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 800))

			SwalModal.close()

			await SwalModal({
				icon: 'success',
				title: 'Task created',
				text: `"${form.title.trim()}" has been added.`,
				showCancelButton: false,
				confirmButtonText: 'OK',
			})

			navigate('/tasks/all')
		} catch (err) {
			SwalModal.close()
			await SwalModal({
				icon: 'error',
				title: 'Error',
				text: err.message || 'Something went wrong, please try again',
				showCancelButton: false,
				confirmButtonText: 'OK',
			})
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className="space-y-6">
			<PageHeader title="Add task" subtitle="Create a task and assign it to your team" />

			<form
				onSubmit={handleSubmit}
				className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10"
			>
				{/* Details */}
				<section>
					<SectionLabel label="Details" />
					<div className="mt-4 space-y-4">
						<div>
							<label htmlFor="title" className={labelClass}>
								Task title <span className="text-negative">*</span>
							</label>
							<input
								id="title"
								name="title"
								type="text"
								value={form.title}
								onChange={handleChange}
								placeholder="Prepare Q4 sales report"
								disabled={saving}
								aria-invalid={!!errors.title}
								aria-describedby={errors.title ? 'title-error' : undefined}
								className={fieldClass('title')}
							/>
							{errors.title && (
								<p id="title-error" role="alert" className="mt-1 text-sm text-negative">
									{errors.title}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="description" className={labelClass}>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows={4}
								value={form.description}
								onChange={handleChange}
								placeholder="Include context, links, or acceptance criteria"
								disabled={saving}
								className={fieldClass('description', textareaBase)}
							/>
						</div>
					</div>
				</section>

				{/* Assignment */}
				<section className="mt-8">
					<SectionLabel label="Assignment" />
					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="assignee" className={labelClass}>
								Assignee
							</label>
							<input
								id="assignee"
								name="assignee"
								type="text"
								value={form.assignee}
								onChange={handleChange}
								placeholder="John Doe"
								disabled={saving}
								className={fieldClass('assignee')}
							/>
						</div>

						<div>
							<label htmlFor="dueDate" className={labelClass}>
								Due date <span className="text-negative">*</span>
							</label>
							<input
								id="dueDate"
								name="dueDate"
								type="date"
								value={form.dueDate}
								onChange={handleChange}
								disabled={saving}
								aria-invalid={!!errors.dueDate}
								aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
								className={fieldClass('dueDate')}
							/>
							{errors.dueDate && (
								<p id="dueDate-error" role="alert" className="mt-1 text-sm text-negative">
									{errors.dueDate}
								</p>
							)}
						</div>
					</div>
				</section>

				{/* Workflow */}
				<section className="mt-8">
					<SectionLabel label="Workflow" />
					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<span id="priority-label" className={labelClass}>
								Priority
							</span>
							<SegmentedControl
								labelledBy="priority-label"
								name="priority"
								value={form.priority}
								options={priorityOptions}
								onChange={handleSegmentChange}
								disabled={saving}
							/>
						</div>

						<div>
							<span id="status-label" className={labelClass}>
								Status
							</span>
							<SegmentedControl
								labelledBy="status-label"
								name="status"
								value={form.status}
								options={statusOptions}
								onChange={handleSegmentChange}
								disabled={saving}
								dots={statusDotClass}
							/>
						</div>
					</div>
				</section>

				{/* Actions */}
				<div className="mt-8 pt-4 border-t border-g-200 dark:border-white/10 flex justify-end gap-3">
					<button
						type="button"
						onClick={() => navigate('/tasks/all')}
						disabled={saving}
						className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-g-200 dark:border-white/10 bg-paper dark:bg-g-850 text-g-700 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800 transition-colors disabled:opacity-60"
					>
						<X size={16} strokeWidth={1.5} />
						Cancel
					</button>
					<button
						type="submit"
						disabled={saving}
						className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-g-900 text-white hover:bg-g-800 dark:bg-g-50 dark:text-g-900 dark:hover:bg-g-50/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-g-50 dark:focus-visible:ring-offset-g-900"
					>
						<Plus size={16} strokeWidth={1.5} />
						{saving ? 'Creating...' : 'Create task'}
					</button>
				</div>
			</form>
		</div>
	)
}
