import { type ReactNode } from 'react'
import reactDom from 'react-dom'

interface ModalPortalProps {
  children: ReactNode
}
const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const rootModal = document.getElementById('modal')!
  return reactDom.createPortal(children, rootModal)
}

export default ModalPortal
