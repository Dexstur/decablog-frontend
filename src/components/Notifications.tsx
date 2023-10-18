import { styled } from 'styled-components'
import { BsThreeDots } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import myApi from '../api.config'

const Wrapper = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  font-size: 16px;
  width: 457px;
  min-height: 320px;
  max-height: 432px;
  padding-bottom: 20px;
  position: absolute;
  left: 0;
  top: 60px;
  border: 1px solid #eee;
  overflow-y: scroll;
`
const Top = styled.h3`
  padding: 10px;
  color: #aeb6c3;
  font-weight: 400;
  font-size: 16px;
  text-align: left;
  margin-left: 24px;
`

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
  width: 100%;
`

const NotifyList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 20px;
  padding: 0 10px;
  margin-left: 24px;
`
const NotifyItem = styled.li`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
`
const NotifyWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
`
const NotifyTime = styled.p`
  color: #aeb6c3;
  font-size: 12px;
  font-weight: 400;
`
const NotifyType = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`
const NotifyA = styled.div`
  text-decoration: none;
`

const NotifyText = styled.div`
  font-size: 14px;
  font-weight: 300;
`
const NotifyBtn = styled.button`
  border: none;
  outline: none;
  background-color: #fff;
  display: none;
`
const Extend = styled.div<{ show: boolean }>`
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 430px;
  width: 120px;
  height: 80px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  border: 1px solid #eee;
`
const ExtendList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 10px 8px;
  text-align: left;
  gap: 10px;
`
const ExtendLi = styled.li`
  padding: 6px;
  &:hover {
    background-color: #f2f4f7;
  }
`
interface INoteItem {
  _id: string
  user: string
  type: string
  typeId: string
  content: string
  read: boolean
  time: string
}

interface INotification {
  display: boolean
  dark?: boolean
  notifications?: INoteItem[]
}

const Notes = [
  {
    timeStamp: '2 hours ago',
    type: 'New Activity',
    text: 'Someone liked your story',
  },
  {
    timeStamp: 'Yesterday',
    type: 'New Activity',
    text: 'You have a new invitation',
  },
  {
    timeStamp: '2 days ago',
    type: 'New Activity',
    text: 'Someone commented on your story',
  },
]

function NotifcationModal({
  display,
  dark = false,
  notifications = [],
}: INotification) {
  const [expand, setExpand] = useState(-1)
  const navigate = useNavigate()
  function toggleExpand(index: number) {
    if (expand === index) {
      setExpand(-1)
    } else {
      setExpand(index)
    }
  }

  function handleDelete(index: number) {
    const updatedNotes = [...Notes]
    updatedNotes.splice(index, 1)
    setExpand(-1)
  }

  useEffect(() => {
    if (display) {
      setExpand(-1)
    }
  }, [display])

  function handleMarkAsRead(index: number) {
    const updatedNotes = [...Notes]
    updatedNotes[index].type = 'Read'
    setExpand(-1)
  }

  function generateLink(type: string, typeId: string) {
    if (type === 'story') {
      return `/story/id/${typeId}`
    }
    if (type === 'space') {
      return `/space/id/${typeId}`
    }
    if (type === 'invite') {
      return `/space/invite/${typeId}`
    }

    return '#'
  }

  function clickNote({ _id, type, typeId }: INoteItem) {
    myApi.put(`/notification/read/${_id}`)
    const link = generateLink(type, typeId)
    navigate(link)
  }

  return (
    <Wrapper show={display} className={dark ? 'dark-card' : ''}>
      <Top className={dark ? 'dark-card' : ''}>Notifications</Top>
      <Divider />
      <NotifyList>
        {notifications.length === 0 && (
          <NotifyText>No new notifications</NotifyText>
        )}
        {notifications.map((note, index) => (
          <NotifyItem key={index}>
            <NotifyWrap>
              <NotifyA onClick={() => clickNote(note)}>
                <NotifyTime>{note.time}</NotifyTime>
                <NotifyType className={dark ? 'dark-card' : ''}>
                  New Activity
                </NotifyType>
                <NotifyText>{note.content}</NotifyText>
              </NotifyA>
            </NotifyWrap>
            <NotifyBtn
              onClick={() => toggleExpand(index)}
              className={dark ? 'dark-card' : ''}
            >
              <BsThreeDots />
            </NotifyBtn>
            <Extend show={index === expand}>
              <ExtendList>
                <ExtendLi onClick={() => handleDelete(index)}>Delete</ExtendLi>
                <ExtendLi onClick={() => handleMarkAsRead(index)}>
                  Mark as Read
                </ExtendLi>
              </ExtendList>
            </Extend>
          </NotifyItem>
        ))}
      </NotifyList>
    </Wrapper>
  )
}

export default NotifcationModal
