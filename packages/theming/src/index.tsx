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
interface ThemeProviderProps {
  children: ReactNode
  themes: Array<string>
  defaultTheme: string
}

export function useLocalStorage(
  defaultValue: string,
  key: string,
): [string, Dispatch<SetStateAction<string>>] | null {
  const [value, setValue] = useState<string>(defaultValue)

  useEffect(() => {
    const activeValue = localStorage.getItem(key)

    if (activeValue !== null) {
      setValue(activeValue)
    }
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function getThemeWithSystem(theme) {
  const colorPreference =
    isClient && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  switch (theme) {
    case 'system':
      return colorPreference
    case 'light':
      return 'light'
    case 'dark':
    default:
      return 'dark'
  }
}

function themePreference(theme) {
  const currentTheme = getThemeWithSystem(theme)
  document.documentElement.classList.remove('system', 'light', 'dark')
  document.documentElement.classList.add(theme)
}

export function useTheme() {
  return useContext(themeContext)
}

const isClient = typeof window !== 'undefined'

export function ThemeProvider({
  children,
  themes = ['system', 'light', 'dark'],
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || defaultTheme,
  )
  const [theme, setThemeState] = useLocalStorage(currentTheme, 'theme')
  const colorPreference =
    isClient && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  const previousTheme = useRef<string>()

  function setTheme(theme) {
    setThemeState(theme)
    themePreference(theme)
  }

  if (theme !== previousTheme.current) {
    setCurrentTheme(theme)
    setThemeState(theme)
    themePreference(theme)
    previousTheme.current = currentTheme
  }

  const params = JSON.stringify(theme)

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
