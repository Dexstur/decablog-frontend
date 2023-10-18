import {
  Wrapper,
  Entry,
  Top,
  Commenter,
  Img,
  CommenterD,
  CommentContent,
} from './CommentList.style'

interface IComment {
  _id: string
  userName: string
  content: string
  userImg: string
  createdAt: string
}

interface CommentListProps {
  comments: IComment[]
  dark?: boolean
}

function CommentList({ comments, dark = false }: CommentListProps) {
  function handleParagraps(input: string) {
    return input
      .split('\n')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }
  return (
    <Wrapper className={dark ? 'dark-card' : ''}>
      {comments.length == 0 && <p>No comments yet. Start discussing?</p>}
      {comments.map((comment) => (
        <Entry key={comment._id} className={dark ? 'dark-card' : ''}>
          <Top className={dark ? 'dark-card' : ''}>
            <Commenter>
              <Img src={comment.userImg} alt="user" />
              <CommenterD className={dark ? 'dark-card' : ''}>
                {comment.userName}
              </CommenterD>
            </Commenter>
            <CommenterD className={dark ? 'dark-card' : ''}>
              {comment.createdAt}
            </CommenterD>
          </Top>
          <CommentContent className={dark ? 'dark-card' : ''}>
            {handleParagraps(comment.content)}
          </CommentContent>
        </Entry>
      ))}
    </Wrapper>
  )
}

export default CommentList
