import { type Dispatch, type SetStateAction, createContext } from 'react'
import { type Info } from '@/pages/Meeting/RegisterMeeting'

export interface RegisterContextType {
  info: Info
  setInfo: Dispatch<SetStateAction<Info>>
}

export const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
)
