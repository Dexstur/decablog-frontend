import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  color: #131b2a;
  background: none;
  text-align: left;
  width: 259px;
`

export const Top = styled(Link)`
  width: 100%;
  text-decoration: none;
  background-color: #f2f4f7;
  padding: 10px 20px;
  color: #131b2a;
  display: flex;
  gap: 10px;
  align-items: center;
`

export const CategoryHead = styled.h2`
  font-size: 16px;
  font-weight: 200;
  color: #b4bbc7;
  margin-bottom: 10px;
`

export const CategoriesWrap = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  gap: 10px;
  padding: 30px 16px;
`

export const Category = styled(Link)<{
  show: boolean
  highlight: boolean
  dark: boolean
}>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  text-decoration: none;
  padding: 5px 16px;
  background: none;
  border: none;
  color: ${({ highlight, dark }) =>
    highlight ? '#34a952' : dark ? '#fff' : '#1f2635'};
  font-size: 16px;
  font-weight: 100;

  &:hover {
    text-decoration: underline;
  }
`

export const Author = styled.div`
  font-size: 16px;
`

export const Content = styled.div`
  font-size: 16px;
`

export const LinkWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Continue = styled(Link)`
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 18px;
  background-color: #34a952;
  color: #fefffe;
`

export const Toggler = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`
export const ToggleText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #34a952;
  font-size: 12px;
`
export const IconWrap = styled.div`
  border: 1px solid #34a952;
  border-radius: 50%;
  color: #34a952;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scaleX(-1);
`
