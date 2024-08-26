import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Code } from 'bright'

export const metadata: Metadata = {
  title:
    'React Theme Handler - A theme provider for Nexts.js & React applications.',
  description:
    'A theme handler that allows you to easily support multiple themes for Next.js & React.',
  authors: [
    {
      name: 'Scotty Kaye',
      url: 'https://scottykaye.com',
    },
  ],
}

Code.theme = {
  dark: 'github-dark',
  light: 'github-light',
  lightSelector: 'html.light',
  darkSelector: 'html.dark',
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <section className="my-5 mx-auto w-full max-w-prose overflow-x-clip">
      {children}
    </section>
  )
}

function Header() {
  return (
    <div className="flex gap-5 justify-between">
      <div className="mb-10">
        <h1 className="font-bold">React Theme Handler</h1>
        <p className="text-gray-500 my-2">
          A theme switcher for Next.js or React applications.
        </p>

        <Button asChild variant="link" className="px-0">
          <Link href="https://github.com/scottykaye/theme-handler">Github</Link>
        </Button>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

function Installation() {
  return (
    <Tabs defaultValue="bun">
      <TabsList>
        <TabsTrigger value="bun">Bun</TabsTrigger>
        <TabsTrigger value="yarn">Yarn</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="npm">npm</TabsTrigger>
      </TabsList>
      <div className="my-10 overflow-x-auto">
        <TabsContent value="bun">
          <Code lang="shell">bun install theme-handler</Code>
        </TabsContent>
        <TabsContent value="yarn">
          <Code lang="shell">yarn add theme-handler</Code>
        </TabsContent>
        <TabsContent value="pnpm">
          <Code lang="shell">pnpm install theme-handler</Code>
        </TabsContent>
        <TabsContent value="npm">
          <Code lang="shell">npm install theme-handler</Code>
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default function Home() {
  return (
    <main className="h-full grid justify-items-center m-5 grid-cols-1">
      <Wrapper>
        <Header />
      </Wrapper>

      <Wrapper>
        <h2 className="mb-2">Installation</h2>
        <Installation />
      </Wrapper>
      <Wrapper>
        <div className="mb-20">
          <h2 className="mb-2">Usage</h2>
          <p className="mb-5">
            Out of the box the ThemeProvider tries to match the theme based on
            the users system preferences.
          </p>
          <p className="mb-5">
            Passing in any value to the `theme` prop wil result in a class name
            added to the html tag of your application to manage your theme.
            Handles any theme name or value and as many theme options you may
            want to provide.
          </p>

          <p className="text-gray-500 mb-10">
            Import the `ThemeProvider` component as a parent to the application
            you want to wrap:
          </p>

          <Code
            className="overflow-x-auto"
            lang="jsx"
          >{`<ThemeProvider>{children}</ThemeProvider>`}</Code>
        </div>
        <div className="mb-20">
          <h3 className="mb-2">Storing a Theme</h3>
          <p className="mb-5">
            By default the Theme Provider will set a cookie for you out of the
            box. All that is required is that the application provides the
            correct theme value to load to support SSR. The application will
            have to manage the cookie and provide it.
          </p>
          <p className="mb-5">Next.js example below:</p>
          <Code
            className="overflow-x-auto"
            lang="jsx"
          >{`export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body>
        <ThemeProvider theme={theme?.value}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</Code>
        </div>

        <div className="mb-20">
          <h3 className="mt-5 mb-2">Optional Theme Toggle</h3>
          <p className="text-gray-500 mb-10 mt-2">
            You can create a theme toggle to allow the user to toggle between
            theme settings.
          </p>
          <Code lang="jsx">{`
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
`}</Code>
        </div>

        <div className="mb-20">
          <h3 className="mt-5 mb-2">Prop options</h3>
          <p className="text-gray-500 mb-5 mt-2">
            Out of the box Theme Handler defaults to the users preference.
            Internally it is referenced as `system`.
          </p>
          <p className="text-gray-500 mb-10 mt-2">
            {`<ThemeProvider />`} component props:
          </p>
          <ul className="pl-4 mt-4 mb-10">
            <li className="list-disc mb-5">
              <Badge>children</Badge> -{' '}
              <Badge variant="secondary">ReactNode</Badge> -{' '}
              <Badge variant="outline">Required</Badge>
              <div className="mt-2">
                The child nodes that are wrapped by the ThemeProvider.
              </div>
            </li>
            <li className="list-disc mb-5">
              <Badge>theme</Badge> - <Badge variant="secondary">string</Badge> -{' '}
              <Badge variant="outline">Optional</Badge>
              <div className="mt-2">
                Default is `system` if you want user preferences to decide
                between a class named `light` or `dark` provide `system`.{' '}
              </div>
            </li>
            <li className="list-disc mb-5">
              <Badge>setStoredTheme</Badge> -{' '}
              <Badge variant="secondary">
                {'(storageKey: string, theme: string) => void'}
              </Badge>{' '}
              - <Badge variant="outline">Optional</Badge>
              <div className="mt-2">
                The callback function that set updates the theme value if
                changed on the client.
              </div>
            </li>
            <li className="list-disc mb-5">
              <Badge>storedKey</Badge> -{' '}
              <Badge variant="secondary">string</Badge> -{' '}
              <Badge variant="outline">Optional</Badge>
              <div className="mt-2">
                The key name of the stored theme value. Defaults to `theme`.
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-20">
          <h4 className="mt-5 mb-2">Future Support</h4>
          <ul className="pl-4 mt-4 mb-10">
            <li className="list-disc mb-2">Multiple themes on a page</li>
            <li className="list-disc mb-2">
              Data attribute option instead of class name
            </li>
          </ul>
        </div>
      </Wrapper>
    </main>
  )
}
