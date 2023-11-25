import { ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import { BaseHeader } from './base-header'
import { BaseFooter } from './base-footer'

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BaseHeader />
      <Container className="p-4 my-2 bg-white shadow-[0_1px_3px_hsla(0,0%,7%,.1)]">
        {children}
      </Container>
      <BaseFooter />
    </>
  )
}
