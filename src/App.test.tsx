import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders and increments the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Get started' })).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /count is 0/i }))

    expect(screen.getByRole('button', { name: /count is 1/i })).toBeTruthy()
  })
})
