export type ThemePreference = 'light' | 'dark' | 'system'

export type Settings = {
  displayName: string
  email: string
  bio: string
  timezone: string
  theme: ThemePreference
  emailNotifications: boolean
}

export type SettingsField = keyof Settings

export type SettingsErrors = Partial<Record<SettingsField, string>>
