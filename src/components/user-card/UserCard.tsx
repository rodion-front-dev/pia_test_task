import { Link } from 'react-router-dom'

import { User } from '@/shared/model/users.types'

import s from './UserCard.module.scss'

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <li className={s.userCard}>
      <Link
        to={`/user/${user.id}`}
        className={s.userCardLink}
      >
        <h3 className={s.userCardName}>
          Name: {user.name}
        </h3>
        <p className={s.userCardEmail}>
          Email: {user.email}
        </p>
        <span className={s.userCardCity}>
          City: {user.address.city}
        </span>
      </Link>
    </li>
  )
}

interface UserCardProps {
  user: User
}
