'use client'

import {
  type SetStateAction,
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
} from 'react'
import { useLocalStorage } from './localStorage'

namespace ThemeProvider {
  export interface Props {
    children: ReactNode
    themes?: Array<string>
    defaultTheme?: string
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
  try {
    const currentTheme = getThemeWithSystem(theme)
    const previousThemeWithPreference =
      previousTheme != null ? getThemeWithSystem(previousTheme) : null
    if (previousThemeWithPreference != null) {
      document.documentElement.classList.remove(previousThemeWithPreference)
    }

    document.documentElement.classList.add(currentTheme)
  } catch (e) {
    console.log('Error applying theme:', e)
  }
}

export function ThemeProvider({
  children,
  themes = ['system', 'light', 'dark'],
  defaultTheme = 'system',
}: ThemeProvider.Props) {
  const [theme, setTheme] = useLocalStorage(
    localStorage.getItem('theme') ?? defaultTheme,
    'theme',
  )

  const ref = useRef<string | null>(null)

  useEffect(() => {
    themePreference(theme, ref.current)
    setTheme(theme)
    ref.current = theme
  }, [theme])

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${themePreference.toString()})('${theme}', ${JSON.stringify(themes)})`,
        }}
      />

      {children}
    </themeContext.Provider>
  )
}
