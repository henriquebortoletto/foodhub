import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { auth } from '@/lib/firebase'

export const createUser = async ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}): Promise<void> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
}

export const loginWithEmail = async ({
  email,
  password,
}: { email: string; password: string }): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const logout = async (): Promise<void> => {
  await signOut(auth)
}
