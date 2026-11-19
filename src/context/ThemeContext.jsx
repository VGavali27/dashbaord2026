import React, { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext()

// The stacks themselves live in index.css under html[data-font]; these are
// just the choices shown in Settings → General.
export const FONT_FAMILIES = [
	{ value: 'geist', label: 'Geist', hint: 'Geist + Geist Mono', sample: '"Geist", sans-serif' },
	{ value: 'inter', label: 'Inter', hint: 'Inter + JetBrains Mono', sample: '"Inter", sans-serif' },
	{
		value: 'ibm',
		label: 'IBM Plex',
		hint: 'IBM Plex Sans + Mono',
		sample: '"IBM Plex Sans", sans-serif',
	},
]

export const DEFAULT_FONT_FAMILY = 'ibm'

function readTheme() {
	if (typeof window === 'undefined') return false

	const saved = localStorage.getItem('theme')
	if (saved === 'dark') return true
	if (saved === 'light') return false
	return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readFontSize() {
	if (typeof window === 'undefined') return 16

	const saved = parseInt(localStorage.getItem('fontSize'), 10)
	return !Number.isNaN(saved) && saved > 0 ? saved : 16
}

function readFontFamily() {
	if (typeof window === 'undefined') return DEFAULT_FONT_FAMILY

	const saved = localStorage.getItem('fontFamily')
	return FONT_FAMILIES.some((font) => font.value === saved)
		? saved
		: DEFAULT_FONT_FAMILY
}

export function ThemeProvider({ children }) {
	// Read synchronously so the first render already matches the saved settings.
	const [isDark, setIsDark] = useState(readTheme)
	const [fontSize, setFontSize] = useState(readFontSize)
	const [fontFamily, setFontFamily] = useState(readFontFamily)

	// useLayoutEffect runs before paint, so the class flips in the same frame
	// as the toggle. An effect here would show one frame of the old theme.
	useLayoutEffect(() => {
		const root = document.documentElement
		root.classList.toggle('dark', isDark)
		root.style.colorScheme = isDark ? 'dark' : 'light'
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}, [isDark])

	useLayoutEffect(() => {
		const root = document.documentElement
		root.dataset.font = fontFamily
		root.style.fontSize = `${fontSize}px`
		localStorage.setItem('fontSize', String(fontSize))
		localStorage.setItem('fontFamily', fontFamily)
	}, [fontSize, fontFamily])

	const toggleTheme = () => {
		// Freeze transitions for the swap so buttons and rows don't tween their
		// colors one by one while the surfaces snap. Without this the switch
		// looks like a flicker.
		const root = document.documentElement
		root.classList.add('theme-switching')

		setIsDark((current) => !current)

		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				root.classList.remove('theme-switching')
			})
		})
	}

	const changeFontSize = (size) => {
		const parsed = Number(size)
		if (!Number.isNaN(parsed) && parsed > 0) setFontSize(parsed)
	}

	const changeFontFamily = (value) => {
		if (FONT_FAMILIES.some((font) => font.value === value)) setFontFamily(value)
	}

	return (
		<ThemeContext.Provider
			value={{
				isDark,
				toggleTheme,
				fontSize,
				changeFontSize,
				fontFamily,
				changeFontFamily,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}
	return context
}
