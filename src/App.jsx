import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { useAppRoutes } from './routes/index'

function AppContent() {
	const routes = useAppRoutes()
	return routes
}

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
					<AppContent />
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
