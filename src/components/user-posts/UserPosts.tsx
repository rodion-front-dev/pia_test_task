import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useUserPosts } from '@/hooks/useUserPosts'

import s from './UserPosts.module.scss'

import { UserPost } from '../user-post/UserPost'

export const UserPosts = ({ userId }: UserPostsProps) => {
  const { posts, error } = useUserPosts(userId)

  useEffect(() => {
    if (error) toast.error(error.message as string)
  }, [error])

  return (
    <div className={s.userPosts}>
      <h2>User Posts</h2>
      <ul className={s.userPostsList}>
        {posts?.map(post => (
          <UserPost key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

interface UserPostsProps {
  userId?: string
}
