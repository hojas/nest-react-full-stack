import { ReactNode } from 'react'
import { BaseHeader } from './base-header'
import { BaseFooter } from './base-footer'

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <>
    <BaseHeader />
    <div className="container mx-auto py-10">{children}</div>
    <BaseFooter />
  </>
)
