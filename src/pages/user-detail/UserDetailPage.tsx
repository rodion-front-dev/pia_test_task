import { Link } from 'react-router-dom'

import { UserDetails } from '@/components/user-details/UserDetails'

import s from './UserDetailPage.module.scss'

export const UserDetailPage = () => {
  return (
    <div className={s.userDetailPage}>
      <div className={s.userDetailPageHeader}>
        <h1 className={s.userDetailPageTitle}>
          User Detail
        </h1>
        <Link
          to={'/'}
          className={s.userDetailPageBackLink}
        >
          Back
        </Link>
      </div>

      <UserDetails />
    </div>
  )
}
