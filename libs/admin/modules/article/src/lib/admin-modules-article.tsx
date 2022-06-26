import styles from './admin-modules-article.module.scss'

/* eslint-disable-next-line */
export interface AdminModulesArticleProps {}

export function AdminModulesArticle(props: AdminModulesArticleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminModulesArticle!</h1>
    </div>
  )
}

export default AdminModulesArticle
