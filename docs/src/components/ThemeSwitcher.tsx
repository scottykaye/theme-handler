'use client'

import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import { useTheme } from 'theming'

function IconButton({ ...props }) {
  return (
    <button
      type="button"
      {...props}
      className="aspect-1 w-8 h-8 inline-flex border border-gray-500 items-center justify-center rounded-full disabled:bg-gray-500"
    />
  )
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1">
      <IconButton
        disabled={theme === 'system'}
        onClick={() => setTheme('system')}
      >
        <DesktopIcon />
      </IconButton>
      <IconButton
        disabled={theme === 'light'}
        onClick={() => {
          setTheme('light')
        }}
      >
        <SunIcon />
      </IconButton>
      <IconButton disabled={theme === 'dark'} onClick={() => setTheme('dark')}>
        <MoonIcon />
      </IconButton>
    </div>
  )
}
