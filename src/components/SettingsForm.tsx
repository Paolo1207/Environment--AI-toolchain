import { useSettingsForm } from '../hooks/useSettingsForm'
import type { ThemePreference } from '../types/settings'

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
] as const

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const fieldClass =
  'mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100'
const invalidClass = 'border-red-500 focus-visible:ring-red-600'

export function SettingsForm() {
  const { values, status, visibleError, handleChange, handleBlur, handleSubmit } =
    useSettingsForm()

  const displayNameError = visibleError('displayName')
  const emailError = visibleError('email')
  const bioError = visibleError('bio')
  const timezoneError = visibleError('timezone')
  const themeError = visibleError('theme')

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 text-left"
      aria-labelledby="settings-heading"
    >
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="nickname"
          required
          maxLength={50}
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={displayNameError ? true : undefined}
          aria-describedby={displayNameError ? 'displayName-error' : undefined}
          className={`${fieldClass} ${displayNameError ? invalidClass : ''}`}
        />
        {displayNameError ? (
          <p id="displayName-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {displayNameError}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'email-error' : undefined}
          className={`${fieldClass} ${emailError ? invalidClass : ''}`}
        />
        {emailError ? (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {emailError}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          maxLength={280}
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={bioError ? 'bio-error bio-hint' : 'bio-hint'}
          aria-invalid={bioError ? true : undefined}
          className={`${fieldClass} resize-y ${bioError ? invalidClass : ''}`}
        />
        <p id="bio-hint" className="mt-1 text-sm text-zinc-500">
          {values.bio.trim().length}/280 characters
        </p>
        {bioError ? (
          <p id="bio-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {bioError}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          required
          value={values.timezone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={timezoneError ? true : undefined}
          aria-describedby={timezoneError ? 'timezone-error' : undefined}
          className={`${fieldClass} ${timezoneError ? invalidClass : ''}`}
        >
          {TIMEZONES.map((zone) => (
            <option key={zone.value} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>
        {timezoneError ? (
          <p id="timezone-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {timezoneError}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Theme</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {THEMES.map((theme) => (
            <label key={theme.value} className="inline-flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200">
              <input
                type="radio"
                name="theme"
                value={theme.value}
                checked={values.theme === theme.value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="size-4 accent-violet-600 outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
              />
              {theme.label}
            </label>
          ))}
        </div>
        {themeError ? (
          <p id="theme-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {themeError}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={values.emailNotifications}
            onChange={handleChange}
            className="size-4 accent-violet-600 outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
          />
          Email me about product updates
        </label>
      </div>

      {status === 'saved' ? (
        <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          Settings saved.
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-violet-800 focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
        >
          Save settings
        </button>
      </div>
    </form>
  )
}
