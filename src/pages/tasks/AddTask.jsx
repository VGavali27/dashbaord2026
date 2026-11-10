import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SwalModal from '@/components/ui/SwalModal'
import { Plus, X } from 'lucide-react'

const inputClass =
	'w-full px-3 py-2.5 border border-g-200 dark:border-white/10 rounded-lg bg-g-100 dark:bg-g-800 text-sm text-g-900 dark:text-g-100 placeholder-g-500 focus:outline-none focus:ring-2 focus:ring-accent-600/50 focus:border-accent-600 disabled:opacity-60 transition-colors [color-scheme:light] dark:[color-scheme:dark]'

const labelClass = 'block text-sm font-medium text-g-700 dark:text-g-300 mb-1.5'

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
				className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10 space-y-5"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Title */}
					<div className="md:col-span-2">
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
							className={inputClass}
						/>
						{errors.title && <p className="mt-1 text-sm text-negative">{errors.title}</p>}
					</div>

					{/* Description */}
					<div className="md:col-span-2">
						<label htmlFor="description" className={labelClass}>
							Description
						</label>
						<textarea
							id="description"
							name="description"
							rows={4}
							value={form.description}
							onChange={handleChange}
							placeholder="Add details about this task"
							disabled={saving}
							className={inputClass}
						/>
					</div>

					{/* Assignee */}
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
							className={inputClass}
						/>
					</div>

					{/* Due date */}
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
							className={inputClass}
						/>
						{errors.dueDate && <p className="mt-1 text-sm text-negative">{errors.dueDate}</p>}
					</div>

					{/* Priority */}
					<div>
						<label htmlFor="priority" className={labelClass}>
							Priority
						</label>
						<select
							id="priority"
							name="priority"
							value={form.priority}
							onChange={handleChange}
							disabled={saving}
							className={inputClass}
						>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
							<option value="Urgent">Urgent</option>
						</select>
					</div>

					{/* Status */}
					<div>
						<label htmlFor="status" className={labelClass}>
							Status
						</label>
						<select
							id="status"
							name="status"
							value={form.status}
							onChange={handleChange}
							disabled={saving}
							className={inputClass}
						>
							<option value="To Do">To Do</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-3 pt-4 border-t border-g-200 dark:border-white/10">
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
						className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-g-900 text-white hover:bg-g-800 dark:bg-g-50 dark:text-g-900 dark:hover:bg-paper transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-g-50 dark:focus-visible:ring-offset-g-900"
					>
						<Plus size={16} strokeWidth={1.5} />
						{saving ? 'Creating...' : 'Create task'}
					</button>
				</div>
			</form>
		</div>
	)
}
