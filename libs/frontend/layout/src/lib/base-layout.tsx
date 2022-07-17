import { ReactNode } from 'react'
import { BaseHeader } from './base-header'
import { BaseFooter } from './base-footer'

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <BaseHeader />
    <div className="container min-h-[calc(100vh_-_208px)] mx-auto mb-[30px] p-[30px]">
      {children}
    </div>
    <BaseFooter />
  </div>
)
