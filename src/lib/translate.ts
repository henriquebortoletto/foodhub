const translate: Record<string, string> = {
  'auth/email-already-in-use': 'Esse email já está em uso.',
}

type Translate = (key: string) => string

export const transformTranslate: Translate = (key) => {
  return translate[key] || key
}
