import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const MainBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
`

export const Text = styled.div`
  color: var(--main-primarycolor, #34a853);
  text-align: left;
  font: var(--body-text-bold-16, 600 16px/140% 'Inter', sans-serif);
  display: flex;
  align-items: center;
`

export const Divider = styled.div`
  background: var(--gray-200, #eeeeee);
  flex-shrink: 0;
  width: 100%;
  height: 1px;
  position: relative;
  transform-origin: 0 0;
  transform: rotate(0deg) scale(1, 1);
`

export const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
`

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
`

export const Text2 = styled.div`
  color: var(--main-text, #101828);
  text-align: left;
  font: var(--button-semi-bold-14, 600 14px/20px 'Inter', sans-serif);
  display: flex;
  align-items: center;
`

export const Text3 = styled.div`
  color: var(--main-text, #101828);
  text-align: left;
  font: var(--button-normal-14, 400 14px/20px 'Inter', sans-serif);
  display: flex;
  align-items: center;
`

export const Button = styled(Link)`
  background: var(--grey-50, #f9fafb);
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 140px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  font: var(--button-normal-14, 400 14px/20px 'Inter', sans-serif);

  &:hover {
    background: var(--grey-100, #f4f4f4);
    color: var(--main-primarycolor, #34a853);
  }
`
