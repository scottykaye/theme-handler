'use client'
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'

export function useLocalStorage(
  defaultValue: string,
  key: string,
): [string, Dispatch<SetStateAction<string>>] | null {
  const [value, setValue] = useState<string>(defaultValue)

  useEffect(() => {
    const activeValue = localStorage.getItem(key)

    if (activeValue !== null) {
      setValue(activeValue)
    }
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
