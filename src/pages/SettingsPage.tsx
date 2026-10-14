import { SettingsForm } from '../components/SettingsForm'

export function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6">
      <h1 id="settings-heading" className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Settings
      </h1>
      <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-400">
        Update your profile and preferences. Required fields are marked in the
        form and validated before save.
      </p>
      <SettingsForm />
    </main>
  )
}
