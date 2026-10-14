import { useState, type ChangeEvent, type FormEvent } from 'react'
import { hasSettingsErrors, validateSettings } from '../lib/validateSettings'
import type { Settings, SettingsErrors, SettingsField } from '../types/settings'

export const defaultSettings: Settings = {
  displayName: '',
  email: '',
  bio: '',
  timezone: 'UTC',
  theme: 'system',
  emailNotifications: true,
}

const allFields: SettingsField[] = [
  'displayName',
  'email',
  'bio',
  'timezone',
  'theme',
  'emailNotifications',
]

type Touched = Partial<Record<SettingsField, boolean>>

export type SettingsFormStatus = 'idle' | 'saved'

export function useSettingsForm(initial: Settings = defaultSettings) {
  const [values, setValues] = useState<Settings>(initial)
  const [errors, setErrors] = useState<SettingsErrors>({})
  const [touched, setTouched] = useState<Touched>({})
  const [status, setStatus] = useState<SettingsFormStatus>('idle')
  const [submitAttempted, setSubmitAttempted] = useState(false)

  function updateField<K extends SettingsField>(field: K, value: Settings[K]) {
    const next = { ...values, [field]: value }
    setValues(next)
    setStatus('idle')
    if (submitAttempted || touched[field]) {
      setErrors(validateSettings(next))
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, type } = event.target
    const field = name as SettingsField

    if (type === 'checkbox' && event.target instanceof HTMLInputElement) {
      updateField('emailNotifications', event.target.checked)
      return
    }

    updateField(field, event.target.value as Settings[typeof field])
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as SettingsField
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validateSettings(values))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitAttempted(true)
    setTouched(Object.fromEntries(allFields.map((field) => [field, true])))
    const nextErrors = validateSettings(values)
    setErrors(nextErrors)

    if (hasSettingsErrors(nextErrors)) {
      const firstInvalid = allFields.find((field) => nextErrors[field])
      if (firstInvalid) {
        const control = event.currentTarget.elements.namedItem(firstInvalid)
        if (control instanceof HTMLElement) {
          control.focus()
        }
      }
      setStatus('idle')
      return
    }

    setStatus('saved')
  }

  function visibleError(field: SettingsField): string | undefined {
    if (!submitAttempted && !touched[field]) {
      return undefined
    }
    return errors[field]
  }

  return {
    values,
    status,
    visibleError,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
