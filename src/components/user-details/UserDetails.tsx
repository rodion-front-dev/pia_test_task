import { useParams } from 'react-router-dom'

import { motion } from 'framer-motion'

import { useUserPosts } from '@/hooks/useUserPosts'
import { useUsers } from '@/hooks/useUsers'
import { Loader } from '@/shared/ui'

import s from './UserDetails.module.scss'

import { UserPosts } from '../user-posts/UserPosts'

export const UserDetails = () => {
  const { userId } = useParams()

  const { users, isLoading: isUsersLoading } = useUsers()
  const { isLoading: isPostsLoading } = useUserPosts(userId)

  if (isUsersLoading || isPostsLoading || !users) {
    return <Loader />
  }

  const user = users[Number(userId) - 1]

  return (
    <motion.div
      className={s.userDetailsWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={s.userDetails}>
        <div className={s.userDetailsMainInfo}>
          <h1>{user?.name}</h1>
          <p>{user?.username}</p>
          <p>{user?.website}</p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>

        <div className={s.userDetailsAddress}>
          <h2>Address</h2>
          {Object.entries(user.address).map(
            ([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                :{' '}
                {typeof value === 'object'
                  ? JSON.stringify(value)
                  : value}
              </p>
            )
          )}
        </div>

        <div className={s.userDetailsCompany}>
          <h2>Company</h2>
          {Object.entries(user.company).map(
            ([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                : {value}
              </p>
            )
          )}
        </div>
      </div>

      <UserPosts userId={userId} />
    </motion.div>
  )
}

// interface UserDetailsProps {
// }
