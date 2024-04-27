import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  text: string
  type: string
}

export const notify = ({ type, text }: Props): void => {
  switch (type) {
    case 'default':
      toast(text)
      break
    case 'success':
      toast.success(text)
      break
    case 'warning':
      toast.warning(text, { theme: 'dark' })
      break
    case 'error':
      toast.error(text)
      break
    default:
  }
}

function Toast(): JSX.Element {
  const autoClose = 1000
  return (
    <ToastContainer
      position="top-center"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      style={{ fontSize: '1.4rem', fontWeight: '600' }}
    />
  )
}

export default Toast
