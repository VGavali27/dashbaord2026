import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

const inputClass =
  'w-full px-3 py-2.5 border border-g-200 dark:border-white/10 rounded-lg bg-g-100 dark:bg-g-800 text-sm text-g-900 dark:text-g-100 placeholder-g-500 focus:outline-none focus:ring-2 focus:ring-accent-600/50 focus:border-accent-600 transition-colors'

const labelClass = 'block text-sm font-medium text-g-700 dark:text-g-300 mb-1.5'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username.trim() || !password.trim()) {
      setError('Enter a username and password')
      setLoading(false)
      return
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const success = login(username, password)
      if (success) {
        navigate('/dashboard', { replace: true })
      } else {
        setError('Login failed, please try again')
      }
    } catch (err) {
      setError('Login failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-g-50 dark:bg-g-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <div className="bg-paper dark:bg-g-850 rounded-2xl shadow-sm dark:shadow-none p-8 border border-g-200 dark:border-white/10">
          {/* Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-4 w-[3px] rounded-full bg-accent-600 dark:bg-accent-500"
              />
              <span className="text-lg font-semibold tracking-[-0.01em] text-g-900 dark:text-g-50">
                DashHub
              </span>
            </div>
            <p className="mt-2 text-sm text-g-600 dark:text-g-400">
              Sign in to the operations dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={inputClass}
                disabled={loading}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`${inputClass} pr-10`}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-g-500 hover:text-g-900 dark:hover:text-g-100 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-3 py-2 rounded-lg bg-negative/10 border border-negative/20 text-sm text-negative">
                {error}
              </div>
            )}

            {/* Demo note */}
            <div className="px-3 py-2 rounded-lg bg-g-100 dark:bg-g-800 text-xs text-g-600 dark:text-g-400">
              Demo build. Credentials pre-filled, any username and password works.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-g-900 hover:bg-g-800 dark:bg-g-50 dark:hover:bg-paper text-white dark:text-g-900 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-g-50 dark:focus-visible:ring-offset-g-900"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
