import { useContext } from 'react'
import { AppProgressContext, type AppProgressValue } from './appProgressContext'

export function useAppProgress(): AppProgressValue {
  const ctx = useContext(AppProgressContext)
  if (!ctx) {
    throw new Error('useAppProgress must be used within AppProgressProvider')
  }
  return ctx
}
