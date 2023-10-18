import { styled } from 'styled-components'
// import { AiOutlineClose } from 'react-icons/ai'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
`
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const TopText = styled.h3`
  font-size: 24px;
  font-weight: 700;
`
export const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 40px 20px;
`

export const Titleinput = styled.input`
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
`
export const StoryContent = styled.textarea`
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  height: 360px;
  overflow-y: scroll;
`

export const BtnControl = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
`

export const ButtonSpan = styled.span`
  display: flex;
  flex-shrink: 0;
  min-width: 79px;
  text-align: center;
  justify-content: center;
`
export const GrayBtn = styled.button`
  text-decoration: none;
  background-color: #f2f4f7;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`

export const GreenBtn = styled.button`
  text-decoration: none;
  background-color: #34a853;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`
