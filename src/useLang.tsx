import { createContext, useContext, useEffect, useState, ReactNode, JSX } from 'react'
import { Lang, translations, Translations } from './i18n'

interface LangContextValue {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'portfolio-lang'

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'es') return stored
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }): JSX.Element {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  const toggle = () => setLang(l => l === 'en' ? 'es' : 'en')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', translations[lang].meta.description)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
