import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FullStory from './FullStory'
import Layout from '../../components/Layout'
import ServerError from '../error/ServerError'
import NoAuth from '../error/NoAuth'
import LoadingScreen from '../booting/Loading'
import CommentBox from './Comment'
import MoreFromAuthor from './MoreFromAuthor'
import myApi from '../../api.config'
import { styled } from 'styled-components'
import { CustomGrayBtn, CustomRedBtn } from '../../components/Buttons'
import ActionModal from '../../components/ActionModal'

const MyContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 50px;
  gap: 80px;
`
const Box1 = styled.div`
  min-width: 65%;
  max-width: 715px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const Box2 = styled.div`
  width: 28%;
  min-height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const InnerBox = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`
const BtnControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`

interface IStoryPage {
  dark?: boolean
  settingDark?: () => void
}

function StoryPage({ dark = false, settingDark = () => null }: IStoryPage) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [more, setMore] = useState([])
  const [owner, setOwner] = useState(false)
  const [comment, setComment] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMsg, setModalMsg] = useState('')
  const [modalAction, setModalAction] = useState(() => {})
  const [modalBtn, setModalBtn] = useState('')
  const navigate = useNavigate()
  const { storyId } = useParams()

  function deleteStory() {
    setModalMsg('Deleting...')
    setModalAction(() => {})
    setModalBtn('Disabled')
    myApi
      .delete(`/story/id/${storyId}`)
      .then(() => {
        setModalTitle('Deleted')
        setModalMsg('Redirecting...')
        setModalAction(() => {})
        setModalBtn('Disabled')
        setTimeout(() => {
          navigate('/users/v/dashboard')
        }, 1000)
      })
      .catch(() => {
        setTimeout(() => {
          setModalTitle('Error')
          setModalMsg('Something went wrong')
          setModalBtn('Try Again')
        }, 8000)
      })
  }

  function handleDelete() {
    setModalAction(deleteStory)
    setTimeout(() => {
      setModalAction(() => {})
    }, 500)
    modalAction
  }

  function deleteClick() {
    setModalTitle('Delete Story')
    setModalMsg('Are you sure you want to delete this story?')
    setModalBtn('Delete')
    setShowModal(true)
  }

  useEffect(() => {
    myApi
      .get(`/story/id/${storyId}`)
      .then((response) => {
        const { data, others, ownerStatus } = response.data
        setData(data)
        setMore(others)
        setOwner(ownerStatus)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [storyId, comment])

  if (data) {
    const setOpacity = showModal ? 0.5 : 1
    return (
      <Layout userStatus={true} dark={dark} settingDark={settingDark}>
        <ActionModal
          show={showModal}
          dark={dark}
          title={modalTitle}
          message={modalMsg}
          action={handleDelete}
          close={() => setShowModal(false)}
          button={modalBtn}
        />
        <MyContent style={{ opacity: setOpacity }}>
          <Box1>
            <InnerBox className={dark ? 'dark-card' : ''}>
              <FullStory story={data} dark={dark} />
            </InnerBox>
            {owner && (
              <InnerBox className={dark ? 'dark-card' : ''}>
                <BtnControl>
                  <CustomGrayBtn
                    onClick={() =>
                      navigate(`/story/update/${storyId?.toString()}`)
                    }
                  >
                    Update
                  </CustomGrayBtn>
                  <CustomRedBtn onClick={deleteClick}>Delete</CustomRedBtn>
                </BtnControl>
              </InnerBox>
            )}
            <InnerBox className={dark ? 'dark-card' : ''}>
              <CommentBox
                storyId={storyId || ''}
                postedComment={() => setComment(!comment)}
                dark={dark}
              />
            </InnerBox>
          </Box1>
          <Box2 className={dark ? 'dark-card' : ''}>
            <MoreFromAuthor stories={more} dark={dark} />
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

export default StoryPage
