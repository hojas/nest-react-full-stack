import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from '@nx-blog/admin/layout'
import { AdminUser } from '@nx-blog/admin/modules/user'

export function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/user" element={<AdminUser />} />
      </Routes>
    </BaseLayout>
  )
}

export default App
