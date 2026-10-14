import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders the settings page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Save settings' })).toBeTruthy()
  })
})
