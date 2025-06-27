import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { UserDetailPage } from '@/pages/user-detail/UserDetailPage'
import { UsersPage } from '@/pages/users/UsersPage'

import '@/shared/styles/global.scss'

import { ToastContainerBase } from './providers/ToastContainerBase'

export const App = () => {
  return (
    <BrowserRouter>
      <div className={'app'}>
        <Routes>
          <Route path={'/'} element={<UsersPage />} />
          <Route
            path={'/user/:userId'}
            element={<UserDetailPage />}
          />
        </Routes>
        <ToastContainerBase />
      </div>
    </BrowserRouter>
  )
}
