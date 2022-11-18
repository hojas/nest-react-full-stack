import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from './modules/base-layout'
import { AdminDashboard } from './modules/dashboard'
import { AdminUser } from './modules/user'
import { AdminCategory } from './modules/category'
import { AdminArticle } from './modules/article'
import { AdminComment } from './modules/comment'
import { AdminRole } from './modules/role'

export default () => (
  <BaseLayout>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/user" element={<AdminUser />} />
      <Route path="/category" element={<AdminCategory />} />
      <Route path="/article" element={<AdminArticle />} />
      <Route path="/comment" element={<AdminComment />} />
      <Route path="/role" element={<AdminRole />} />
    </Routes>
  </BaseLayout>
)
