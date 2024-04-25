import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const ChatContainer = styled.div`
  background-color: ${theme.color.pg1};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MessageContainer = styled.div`
  background-color: ${theme.color.white};
  width: 100%;
  padding: 2rem;
  /* height: calc(100% - 10rem); Adjusted height */
  height: 100%;
  overflow-y: auto;
  border-radius: 0 0 20px 20px;
`

export const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1rem;
`

export const ChatDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: ${theme.fontSize.medium};
  color: ${theme.color.black40};
`

export const BubbleBox = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
  gap: 0.5rem;

  .msg {
    display: flex;
    flex-direction: ${(props) => props.$isMe && 'row-reverse'};
    align-items: flex-end;
    gap: 0.5rem;
  }
`

export const Username = styled.span<{ $isMe: boolean }>`
  display: ${(props) => props.$isMe && 'none'};
  font-size: ${theme.fontSize.small};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.color.black60};
`

export const ChatBubble = styled.div<{ $isMe: boolean }>`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => (props.$isMe ? theme.color.white : theme.color.black60)};
  background-color: ${(props) =>
    props.$isMe ? theme.color.primary100 : theme.color.primary10};
  border-radius: ${(props) =>
    props.$isMe ? '1rem 1rem 0 1rem' : '0 1rem 1rem 1rem'};
  padding: 10px;
  word-break: break-all;
`

export const SendTime = styled.span`
  font-size: ${theme.fontSize.small};
  color: ${theme.color.black40};
`

export const MsgInputBox = styled.div`
  width: 80%;
  color: ${theme.color.black40};
  background-color: ${theme.color.primary10};
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSize.small};
  padding: 1.2rem 2rem;
  margin: 2rem;
  /* padding: ${theme.fontSize.larger2} ${theme.fontSize.larger}; */

  input {
    width: 100%;
    padding-right: 1rem;
    color: ${theme.color.black70};
  }
`

export const SendButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${theme.color.primary100};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: ${theme.fontSize.medium};
    height: ${theme.fontSize.medium};
  }
`

export const MenuButton = styled.button`
  position: relative;
`

export const MenuContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 2rem;
  width: 21rem;
  height: 11rem;
  border-radius: 2rem;
  border: 1px solid ${theme.color.line2};
  background-color: ${theme.color.white};
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;

    span {
      color: ${theme.color.black60};
      font-size: ${theme.fontSize.medium};
    }
  }
`
