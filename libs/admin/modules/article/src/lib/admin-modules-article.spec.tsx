import { render } from '@testing-library/react'

import AdminModulesArticle from './admin-modules-article'

describe('AdminModulesArticle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminModulesArticle />)
    expect(baseElement).toBeTruthy()
  })
})
