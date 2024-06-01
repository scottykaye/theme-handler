import Image from 'next/image'
import { ThemeProvider } from 'theming'
import { ThemeSwitcher } from '../components/ThemeSwitcher'

export default function Home() {
  return (
    <main className="h-full grid place-items-center">
      test page
      <ThemeSwitcher />
    </main>
  )
}
