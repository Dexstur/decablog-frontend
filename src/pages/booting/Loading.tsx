import logo from '../../assets/images/Blogger-logo1.png'
import { BiLoader } from 'react-icons/bi'
import { styled } from 'styled-components'

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const Clearance = styled.div`
  height: 64px;
`

interface ILoad {
  dark?: boolean
}

function LoadingScreen({ dark = false }: ILoad) {
  return (
    <div className={dark ? 'dark-body' : ''} style={{ height: '100vh' }}>
      <FlexColumn>
        <Clearance />
        <img src={logo} alt="blog logo" />
        <BiLoader size={64} color={'#000'} />
        <h1>Loading...</h1>
      </FlexColumn>
    </div>
  )
}

export default LoadingScreen
