import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from '@nx-blog/admin/layout'
import { AdminDashboard } from '@nx-blog/admin/modules/dashboard'
import { AdminUser } from '@nx-blog/admin/modules/user'
import { AdminCategory } from '@nx-blog/admin/modules/category'
import { AdminArticle } from '@nx-blog/admin/modules/article'
import { AdminComment } from '@nx-blog/admin/modules/comment'

export default () => (
  <BaseLayout>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/user" element={<AdminUser />} />
      <Route path="/category" element={<AdminCategory />} />
      <Route path="/article" element={<AdminArticle />} />
      <Route path="/comment" element={<AdminComment />} />
    </Routes>
  </BaseLayout>
)
