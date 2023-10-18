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
} from './StoryPreview.style'
import { BiLike } from 'react-icons/bi'
import { BsChatText } from 'react-icons/bs'

export interface StorySummary {
  _id: string
  title: string
  createdAt: string
  summary: string
  author: string
  userImg?: string
  readTime: number
  likes: number
  comments: number
}

interface StoryPreviewProps {
  stories: StorySummary[]
  dark?: boolean
}

function StoryPreview({ stories, dark = false }: StoryPreviewProps) {
  return (
    <>
      {stories.length === 0 && <p>No stories.</p>}
      {stories.map((story) => (
        <Wrapper key={story._id} className={dark ? 'dark-card' : ''}>
          <Top>
            {story.userImg ? (
              <ProfileImg src={story.userImg} alt="img" />
            ) : (
              <NoImg />
            )}
            <TopText>
              <StoryHead>{story.title}</StoryHead>
              <StorySub>
                <p>{story.createdAt}</p>
                <StoryAttributes>
                  <p>{story.readTime} min read</p>
                  <StoryUtil>
                    <BsChatText
                      size={16}
                      color={story.comments ? 'blue' : 'grey'}
                    />
                    <span>{story.comments}</span>
                  </StoryUtil>
                  <StoryUtil>
                    <BiLike size={16} color={story.likes ? 'blue' : 'grey'} />
                    <span>{story.likes}</span>
                  </StoryUtil>
                </StoryAttributes>
              </StorySub>
              <Author>Author - {story.author}</Author>
            </TopText>
          </Top>
          <Content>{story.summary}</Content>
          <LinkWrap>
            <Continue to={`/story/id/${story._id}`}>Continue Reading</Continue>
          </LinkWrap>
        </Wrapper>
      ))}
    </>
  )
}

export default StoryPreview
