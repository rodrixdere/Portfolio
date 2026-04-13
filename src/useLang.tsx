import { createContext, useContext, useState, ReactNode, JSX } from 'react'
import { Lang, translations, Translations } from './i18n'

interface LangContextValue {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }): JSX.Element {
  const [lang, setLang] = useState<Lang>('en')

  const toggle = () => setLang(l => l === 'en' ? 'es' : 'en')

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