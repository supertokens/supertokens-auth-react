import { render } from '@redwoodjs/testing'

import AuthPage from './AuthPage'

describe('AuthPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthPage />)
    }).not.toThrow()
  })
})
