import React, { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext()

const SANS_STACK =
  '"IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
const MONO_STACK = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace'

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

export function ThemeProvider({ children }) {
  // Read synchronously so the first render already matches the saved theme.
  const [isDark, setIsDark] = useState(readTheme)
  const [fontSize, setFontSize] = useState(readFontSize)

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
    root.style.setProperty('--app-font', SANS_STACK)
    root.style.setProperty('--app-mono', MONO_STACK)
    root.style.fontFamily = SANS_STACK
    root.style.fontSize = `${fontSize}px`
    localStorage.setItem('fontSize', String(fontSize))
  }, [fontSize])

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

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        fontSize,
        changeFontSize,
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
