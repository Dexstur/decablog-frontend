import {
  Wrapper,
  Title,
  Seperator,
  CommentSection,
  CommentForm,
  CommentInput,
  CommentButton,
} from './Comment.style'
import CommentList from '../story/CommentList'
import { useEffect, useState } from 'react'
import myApi from '../../api.config'

interface BoxProps {
  spaceId: string
  postedComment?: () => void
  dark?: boolean
}

function CommentBox({ spaceId, postedComment, dark = false }: BoxProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!commenting) {
      setCommenting(true)
      myApi
        .post(`/users/v/space/id/${spaceId}/comment`, formData)
        .then(() => {
          setCommenting(false)
          postedComment && postedComment()
          setNewComment(!newComment)
          setFormData({ content: '' })
        })
        .catch(() => {
          setFailed(true)
          setCommenting(false)
          setTimeout(() => {
            setFailed(false)
          }, 2000)
        })
    }
  }
  const [comments, setComments] = useState([])
  const [commenting, setCommenting] = useState(false)
  const [newComment, setNewComment] = useState(false)
  const [failed, setFailed] = useState(false)
  const [formData, setFormData] = useState({ content: '' })
  useEffect(() => {
    myApi.get(`/users/v/space/id/${spaceId}/comment`).then((response) => {
      const { data } = response.data
      setComments(data)
      setFormData({ content: '' })
    })
  }, [spaceId, newComment])
  return (
    <Wrapper className={dark ? 'dark-card' : ''}>
      <Title className={dark ? 'dark-card' : ''}>Conversation</Title>
      <Seperator />
      <CommentSection>
        <CommentList comments={comments} dark={dark} />
      </CommentSection>
      <Title className={dark ? 'dark-card' : ''}>Join the conversation</Title>
      <Seperator />
      <CommentForm onSubmit={handleSubmit} className={dark ? 'dark-card' : ''}>
        <p>Type Comment</p>
        <CommentInput
          placeholder="Write here..."
          name="content"
          className={dark ? 'dark-card' : ''}
          value={formData.content}
          onChange={(e) => setFormData({ content: e.target.value })}
          required
        />
        <CommentButton>Post Comment</CommentButton>
      </CommentForm>
      {commenting && <p>Commenting...</p>}
      {failed && <p>Failed to post comment</p>}
    </Wrapper>
  )
}

export default CommentBox
