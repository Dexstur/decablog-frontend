import {
  Wrapper,
  Title,
  Seperator,
  CommentSection,
  CommentForm,
  CommentInput,
  CommentButton,
} from './Comment.style'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import myApi from '../../api.config'

interface BoxProps {
  storyId: string
  postedComment?: () => void
  dark?: boolean
}

function CommentBox({ storyId, postedComment, dark = false }: BoxProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!commenting) {
      setCommenting(true)
      myApi
        .post(`/story/id/${storyId}/comment`, formData)
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
    myApi.get(`/story/id/${storyId}/comment`).then((response) => {
      const { data } = response.data
      setComments(data)
      setFormData({ content: '' })
    })
  }, [storyId, newComment])
  return (
    <Wrapper className={dark ? 'dark-card' : ''}>
      <Title className={dark ? 'dark-card' : ''}>Comments</Title>
      <Seperator />
      <CommentSection>
        <CommentList comments={comments} dark={dark} />
      </CommentSection>
      <Title className={dark ? 'dark-card' : ''}>Leave a Comment</Title>
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
