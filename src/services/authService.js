import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log('Sign-out successful.')
  } catch (error) {
    console.error('Sign-out error:', error)
    throw error
  }
}

export const getCurrentUser = () => {
  return auth.currentUser
}
