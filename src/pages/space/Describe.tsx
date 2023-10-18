import {
  Wrapper,
  Top,
  Heading,
  ProfileImg,
  NoImg,
  StorySub,
  StoryUtil,
  StoryAttributes,
  TopText,
  StoryContent,
} from './Describe.style'
import { SpaceSummary } from '../spaceList/SpaceList'
import { HiOutlineUsers } from 'react-icons/hi'
import { BsChatText } from 'react-icons/bs'

interface DescribeProps {
  space: SpaceSummary
  dark?: boolean
}

function Describe({ space, dark = false }: DescribeProps) {
  function paragraph(input: string) {
    return input.split('\n').map((str, index) => <p key={index}>{str}</p>)
  }
  return (
    <Wrapper className={dark ? 'dark-card' : ''}>
      <Top className={dark ? 'dark-card' : ''}>
        {space.userImg ? (
          <ProfileImg src={space.userImg} alt="img" />
        ) : (
          <NoImg />
        )}
        <TopText className={dark ? 'dark-card' : ''}>
          <Heading className={dark ? 'dark-card' : ''}>{space.name}</Heading>
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
                <HiOutlineUsers
                  size={16}
                  color={space.users ? 'blue' : 'grey'}
                />
                <span>{space.users}</span>
              </StoryUtil>
            </StoryAttributes>
          </StorySub>
          <p>Organizer - {space.owner}</p>
        </TopText>
      </Top>
      <StoryContent>
        <>{paragraph(space.description)}</>
      </StoryContent>
    </Wrapper>
  )
}

export default Describe
