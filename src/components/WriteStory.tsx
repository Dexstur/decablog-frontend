import { styled } from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
import { ChangeEvent, FormEvent } from 'react'
import { CustomBtnGreen } from './Buttons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import myApi from '../api.config'

const Wrapper = styled.div<{ show: boolean }>`
  width: 640px;
  min-height: 540px;
  max-height: 80vh;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 24px;
  position: fixed;
  z-index: 15;
  left: 30%;
  right: 30%;
  top: 100px;
`
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const TopText = styled.h3`
  font-size: 24px;
  font-weight: 700;
`
const CloseButton = styled(AiOutlineClose)`
  font-size: 24px;
  color: #757575;
  cursor: pointer;
`
const TitleInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
`

const StoryContent = styled.textarea`
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  height: 260px;
  overflow-y: scroll;
`

const BtnControl = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
`

const ButtonSpan = styled.span`
  display: flex;
  flex-shrink: 0;
  min-width: 79px;
  text-align: center;
  justify-content: center;
`
const GrayBtn = styled.button`
  text-decoration: none;
  background-color: #f2f4f7;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`

// interface IStoryContext {
//   title: string
//   content: string
// }

interface IWrite {
  display: boolean
  close: () => void
  dark?: boolean
}

function WriteStory({ display, close, dark = false }: IWrite) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  })
  const [categories, setCategories] = useState([])
  const [postState, setPostState] = useState(false)
  const [failed, setFailed] = useState(false)
  const navigate = useNavigate()

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  function Cancel(e: { preventDefault: () => void }) {
    e.preventDefault()
    setFormData({ title: '', content: '', category: '' })
    close()
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formData)
    if (!postState) {
      setPostState(true)
      myApi
        .post('/story/create', formData)
        .then((res) => {
          const { data } = res.data
          setPostState(false)
          navigate(`/story/id/${data._id}`)
          setFormData({ title: '', content: '', category: '' })
          close()
        })
        .catch(() => {
          setFailed(true)
          setPostState(false)
          setTimeout(() => {
            setFailed(false)
          }, 2000)
        })
    }
  }

  useEffect(() => {
    myApi
      .get('/category/list')
      .then((response) => {
        const { data } = response.data
        setCategories(data)
      })
      .catch(() => {
        null
      })
  }, [])

  return (
    <Wrapper show={display} className={dark ? 'dark-card' : ''}>
      <Top>
        <TopText>Write an article</TopText>
        <CloseButton onClick={close} />
      </Top>
      <form onSubmit={handleSubmit}>
        <TitleInput
          type="text"
          placeholder="Title"
          className={dark ? 'dark-card' : ''}
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={formData.category}
          required
          className={dark ? 'dark-card' : ''}
          style={{ padding: '10px 5px' }}
        >
          <option value="" style={{ padding: '16px 5px' }}>
            Select a category
          </option>
          {categories.map((category: string, index) => (
            <option
              key={index}
              value={category}
              style={{ padding: '16px 5px' }}
            >
              {category}
            </option>
          ))}
        </select>
        <br />
        <br />
        <StoryContent
          placeholder="Write here..."
          required
          name="content"
          className={dark ? 'dark-card' : ''}
          value={formData.content}
          onChange={handleChange}
        />
        <br />
        <br />
        <BtnControl>
          <GrayBtn onClick={Cancel}>
            <ButtonSpan>Cancel</ButtonSpan>
          </GrayBtn>
          <CustomBtnGreen>Publish</CustomBtnGreen>
        </BtnControl>
      </form>
      {postState && <p>Posting...</p>}
      {failed && <p>Upload Failed</p>}
    </Wrapper>
  )
}

export default WriteStory
