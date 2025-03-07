const translate: Record<string, string> = {
  'auth/email-already-in-use': 'Esse email já está em uso.',
  'auth/invalid-credential': 'Email ou senha inválidos.',
}

type Translate = (key: string) => string

export const transformTranslate: Translate = (key) => {
  return translate[key] || key
}
