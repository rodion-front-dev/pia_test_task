import { ToastContainer } from 'react-toastify'

export const ToastContainerBase = () => {
  return (
    <ToastContainer
      position={'top-center'}
      autoClose={5000}
      closeOnClick
    />
  )
}
