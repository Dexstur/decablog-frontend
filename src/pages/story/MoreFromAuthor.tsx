import {
  MainBox,
  Top,
  Text,
  Divider,
  SubBox,
  TextBox,
  Text2,
  Text3,
  Button,
} from './MoreFromAuthor.style'

export interface IStory {
  _id: string
  title: string
  content: string
}

interface MoreFromAuthorProps {
  stories: IStory[] // Assuming you have an array of stories from the same author
  dark?: boolean
}

const MoreFromAuthor = ({ stories, dark = false }: MoreFromAuthorProps) => {
  return (
    <MainBox className={dark ? 'dark-card' : ''}>
      <Top>
        <Text>More from the author</Text>
      </Top>
      <SubBox>
        {stories.length === 0 && (
          <Text3 className={dark ? 'dark-card' : ''}>No stories found</Text3>
        )}
        {stories.map((story, index) => (
          <>
            <Divider />
            <TextBox key={index} className={dark ? 'dark-card' : ''}>
              <Text2 className={dark ? 'dark-card' : ''}>{story.title}</Text2>
              <Text3 className={dark ? 'dark-card' : ''}>{story.content}</Text3>
              <Button to={`/story/id/${story._id}`}>View Article</Button>
            </TextBox>
          </>
        ))}
      </SubBox>
    </MainBox>
  )
}

export default MoreFromAuthor
