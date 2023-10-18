import { styled } from 'styled-components'

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  background-image: url('/spaceImg.png');
  background-size: 100%;
`

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(27, 26, 26, 0.5);
  border-radius: 10px;
  z-idex: 1;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;
  z-idex: 2;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 16px 30px;
`

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 10px;
  max-width: 540px;
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700px;
`

export const Describe = styled.h2`
  font-size: 32px;
  font-weight: 700px;
`

export const Util = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-bottom: 20px;
`

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 400px;
`
export const OwnerName = styled.h3`
  font-size: 32px;
  font-weight: 700px;
`
export const Controls = styled.div`
  width: 178px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
export const Options = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`

export const Invite = styled.button`
  height: 100%;
  width: 130px;
  background-color: transparent;
  outline: none;
  border: 1px solid #fff;
  border-radius: 8px;
  color: #fff;
`
