import { Wrapper } from './InvitePage.style'
import Layout from '../../components/Layout'
import Describe from './Describe'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../booting/Loading'
import NoAuth from '../error/NoAuth'
import ServerError from '../error/ServerError'
import NotFound from '../error/NotFound'
import { SpaceSummary } from '../spaceList/SpaceList'
import { styled } from 'styled-components'
import { CustomRedBtn, CustomBtnGreen } from '../../components/Buttons'
import myApi from '../../api.config'

interface InvitePageProps {
  dark?: boolean
  settingDark?: () => void
}

const Box1 = styled.div`
  width: 90%;
  margin: 0 auto;
`
const H2 = styled.h2`
  text-align: center;
`

const Clearance = styled.div`
  width: 100%;
  height: 40px;
`

const BtnControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

function InvitePage({
  dark = false,
  settingDark = () => null,
}: InvitePageProps) {
  const { spaceId } = useParams()
  const [error, setError] = useState(null)
  const [data, setData] = useState<SpaceSummary | null>(null)
  const navigate = useNavigate()

  console.log(spaceId)

  useEffect(() => {
    myApi
      .get(`/users/v/space/id/${spaceId}/invite`)
      .then((res) => {
        const { data } = res.data
        setData(data)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [spaceId])

  if (data) {
    return (
      <Layout
        navActive="spaces"
        userStatus={true}
        settingDark={settingDark}
        dark={dark}
      >
        <Wrapper>
          <Clearance />
          <H2>You have been invited to join {data.name} space</H2>
          <Box1>
            <Describe space={data} dark={dark} />
          </Box1>
          <Box1>
            <BtnControl>
              <CustomBtnGreen onClick={() => navigate(`/space/id/${spaceId}`)}>
                Join
              </CustomBtnGreen>
              <CustomRedBtn onClick={() => navigate('/users/v/dashboard')}>
                Decline
              </CustomRedBtn>
            </BtnControl>
          </Box1>
        </Wrapper>
      </Layout>
    )
  }

  if (error) {
    if (error === 401) {
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      return <NoAuth />
    }
    if (error === 404 || error === 400) {
      return <NotFound />
    }

    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default InvitePage
