import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Code } from 'bright'

export const metadata: Metadata = {
  title:
    'React Theme Handler - A theme provider for React & Next.js applications.',
  description:
    'A theme handler that allows you to easily support multiple themes for React and Next.js',
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
      <div>
        <h1 className="font-bold">React Theme Handler</h1>
        <p className="text-gray-500 mb-10 mt-2">
          A theme switcher for react or nextjs applications
        </p>
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
        <h3 className="mb-2">Usage</h3>
        <p className="text-gray-500 mb-10 mt-2">
          Import the `ThemeProvider` component as a parent to the application
          you want to wrap:
        </p>

        <Code
          className="overflow-x-auto"
          lang="jsx"
        >{`<ThemeProvider>{children}</ThemeProvider>`}</Code>

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

        <h3 className="mt-5 mb-2">Prop options</h3>
        <p className="text-gray-500 mb-5 mt-2">
          Out of the box Theme Handler styles a .light, .dark class and applies
          it to the body of your application.
        </p>
        <p className="text-gray-500 mb-10 mt-2">
          {`<ThemeProvider />`} component props:
        </p>
        <ul className="pl-4 mt-4 mb-10">
          <li className="list-disc mb-2">
            defaultTheme - String - Defaults to `system` and sets `light` or
            `dark` class based on user preference.
          </li>
          <li className="list-disc mb-2">
            themes - {`Array<string>`} - Defaults to `['system', 'light',
            'dark]` but can be any options you want to provide. Whats provided
            as theme names will be the class names set on the body. To take
            advantage of system color preference user must pass `system` as an
            option.
          </li>
        </ul>

        <h3 className="mt-5 mb-2">Future Support</h3>
        <ul className="pl-4 mt-4 mb-10">
          <li className="list-disc mb-2">Multiple themes on a page</li>
          <li className="list-disc mb-2">
            Data attribute instead of class names
          </li>
        </ul>
      </Wrapper>
    </main>
  )
}
