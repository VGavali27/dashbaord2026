import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useAuth()

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-g-50 dark:bg-g-900">
				<div
					role="status"
					aria-label="Loading"
					className="animate-spin rounded-full h-8 w-8 border-2 border-g-200 dark:border-white/10 border-b-accent-600 dark:border-b-accent-500"
				/>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return children
}
