import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from './modules/base-layout'
import { AdminDashboard } from './modules/dashboard'
import { AdminUser } from './modules/user'
import { AdminTopic } from './modules/topic'
import { AdminArticle } from './modules/article'
import { AdminComment } from './modules/comment'
import { AdminRole } from './modules/role'

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user" element={<AdminUser />} />
        <Route path="/topic" element={<AdminTopic />} />
        <Route path="/article" element={<AdminArticle />} />
        <Route path="/comment" element={<AdminComment />} />
        <Route path="/role" element={<AdminRole />} />
      </Routes>
    </BaseLayout>
  )
}

export default App
