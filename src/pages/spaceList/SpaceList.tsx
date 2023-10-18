import {
  Wrapper,
  Top,
  TopText,
  ProfileImg,
  NoImg,
  StoryHead,
  StorySub,
  StoryUtil,
  StoryAttributes,
  Author,
  Content,
  LinkWrap,
  Continue,
} from './SpaceItem.style'
import { HiOutlineUsers } from 'react-icons/hi'
import { BsChatText } from 'react-icons/bs'
// import { CustomGreenA } from '../../components/Buttons'

export interface SpaceSummary {
  _id: string
  name: string
  description: string
  owner: string
  ownerId: string
  category: string
  users: number
  comments: number
  userImg: string
  picture: string
  belongs: boolean
  createdAt: string
}

interface StoryPreviewProps {
  spaces: SpaceSummary[]
  dark?: boolean
}

function SpaceList({ spaces, dark = false }: StoryPreviewProps) {
  return (
    <>
      {spaces.length === 0 && <p>No spaces.</p>}
      {spaces.map((space) => (
        <Wrapper key={space._id} className={dark ? 'dark-card' : ''}>
          <Top className={dark ? 'dark-card' : ''}>
            {space.userImg ? (
              <ProfileImg src={space.userImg} alt="img" />
            ) : (
              <NoImg />
            )}
            <TopText className={dark ? 'dark-card' : ''}>
              <StoryHead className={dark ? 'dark-card' : ''}>
                {space.name}
              </StoryHead>
              <StorySub>
                <p>{space.createdAt}</p>
                <StoryAttributes>
                  <StoryUtil>
                    <BsChatText
                      size={16}
                      color={space.comments ? 'blue' : 'grey'}
                    />
                    <span>{space.comments}</span>
                  </StoryUtil>
                  <StoryUtil>
                    <HiOutlineUsers size={16} color="blue" />
                    <span>{space.users}</span>
                  </StoryUtil>
                </StoryAttributes>
              </StorySub>
              <Author>Host - {space.owner}</Author>
            </TopText>
          </Top>
          <Content>{space.description}</Content>
          {space.name != 'General' && (
            <LinkWrap>
              {space.belongs ? (
                <Continue to={`/space/id/${space._id}`}>View</Continue>
              ) : (
                <Continue to={`/space/id/${space._id}`}>Join</Continue>
              )}
            </LinkWrap>
          )}
        </Wrapper>
      ))}
    </>
  )
}

export default SpaceList
