'use client'

import {
  type SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
} from 'react'

namespace ThemeProvider {
  export interface Props {
    children: ReactNode
    theme?: string
    setStoredTheme?: (storageKey: string, theme: string) => void
    storedKey?: 'theme'
  }
  export interface Context {
    theme: string
    setTheme: Dispatch<SetStateAction<string>>
  }
}

const themeContext = createContext<ThemeProvider.Context>({
  theme: 'system',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(themeContext)
}

function setCookie(name: string, value: string, days: number) {
  let expires = ''

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

function themePreference(theme: string, previousTheme: string | null) {
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'

  function getThemeWithSystem(theme: string) {
    switch (theme) {
      case 'system':
        return colorPreference
      default:
        return theme
    }
  }
  const currentTheme = getThemeWithSystem(theme)

  const previousThemeWithPreference =
    previousTheme != null ? getThemeWithSystem(previousTheme) : null

  if (previousThemeWithPreference != null) {
    document.documentElement.classList.remove(previousThemeWithPreference)
  }

  document.documentElement.classList.add(currentTheme)
}

export function ThemeProvider({
  children,
  theme: defaultTheme = 'system',
  setStoredTheme = (storageKey, theme) => {
    const date = new Date()
    return setCookie(
      storageKey,
      theme,
      date.setFullYear(date.getFullYear() + 10),
    )
  },
  storedKey = 'theme',
}: ThemeProvider.Props) {
  const [theme, setThemeState] = useState(defaultTheme)
  const ref = useRef<string | null>(theme)

  function setTheme(theme) {
    setStoredTheme(storedKey, theme)
    themePreference(theme, ref.current)
    setThemeState(theme)
    ref.current = theme
  }

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${themePreference.toString()})('${theme}', 'null')`,
        }}
      />

      {children}
    </themeContext.Provider>
  )
}
