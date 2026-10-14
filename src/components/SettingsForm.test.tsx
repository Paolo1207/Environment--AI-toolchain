import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SettingsForm } from './SettingsForm'

describe('SettingsForm', () => {
  it('shows required-field errors on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByText('Display name is required.')).toBeTruthy()
    expect(screen.getByText('Email is required.')).toBeTruthy()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('rejects an invalid email', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText('Display name'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByText('Enter a valid email address.')).toBeTruthy()
  })

  it('saves when the form is valid', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText('Display name'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Email'), 'ada@example.com')
    await user.type(screen.getByLabelText('Bio'), 'Mathematician.')
    await user.selectOptions(screen.getByLabelText('Timezone'), 'Asia/Singapore')
    await user.click(screen.getByLabelText('Dark'))
    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByRole('status')).toHaveProperty(
      'textContent',
      'Settings saved.',
    )
  })
})
