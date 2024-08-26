# Theme Handler

### A React Theme Handler

A theme switcher for Next.js or React applications.

## View Docs

- [https://theme-handler-docs.vercel.app/](https://theme-handler-docs.vercel.app/)

### Installation

```sh
bun install theme-handler
```

```sh
yarn add theme-handler
```

```sh
pnpm install theme-handler
```

```sh
npm install theme-handler
```

### Usage

Out of the box the ThemeProvider tries to match the theme based on the users
system preferences.

Passing in any value to the `theme` prop wil result in a class name added to the
html tag of your application to manage your theme. Handles any theme name or
value and as many theme options you may want to provide.

Import the `ThemeProvider` component as a parent to the application you want to
wrap:

```jsx
<ThemeProvider>{children}</ThemeProvider>
```

### Storing a Theme

By default the Theme Provider will set a cookie for you out of the box. All that
is required is that the application provides the correct theme value to load to
support SSR. The application will have to manage the cookie and provide it.

Next.js example below:

```jsx
export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body>
        <ThemeProvider theme={theme?.value ?? 'system'}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Optional Theme Toggle

You can create a theme toggle to allow the user to toggle between theme
settings.

```jsx
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
```

### Prop options

Out of the box Theme Handler defaults to the users preference. Internally it is
referenced as `system`.

<ThemeProvider /> component props:

- children - ReactNode - Required The child nodes that are wrapped by the
  ThemeProvider.
- theme - string - Optional Default is `system` if you want user preferences to
  decide between a class named `light` or `dark` provide `system`.
- setStoredTheme - (storageKey: string, theme: string) => void - Optional The
  callback function that set updates the theme value if changed on the client.
- storedKey - string - Optional The key name of the stored theme value. Defaults
  to `theme`.

#### Future Support

- Multiple themes on a page
- Data attribute option instead of class name
