export type Audience = 'kids' | 'teen' | 'adult'
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface Example {
  en: string
  pt: string
  /** Rótulo do contexto/tempo verbal (ex.: "Simple Past", "Past Continuous") */
  tag?: string
}

export interface Form {
  label: string
  value: string
  ipa?: string
}

export interface Card {
  id: string
  moduleId: string
  term: string
  ipa?: string
  pt: string
  /** Classe gramatical / tipo: verbo, substantivo, expressão... */
  pos?: string
  emoji?: string
  forms?: Form[]
  examples: Example[]
  /** Dica do professor: pegadinhas, pronúncia, falsos cognatos */
  tip?: string
  /** Palavra usada para buscar a gravação humana no dicionário online */
  lookup?: string
  /** Registro: informal/gíria/formal */
  register?: 'informal' | 'formal' | 'slang'
}

export interface LessonSection {
  title: string
  body: string
  table?: string[][]
  examples?: Example[]
}

export interface Module {
  id: string
  level: Level
  audiences: Audience[]
  title: string
  subtitle: string
  emoji: string
  category: string
  /** Termo em inglês usado para buscar a foto de capa em bancos livres */
  photo?: string
  lesson: LessonSection[]
  cards: Card[]
}
