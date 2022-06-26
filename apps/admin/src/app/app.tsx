import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from '@nx-blog/admin/layout'
import { AdminDashboard } from '@nx-blog/admin/modules/dashboard'
import { AdminUser } from '@nx-blog/admin/modules/user'
import { AdminCategory } from '@nx-blog/admin/modules/category'

export default function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user" element={<AdminUser />} />
        <Route path="/category" element={<AdminCategory />} />
      </Routes>
    </BaseLayout>
  )
}
