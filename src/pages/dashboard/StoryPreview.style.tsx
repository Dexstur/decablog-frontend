import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 20px;
  color: #2a3240;
  background-color: #fefffe;
  text-align: left;
  width: 100%;
  border-radius: 6px;
  font-weight: 200;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`

export const TopText = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 10px;
`

export const ProfileImg = styled.img`
  width: 109px;
  height: 89px;
  border-radius: 5px;
`
export const NoImg = styled.div`
  width: 109px;
  height: 89px;
  border-radius: 5px;
  background-color: #ccc;
`

export const StoryHead = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

export const StorySub = styled.div`
  font-size: 16px;
  display: flex;
  gap: 35px;
`

export const StoryAttributes = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const StoryUtil = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
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
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  background-color: #34a952;
  color: #fefffe;
  display: flex;
  justify-content: center;
  align-items: center;
`
