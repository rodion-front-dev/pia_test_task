import { useQuery } from '@/shared/api/lib/useQuery'
import { useFilteredData } from '@/shared/lib/hooks'
import { User } from '@/shared/model/users.types'

interface UseUsersOptions {
  filterValue?: string
}

export const useUsers = ({ filterValue }: UseUsersOptions = {}) => {
  const { data: users, isLoading, isError, error } =
    useQuery<User[]>('/users', {
      id: 'users',
    })


  const filteredUsers = useFilteredData<User>({
    data: users,
    filterValue: filterValue ?? 'all',
    filterKeys: ['name', 'email', 'address.city'],
  })

  if (filterValue) {
    return {
      users: filteredUsers,
      isLoading,
      isError,
      error
    }
  }

  return { users, isLoading, isError, error }
}