import { useState } from 'react'

import { motion } from 'framer-motion'

import { useUsers } from '@/hooks/useUsers'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Loader } from '@/shared/ui'

import s from './UsersList.module.scss'

import { Search } from '../search/Search'
import { UserCard } from '../user-card/UserCard'

export const UsersList = ({
  hasSearch = false,
}: UsersListProps) => {
  const [searchValue, setSearchValue] = useState('')
  const debounceSearchValue = useDebounce(searchValue)

  const { users, isLoading } = useUsers({
    filterValue: debounceSearchValue,
  })

  if (isLoading) return <Loader className={s.loader} />

  return (
    <motion.div
      className={s.usersListWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {hasSearch && (
        <Search
          search={searchValue}
          onChange={setSearchValue}
        />
      )}
      <ul className={s.usersList}>
        {users?.length ? (
          users.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p className={s.noUsers}>No users found</p>
        )}
      </ul>
    </motion.div>
  )
}

interface UsersListProps {
  hasSearch?: boolean
}
