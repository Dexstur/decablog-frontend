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
} from './FullStory.style'
import { BiLike } from 'react-icons/bi'
import { BsChatText } from 'react-icons/bs'
import myApi from '../../api.config'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const LikeBtn = styled(BiLike)`
  cursor: pointer;
`

export interface IStory {
  _id: string
  title: string
  content: string
  createdAt: string
  author: string
  likes: number
  comments: number
  userImg?: string
  readTime: number
}

interface FullStoryProps {
  story?: IStory | undefined | null
  dark?: boolean
}

function FullStory({ story, dark = false }: FullStoryProps) {
  const [likeClick, setLikeClick] = useState(false)
  const [likes, setLikes] = useState(story?.likes || 0)
  const [liked, setLiked] = useState(false)
  function likeStory() {
    if (story) {
      myApi
        .put(`/story/id/${story._id}/like`)
        .then(() => {
          setLikeClick(!likeClick)
        })
        .catch(() => null)
    }
  }
  useEffect(() => {
    if (story) {
      myApi
        .get(`/story/id/${story._id}/like`)
        .then((res) => {
          const { data, likeStatus } = res.data
          setLikes(data)
          setLiked(likeStatus)
        })
        .catch(() => null)
    }
  }, [likeClick, story])
  if (story) {
    const handleParagraphs = story.content
      .split('\n')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>)

    return (
      <>
        <Wrapper className={dark ? 'dark-card' : ''}>
          <Top className={dark ? 'dark-card' : ''}>
            {story.userImg ? (
              <ProfileImg src={story.userImg} alt="img" />
            ) : (
              <NoImg />
            )}
            <TopText>
              <Heading className={dark ? 'dark-card' : ''}>
                {story.title}
              </Heading>
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
                    <LikeBtn
                      size={16}
                      color={liked ? 'blue' : 'grey'}
                      onClick={likeStory}
                    />
                    <span>{likes}</span>
                  </StoryUtil>
                </StoryAttributes>
              </StorySub>
              <p>Author - {story.author}</p>
            </TopText>
          </Top>
          <StoryContent>
            <div>{handleParagraphs}</div>
          </StoryContent>
        </Wrapper>
      </>
    )
  }

  return (
    <Wrapper>
      <Heading>No story found</Heading>
    </Wrapper>
  )
}

export default FullStory
