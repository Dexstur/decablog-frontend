import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
`
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  background-color: #fff;
`
export const TopText = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 10px;
`

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  background-color: #fff;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #111829;
  margin-bottom: 10px;
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
export const StoryContent = styled.div`
  line-height: 30px;
  padding-top: 20px;
`
