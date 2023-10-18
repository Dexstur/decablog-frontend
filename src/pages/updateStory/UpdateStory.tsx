import {
  Wrapper,
  Top,
  TopText,
  Titleinput,
  StoryContent,
  UpdateForm,
  ButtonSpan,
  BtnControl,
  GrayBtn,
  GreenBtn,
} from './update.style'
import myApi from '../../api.config'
import Layout from '../../components/Layout'
import NoAuth from '../error/NoAuth'
import { useNavigate, useParams } from 'react-router-dom'
import ServerError from '../error/ServerError'
import { styled } from 'styled-components'
import { useEffect, useState, FormEvent } from 'react'
import LoadingScreen from '../booting/Loading'
import NotFound from '../error/NotFound'

const Box = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 520px;
  margin: 10px auto;
  padding: 16px 10px;
  background-color: ${({ dark }) => (dark ? '#001011' : '#fff')};
`

interface IUpdateStory {
  dark?: boolean
  settingDark?: () => void
}

function UpdateStory({ dark = false, settingDark = () => null }: IUpdateStory) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  })
  const [updating, setUpdating] = useState(false)
  const [failed, setFailed] = useState(false)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const { storyId } = useParams()

  useEffect(() => {
    myApi
      .get(`/story/id/${storyId}`)
      .then((response) => {
        const { data, ownerStatus } = response.data

        if (!ownerStatus) {
          console.log('problem 1')
          setTimeout(() => {
            navigate(-1)
          }, 1000)
          return <NoAuth />
        } else {
          setData(data)
          console.log('recieved')
          setFormData({
            title: data.title,
            category: data.category,
            content: data.content,
          })
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [storyId, navigate])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!updating) {
      setUpdating(true)
      myApi
        .put(`/story/id/${storyId}`, formData)
        .then(() => {
          setUpdating(false)
          navigate(`/story/id/${storyId}`)
        })
        .catch(() => {
          setUpdating(false)
          setFailed(true)
          setTimeout(() => {
            setFailed(false)
          }, 1500)
        })
    }
  }

  function Cancel(e: { preventDefault: () => void }) {
    e.preventDefault()
    navigate(-1)
  }

  useEffect(() => {
    myApi
      .get('/category/list')
      .then((response) => {
        const { data } = response.data
        setCategories(data)
      })
      .catch(() => {
        null
      })
  }, [])

  if (data) {
    return (
      <Layout userStatus={true} dark={dark} settingDark={settingDark}>
        <>
          <Box dark={dark}>
            <Wrapper className={dark ? 'dark-card' : ''}>
              <Top>
                <TopText>Update Story</TopText>
              </Top>
              <UpdateForm onSubmit={handleSubmit}>
                <Titleinput
                  type="text"
                  name="title"
                  value={formData.title}
                  className={dark ? 'dark-card' : ''}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <select
                  name="category"
                  value={formData.category}
                  className={dark ? 'dark-card' : ''}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category: string, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <StoryContent
                  name="content"
                  value={formData.content}
                  required
                  className={dark ? 'dark-card' : ''}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Content"
                />
                <BtnControl>
                  <GrayBtn onClick={Cancel}>
                    <ButtonSpan>Cancel</ButtonSpan>
                  </GrayBtn>
                  <GreenBtn>
                    <ButtonSpan>Update</ButtonSpan>
                  </GreenBtn>
                </BtnControl>
              </UpdateForm>
              {updating && <p>Updating story...</p>}
              {failed && <p>Failed to update story</p>}
            </Wrapper>
          </Box>
        </>
      </Layout>
    )
  }

  if (error) {
    if (error === 400 || error === 404 || error === 403) {
      setTimeout(() => {
        navigate(-1)
      }, 1000)
      return <NotFound />
    }
    if (error === 401) {
      setTimeout(() => {
        navigate('/users/login')
      }, 1500)
      return <NoAuth />
    }

    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default UpdateStory
