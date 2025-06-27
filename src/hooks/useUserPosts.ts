import { useQuery } from '@/shared/api/lib/useQuery'
import { Post } from '@/shared/model/post.types'


export const useUserPosts = (userId: string | undefined) => {
  const { data: posts, isLoading, isError, error } =
    useQuery<Post[]>('/posts', {
      id: 'posts',
      params: {
        userId: userId ?? '',
      },
    })

  return { posts, isLoading, isError, error }
}