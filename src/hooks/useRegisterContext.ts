import { useContext } from 'react'
import {
  RegisterContext,
  type RegisterContextType,
} from '@/context/RegisterContext'

function useRegisterContext(): RegisterContextType {
  const contextValue = useContext(RegisterContext)

  if (contextValue == null) {
    throw new Error('RegisterContext is not provided.')
  }

  return contextValue
}

export default useRegisterContext
