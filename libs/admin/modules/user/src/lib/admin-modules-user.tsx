import styles from './admin-modules-user.module.scss'

/* eslint-disable-next-line */
export interface AdminModulesUserProps {}

export function AdminModulesUser(props: AdminModulesUserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminModulesUser!</h1>
    </div>
  )
}

export default AdminModulesUser
