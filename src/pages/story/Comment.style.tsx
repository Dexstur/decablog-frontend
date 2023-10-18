import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  color: #808080;
  gap: 10px;
`
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #000;
`
export const Seperator = styled.div`
  height: 4px;
  width: 100%;
  background-color: #f6f7f7;
`
export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  align-items: flex-start;
`

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const CommentInput = styled.textarea`
  border: 3px solid #f6f7f7;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  min-height: 140px;
  width: 100%;
  &:focus {
    outline: none;
  }
`
export const CommentButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #4ea855;
  color: #fff;
  max-width: 150px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
