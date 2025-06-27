import { Post } from '@/shared/model/post.types'

import s from './UserPost.module.scss'

export const UserPost = ({ post }: UserPostProps) => {
  return (
    <li className={s.userPost}>
      <h3 className={s.userPostTitle}>Title: {post.title}</h3>
      <p className={s.userPostBody}>{post.body}</p>
    </li>
  )
}

interface UserPostProps {
  post: Post
}
