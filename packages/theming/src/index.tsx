'use client'

import {
  type SetStateAction,
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  type ReactNode,
  type Dispatch,
} from 'react'

const themeContext = createContext<{
  theme: string
  setTheme: (theme?: Array<string>) => void
}>({
  theme: 'system',
  setTheme: () => {},
})

function getStorageValue(key, defaultValue) {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  // getting stored value
  const saved = localStorage.getItem(key)
  const initial = JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

interface ThemeProviderProps {
  children: ReactNode
  themes: Array<string>
  defaultTheme: string
}
function themePreference(theme, themes = ['light', 'dark', 'system']) {
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'

  let currentTheme

  switch (theme) {
    case 'system':
      currentTheme = colorPreference
      break
    case 'light':
      currentTheme = 'light'
      break
    case 'dark':
    default:
      currentTheme = 'dark'
      break
  }
  document.documentElement.classList.remove(...themes)

  document.documentElement.classList.add(currentTheme)
  document.documentElement.setAttribute(
    'style',
    `color-scheme: ${currentTheme};`,
  )
  document.documentElement.style.colorScheme = currentTheme
}

export function useTheme() {
  return useContext(themeContext)
}

export function ThemeProvider({
  children,
  themes = ['system', 'light', 'dark'],
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useLocalStorage(
    localStorage.getItem('theme') || 'system',
    'theme',
  )
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'
  const previousTheme = useRef<string>()

  function setTheme(theme?: Themes) {
    setThemeState(theme)
  }

  useEffect(() => {
    let currentTheme
    switch (theme) {
      case 'system':
        currentTheme = colorPreference
        break
      case 'light':
        currentTheme = 'light'
        break
      case 'dark':
      default:
        currentTheme = 'dark'
        break
    }

    document.documentElement.classList.add(currentTheme)
    document.documentElement.setAttribute(
      'style',
      `color-scheme: ${currentTheme};`,
    )
    // Remove opposite theme class
    if (previousTheme.current && previousTheme.current !== currentTheme) {
      document.documentElement.classList.remove(previousTheme.current)
    }
    previousTheme.current = currentTheme
  }, [theme])
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <script
        suppressHydrationWarning
        nonce={typeof window !== 'undefined' ? '' : ''}
        dangerouslySetInnerHTML={{
          __html: `(${themePreference.toString()})(${params})`,
        }}
      />
      {children}
    </themeContext.Provider>
  )
}
