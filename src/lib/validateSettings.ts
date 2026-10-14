import type { Settings, SettingsErrors } from '../types/settings'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DISPLAY_NAME_MIN = 2
const DISPLAY_NAME_MAX = 50
const BIO_MAX = 280

const THEMES = new Set(['light', 'dark', 'system'])

export function validateSettings(values: Settings): SettingsErrors {
  const errors: SettingsErrors = {}
  const displayName = values.displayName.trim()
  const email = values.email.trim()
  const bio = values.bio.trim()

  if (!displayName) {
    errors.displayName = 'Display name is required.'
  } else if (displayName.length < DISPLAY_NAME_MIN) {
    errors.displayName = `Display name must be at least ${DISPLAY_NAME_MIN} characters.`
  } else if (displayName.length > DISPLAY_NAME_MAX) {
    errors.displayName = `Display name must be at most ${DISPLAY_NAME_MAX} characters.`
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (bio.length > BIO_MAX) {
    errors.bio = `Bio must be at most ${BIO_MAX} characters.`
  }

  if (!values.timezone.trim()) {
    errors.timezone = 'Timezone is required.'
  }

  if (!THEMES.has(values.theme)) {
    errors.theme = 'Choose a theme.'
  }

  return errors
}

export function hasSettingsErrors(errors: SettingsErrors): boolean {
  return Object.keys(errors).length > 0
}
