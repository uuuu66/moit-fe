import { type AllHTMLAttributes, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  suffixElement?: React.ReactElement
  prefixElement?: React.ReactElement
  containerProps?: AllHTMLAttributes<HTMLDivElement>
}
export default function Input(props: Props): JSX.Element {
  const { suffixElement, prefixElement, containerProps, ...inputProps } = props
  return (
    <InputContainer {...containerProps}>
      {prefixElement} <input {...inputProps} /> {suffixElement}
    </InputContainer>
  )
}
const InputContainer = styled.div`
  display: flex;
  height: 32px;
  width: 100%;
  background-color: ${theme.color.bg2};
  border-radius: 14px;
  padding: 0px 16px;
  gap: 4px;
  flex-wrap: nowrap;
  align-items: center;
  input {
    font-size: ${theme.fontSize.smaller};
    flex: 1;
    color: ${theme.color.black80};

    &::placeholder {
      color: ${theme.color.black40};
      text-align: left;
    }
  }
`
