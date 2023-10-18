import SpaceSide from '../dashboard/SpaceSide'
import StoryPreview from '../dashboard/StoryPreview'
import myApi from '../../api.config'
import { useState, useEffect } from 'react'
import LoadingScreen from '../booting/Loading'
import Layout from '../../components/Layout'
import NotFound from '../error/NotFound'
import ServerError from '../error/ServerError'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'

const MyContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  min-height: 100vh;
  position: relative;
  padding-bottom: 200px;
`
const Box1 = styled.div`
  width: 359px;
  padding-left: 100px;
  position: fixed;
  z-index: 20;
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

const Warn = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #fef1c6;
  color: #7b2e12;
  font-size: 14px;
  position: fixed;
  z-index: 20;
`
const A = styled.a`
  color: #7b2e12;
`

interface IStoryList {
  dark?: boolean
  settingDark?: () => void
}

function StoryList({ dark = false, settingDark = () => null }: IStoryList) {
  const { category } = useParams()
  const [login, setLogin] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  myApi
    .get('/users/v/img')
    .then(() => {
      setLogin(true)
    })
    .catch(() => {
      setLogin(false)
    })

  useEffect(() => {
    myApi
      .get(`/category/story/${category}`)
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
  }, [category])

  function listSpaces() {
    myApi
      .get('/category/list')
      .then((response) => {
        const { data } = response.data
        setCategories(data)
        if (typeof category === 'string' && categories.length > 0) {
          if (categories.includes(category)) {
            const copy = [...categories]
            copy.splice(copy.indexOf(category), 1)
            copy.unshift(category)
            setCategories(copy)
          }
        }
      })
      .catch(() => {
        null
      })
  }

  if (data) {
    return (
      <Layout userStatus={login} dark={dark} settingDark={settingDark}>
        {login == false && (
          <Warn>
            Your view is limited. <A href="/users/login">Login</A> to get full
            access{' '}
          </Warn>
        )}
        <MyContent>
          <Box1>
            <SpaceSide category={categories} active={category} dark={dark} />
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
    if (error == 404) {
      return <NotFound />
    }

    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default StoryList
