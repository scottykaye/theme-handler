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

interface ThemeProviderProps {
  children: ReactNode
  themes: Array<string>
  defaultTheme: string
}

function script(
  attribute = 'class',
  value,
  forcedTheme,
  defaultTheme = 'dark',
  storageKey,
  themes = themes,
) {
  const isClass = attribute === 'class'
  const classes = isClass && value ? themes.map((t) => value[t] || t) : themes

  function setColorScheme(theme: string) {
    document.documentElement.style.colorScheme = theme
  }

  function updateDOM(theme: string) {
    if (isClass) {
      document.documentElement.classList.remove(...classes)
      document.documentElement.classList.add(theme)
    } else {
      document.documentElement.setAttribute(attribute, theme)
    }

    setColorScheme(theme)
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme
      const isSystem = themeName === 'system'
      const theme = isSystem ? getSystemTheme() : themeName

      updateDOM(theme)
    } catch (e) {
      //
    }
  }
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
  console.log({ currentTheme })
  document.documentElement.classList.remove(...themes)
  document.documentElement.classList.add(currentTheme)
  document.documentElement.setAttribute(
    'style',
    `color-scheme: ${currentTheme};`,
  )
  document.documentElement.style.colorScheme = currentTheme
}

export function ThemeProvider({
  children,
  themes = ['system', 'light', 'dark'],
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useLocalStorage(
    typeof window !== 'undefined' && localStorage.getItem('theme'),
    'theme',
  )

  const colorPreference =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
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

  const params = JSON.stringify([theme])

  const scriptArgs = JSON.stringify([
    'class',
    theme,
    undefined,
    theme,
    'theme',
    ['system', 'light', 'dark'],
  ]).slice(1, -1)

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <script
        suppressHydrationWarning
        nonce={typeof window === 'undefined' ? '' : ''}
        dangerouslySetInnerHTML={{
          //__html: `(${themePreference.toString()})(${params})`,
          __html: `(${script.toString()})(${scriptArgs})`,
        }}
      />
      {children}
    </themeContext.Provider>
  )
}

export function useTheme() {
  return useContext(themeContext)
}
