import { styled } from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
import { ChangeEvent, FormEvent } from 'react'
import { CustomBtnGreen } from '../../components/Buttons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import myApi from '../../api.config'

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
  z-index: 12;
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

function CreateSpace({ display, close, dark = false }: IWrite) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
    setFormData({ name: '', description: '', category: '' })
    close()
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formData)
    if (!postState) {
      setPostState(true)
      myApi
        .post('/users/v/space', formData)
        .then((res) => {
          const { data } = res.data
          setPostState(false)
          navigate(`/space/id/${data._id}`)
        })
        .catch(() => {
          setFailed(true)
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
        <TopText>Create a space</TopText>
        <CloseButton onClick={close} />
      </Top>
      <form onSubmit={handleSubmit} className={dark ? 'dark-card' : ''}>
        <TitleInput
          type="text"
          placeholder="Name"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={dark ? 'dark-card' : ''}
        />
        <br />
        <br />
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={formData.category}
          className={dark ? 'dark-card' : ''}
          style={{ padding: '10px' }}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category: string) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <br />
        <br />
        <StoryContent
          placeholder="Description..."
          required
          name="description"
          className={dark ? 'dark-card' : ''}
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <BtnControl>
          <GrayBtn onClick={Cancel}>
            <ButtonSpan>Cancel</ButtonSpan>
          </GrayBtn>
          <CustomBtnGreen>Create</CustomBtnGreen>
        </BtnControl>
      </form>
      {postState && <p>Creating space...</p>}
      {failed && <p>Space not created</p>}
    </Wrapper>
  )
}

export default CreateSpace
