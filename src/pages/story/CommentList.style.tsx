import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  color: #000;
`
export const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  width: 100%;
  color: #000;
  padding: 10px 0;
`

export const Top = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  align-items: center;
`
export const Commenter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const Img = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
`
export const CommenterD = styled.div`
  font-size: 16px;
  padding: 8px 0;
`
export const CommentContent = styled.div`
  font-size: 16px;
  line-height: 25px;
`
