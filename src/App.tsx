import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Toolkit from './components/Toolkit'
import FeaturedWork from './components/FeaturedWork'
import Contact from './components/Contact'
import { useScrollStack } from './hooks/useScrollStack'
import { LangProvider } from './useLang'
import './App.css'

export default function App() {
  useScrollStack()

  return (
    <LangProvider>
      <Cursor />
      <main>
        <div data-stack style={{ overflow: 'hidden' }}>
          <Hero />
        </div>
        <div data-stack style={{ overflow: 'hidden' }}>
          <About />
        </div>
        <div data-stack style={{ overflow: 'hidden' }}>
          <Toolkit />
        </div>
        <div data-stack style={{ overflow: 'hidden' }}>
          <FeaturedWork />
        </div>
        <Contact />
      </main>
    </LangProvider>
  )
}