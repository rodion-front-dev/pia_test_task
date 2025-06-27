import { UsersList } from '@/components/users-list/UsersList'

import s from './UsersPage.module.scss'

export const UsersPage = () => {
  return (
    <div className={s.usersPage}>
      <h1 className={s.usersPageTitle}>Users</h1>
      <UsersList hasSearch />
    </div>
  )
}
