import { styled } from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
// import { MouseEvent } from 'react'

const Wrapper = styled.div<{ show: boolean }>`
  width: 320px;
  min-height: 320px;
  max-height: 80vh;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: fixed;
  z-index: 15;
  left: 30%;
  right: 30%;
  top: 140px;
`

const CloseButton = styled(AiOutlineClose)`
  font-size: 24px;
  color: #757575;
  cursor: pointer;
`
const TopText = styled.h3`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`
const GrayBtn = styled.div`
  text-decoration: none;
  background-color: #f2f4f7;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const TopControl = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const Message = styled.p<{ pop: boolean }>`
  text-align: center;
  color: ${({ pop }) => (pop ? '#ccc' : '#000')};
`

const ButtonSpan = styled.span`
  display: flex;
  flex-shrink: 0;
  min-width: 79px;
  text-align: center;
  justify-content: center;
`

interface IAction {
  show: boolean
  dark?: boolean
  title: string
  message: string
  button: string
  close: () => void
  action: () => void
}

function ActionModal({
  show,
  dark = false,
  title,
  message,
  button,
  close,
  action,
}: IAction) {
  return (
    <Wrapper show={show} className={dark ? 'dark-card' : ''}>
      <TopControl>
        <CloseButton onClick={close} />
      </TopControl>
      <TopText>{title}</TopText>
      <Message pop={dark}>{message}</Message>
      <GrayBtn onClick={action}>
        <ButtonSpan>{button}</ButtonSpan>
      </GrayBtn>
    </Wrapper>
  )
}

export default ActionModal
