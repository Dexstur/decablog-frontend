import { styled } from 'styled-components'
import SpaceDetail from './SpaceDetail'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../booting/Loading'
import NoAuth from '../error/NoAuth'
import ServerError from '../error/ServerError'
import NotFound from '../error/NotFound'
import myApi from '../../api.config'
import Describe from './Describe'
import Suggest from './Suggest'
import CommentBox from './Comment'
import ActionModal from '../../components/ActionModal'
// import FullStory, { IStory } from '../story/FullStory'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding-top: 30px;
  gap: 30px;
`

const Box1 = styled.div`
  width: 90%;
  margin: 0 auto;
`

const MyContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  gap: 80px;
  padding-bottom: 60px;
`
const Box2 = styled.div`
  min-width: 65%;
  max-width: 715px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const Box3 = styled.div`
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

interface ISpacePage {
  dark?: boolean
  settingDark?: () => void
}

function SpacePage({ dark = false, settingDark = () => null }: ISpacePage) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [showInvite, setShowInvite] = useState(false)
  const [suggest, setSuggest] = useState([])
  const [comment, setComment] = useState(false)
  const [inviteUser, setInviteUser] = useState('')
  const [inviting, setInviting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMsg, setModalMsg] = useState('')
  const [modalAction, setModalAction] = useState(() => () => {})
  const [modalBtn, setModalBtn] = useState('')

  const navigate = useNavigate()
  function toggleInvite() {
    setShowInvite(!showInvite)
  }

  const { spaceId } = useParams()

  useEffect(() => {
    myApi
      .get(`/users/v/space/id/${spaceId}`)
      .then((response) => {
        const { data } = response.data
        setData(data)
        myApi.get(`/users/v/space/id/${spaceId}/suggest`).then((res) => {
          const { data } = res.data
          setSuggest(data)
        })
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [spaceId, comment])

  const inviteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteUser(e.target.value)
  }

  const setOpacity = showModal ? '0.5' : '1'

  const sendInvite = () => {
    if (!inviting && inviteUser.length > 3) {
      setInviting(true)
      setShowInvite(false)
      setModalTitle('Sending invite')
      setModalMsg('Please wait a moment')
      setModalBtn('Hold on...')
      setShowModal(true)
      myApi
        .post(`/users/v/space/id/${spaceId}/invite`, { username: inviteUser })
        .then(() => {
          setModalTitle('Invite sent')
          setModalMsg('Invitation sent to user')
          setModalBtn('Done')
          setModalAction(() => () => setShowModal(false))
          setInviting(false)
          setInviteUser('')
        })
        .catch((err) => {
          const { status } = err.response
          setModalTitle('Invite not sent')
          if (status === 404) {
            setModalMsg('User not found')
            setModalBtn('Okay')
            setModalAction(() => () => setShowModal(false))
            setInviting(false)
            setInviteUser('')
          }
          if (status === 409) {
            setModalMsg('User already in space')
            setModalBtn('Okay')
            setModalAction(() => () => setShowModal(false))
            setInviting(false)
            setInviteUser('')
          }
        })
    }
  }

  if (data) {
    return (
      <Layout
        userStatus={true}
        navActive="spaces"
        dark={dark}
        settingDark={settingDark}
      >
        <ActionModal
          show={showModal}
          dark={dark}
          title={modalTitle}
          message={modalMsg}
          action={modalAction}
          close={() => setShowModal(false)}
          button={modalBtn}
        />
        <Wrapper style={{ opacity: setOpacity }}>
          <Box1>
            <SpaceDetail
              space={data}
              click1={toggleInvite}
              inviteState={showInvite || false}
              inviteUser={inviteUser}
              inviteInput={inviteInput}
              sendInvite={sendInvite}
            />
          </Box1>
          <MyContent onClick={() => showInvite && setShowInvite(false)}>
            <Box2>
              <InnerBox className={dark ? 'dark-card' : ''}>
                <Describe space={data} dark={dark} />
              </InnerBox>
              <InnerBox className={dark ? 'dark-card' : ''}>
                <CommentBox
                  spaceId={spaceId || ''}
                  postedComment={() => setComment(!comment)}
                  dark={dark}
                />
              </InnerBox>
            </Box2>
            <Box3 className={dark ? 'dark-card' : ''}>
              <Suggest spaces={suggest} dark={dark} />
            </Box3>
          </MyContent>
        </Wrapper>
      </Layout>
    )
  }

  if (error) {
    if (error === 401) {
      setTimeout(() => {
        navigate('/users/login')
      }, 2000)
      return <NoAuth />
    }
    if (error === 404 || error === 400) {
      return <NotFound />
    }
    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default SpacePage
