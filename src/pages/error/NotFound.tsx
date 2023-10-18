import logo from '../../assets/images/Blogger-logo1.png'
import { styled } from 'styled-components'
import { useEffect } from 'react'

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const Clearance = styled.div`
  height: 64px;
`

function NotFound() {
  useEffect(() => {
    // Log the path when the component mounts
    console.log('Path not found:', window.location.pathname)
  }, [])

  return (
    <ErrorPage>
      <Clearance />
      <img src={logo} alt="Blogger logo" />
      <h1>Not Found</h1>
      <p>Page does not exist.</p>
    </ErrorPage>
  )
}

export default NotFound
