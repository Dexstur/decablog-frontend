import myApi from '../../api.config'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ServerError from '../error/ServerError'
import NoAuth from '../error/NoAuth'
import LoadingScreen from '../booting/Loading'
import Layout from '../../components/Layout'
import StoryPreview from './StoryPreview'
import SpaceSide from './SpaceSide'
import { styled } from 'styled-components'

interface IDashboard {
  dark?: boolean
  settingDark?: () => void
}

const MyContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`
const Box1 = styled.div`
  width: 359px;
  padding-left: 100px;
  position: fixed;
  z-index: 10;
`
const Separator = styled.div`
  width: 359px;
  height: 1px;
`

const Box2 = styled.div`
  width: 715px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0;
  min-height: 434px;
`

function Dashboard({ dark = false, settingDark = () => null }: IDashboard) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [spaces, setSpaces] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    myApi
      .get('/users/v/dashboard')
      .then((response) => {
        const { data } = response.data
        setData(data)
        listSpaces()
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [])

  function listSpaces() {
    myApi
      .get('/category/list')
      .then((response) => {
        const { data } = response.data
        setSpaces(data)
      })
      .catch(() => {
        null
      })
  }

  if (data) {
    return (
      <Layout
        userStatus={true}
        navActive="home"
        settingDark={settingDark}
        dark={dark}
      >
        <MyContent>
          <Box1>
            <SpaceSide category={spaces} dark={dark} />
          </Box1>
          <Separator />
          <Box2>
            <StoryPreview stories={data} dark={dark} />
          </Box2>
        </MyContent>
      </Layout>
    )
  }

  if (error) {
    if (error === 401) {
      setTimeout(() => {
        navigate('/users/login')
      }, 3000)
      return <NoAuth />
    }

    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default Dashboard
