import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const GreenBtn = styled.button`
  text-decoration: none;
  color: #fff;
  background-color: #34a853;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const GrayBtn = styled.button`
  text-decoration: none;
  background-color: #f2f4f7;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const RedBtn = styled.button`
  text-decoration: none;
  background-color: red;
  color: #fff;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const GreenA = styled.div`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #34a853;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const ButtonSpan = styled.span`
  display: flex;
  flex-shrink: 0;
  min-width: 79px;
  text-align: center;
  justify-content: center;
`

interface IButton {
  children: React.ReactNode
  onClick?: () => void
}

interface ILink {
  children: React.ReactNode
  ref?: string
}

function CustomBtnGreen({ children, onClick = () => null }: IButton) {
  return (
    <GreenBtn onClick={onClick}>
      <ButtonSpan>{children}</ButtonSpan>
    </GreenBtn>
  )
}

function CustomGrayBtn({ children, onClick = () => null }: IButton) {
  return (
    <GrayBtn onClick={onClick}>
      <ButtonSpan>{children}</ButtonSpan>
    </GrayBtn>
  )
}

function CustomRedBtn({ children, onClick = () => null }: IButton) {
  return (
    <RedBtn onClick={onClick}>
      <ButtonSpan>{children}</ButtonSpan>
    </RedBtn>
  )
}

function CustomGreenA({ children, ref = '#' }: ILink) {
  const navigate = useNavigate()
  return (
    <GreenA onClick={() => navigate(ref)}>
      <ButtonSpan>{children}</ButtonSpan>
    </GreenA>
  )
}

export { CustomBtnGreen, CustomGreenA, CustomGrayBtn, CustomRedBtn }
