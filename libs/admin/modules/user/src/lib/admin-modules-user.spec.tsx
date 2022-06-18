import { render } from '@testing-library/react'

import AdminModulesUser from './admin-modules-user'

describe('AdminModulesUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminModulesUser />)
    expect(baseElement).toBeTruthy()
  })
})
