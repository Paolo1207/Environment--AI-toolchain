import { describe, expect, it } from 'vitest'
import type { Settings } from '../types/settings'
import { hasSettingsErrors, validateSettings } from './validateSettings'

const valid: Settings = {
  displayName: 'Ada Lovelace',
  email: 'ada@example.com',
  bio: 'Mathematician.',
  timezone: 'UTC',
  theme: 'system',
  emailNotifications: true,
}

describe('validateSettings', () => {
  it('accepts complete valid settings', () => {
    expect(validateSettings(valid)).toEqual({})
  })

  it('requires a display name of 2–50 characters', () => {
    expect(validateSettings({ ...valid, displayName: '  ' }).displayName).toBe(
      'Display name is required.',
    )
    expect(validateSettings({ ...valid, displayName: 'A' }).displayName).toBe(
      'Display name must be at least 2 characters.',
    )
    expect(
      validateSettings({ ...valid, displayName: 'A'.repeat(51) }).displayName,
    ).toBe('Display name must be at most 50 characters.')
  })

  it('requires a valid email', () => {
    expect(validateSettings({ ...valid, email: '' }).email).toBe(
      'Email is required.',
    )
    expect(validateSettings({ ...valid, email: 'not-an-email' }).email).toBe(
      'Enter a valid email address.',
    )
  })

  it('limits bio length', () => {
    expect(validateSettings({ ...valid, bio: 'x'.repeat(281) }).bio).toBe(
      'Bio must be at most 280 characters.',
    )
  })

  it('requires a timezone', () => {
    expect(validateSettings({ ...valid, timezone: '' }).timezone).toBe(
      'Timezone is required.',
    )
  })

  it('reports whether any errors exist', () => {
    expect(hasSettingsErrors({})).toBe(false)
    expect(hasSettingsErrors({ email: 'Email is required.' })).toBe(true)
  })
})
