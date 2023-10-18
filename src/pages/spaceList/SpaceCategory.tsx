import myApi from '../../api.config'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ServerError from '../error/ServerError'
import NoAuth from '../error/NoAuth'
import LoadingScreen from '../booting/Loading'
import Layout from '../../components/Layout'
import SpaceList from './SpaceList'
import CategorySide from './CategoryList'
import CreateSpace from './CreateSpace'
import { ISpaceListing } from './SpaceListing'
import { styled } from 'styled-components'

const MyContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`
const Box1 = styled.div`
  width: 359px;
  padding-left: 100px;
  position: fixed;
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

function SpaceCategory({
  dark = false,
  settingDark = () => null,
}: ISpaceListing) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [spaces, setSpaces] = useState([])
  const [createSpace, setCreateSpace] = useState(false)
  const navigate = useNavigate()
  const { category } = useParams()

  useEffect(() => {
    myApi
      .get(`/users/v/space/category/${category}`)
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
        setSpaces(data)
      })
      .catch(() => {
        null
      })
  }

  function toggleCreate() {
    setCreateSpace(!createSpace)
  }

  if (data) {
    return (
      <Layout
        userStatus={true}
        navActive="spaces"
        dark={dark}
        settingDark={settingDark}
      >
        <CreateSpace
          display={createSpace}
          close={() => setCreateSpace(false)}
          dark={dark}
        />
        <MyContent>
          <Box1>
            <CategorySide
              category={spaces}
              create={toggleCreate}
              active={category}
              dark={dark}
            />
          </Box1>
          <Separator />
          <Box2 onClick={() => setCreateSpace(false)}>
            <SpaceList spaces={data} dark={dark} />
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

export default SpaceCategory
