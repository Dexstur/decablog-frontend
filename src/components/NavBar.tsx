import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import myApi from '../api.config'
import LoadingScreen from '../pages/booting/Loading'
import LinkLogo from './LinkLogo'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'
import { BiBell } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import { LiaUser } from 'react-icons/lia'
import { LuSettings } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'
import NotifcationModal from './Notifications'
import { FiMoon } from 'react-icons/fi'
// import { CustomGreenA } from './Buttons'

interface INav {
  user?: boolean
  highlight?: string
  openNote?: boolean
  openProfile?: boolean
  setNote?: () => void
  setProfile?: () => void
  writeArticle?: () => void
  settingDark?: () => void
  dark?: boolean
}

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000;
`

const CustomLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: #34a853;
  padding: 10px 16px;
  border-radius: 8px;
  margin: 10px 20px;
  &:hover {
    opacity: 0.8;
  }
`

const Question = styled.button`
  text-decoration: none;
  color: #fff;
  background-color: #34a853;
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

const HomeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-left: 60px;
`

const NavOptions = styled.div`
  width: auto;
  max-width: 200px;
  display: flex;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const NavIcons = styled(Link)`
  text-decoration: none;
`

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 320px;
`

const SearchDiv = styled.div`
  padding: 6px 10px;
  display: flex;
  width: 100%;
  font-size: 16px;
  gap: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
`
const SearchField = styled.input`
  outline: none;
  width: 100%;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`
const ProfileBox = styled.div`
  display: flex;
  gap: 10px;
  width: 240px;
  align-items: center;
  position: relative;
`
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`

const ProfileOptions = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 6px;
  position: absolute;
  padding: 10px 0;
  top: 65px;
  right: 0;
  width: 180px;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 20;
`
const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 10px;
`
const ProfileDivider = styled.div`
  background-color: #eee;
  width: 100%;
  height: 1px;
`
const ProfileName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`
const ProfileType = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #aeb6c3;
`

const ProfileAction = styled.div`
  display: flex;
  padding: 10px;
  gap: 6px;
  justify-content: flex-start;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`
const NoticationTrigger = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: relative;
  cursor: pointer;
`

const UserOptions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 324px;
`
const WriteButton = styled.button`
  text-decoration: none;
  color: #000;
  background-color: #f2f4f7;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 8px;
  outline: none;
  border: none;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e2e6ea;
  }
`
const ButtonSpan = styled.span`
  display: flex;
  flex-shrink: 0;
  min-width: 79px;
  text-align: center;
  justify-content: center;
`

const Counter = styled.div`
  width: 18px;
  height: 18px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 15px;
  left: 10px;
  padding: 5px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`

function HomeNav({
  user = false,
  highlight = 'none',
  openNote = false,
  openProfile = false,
  setNote = () => null,
  setProfile = () => null,
  writeArticle = () => null,
  settingDark = () => null,
  dark = false,
}: INav) {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('profile')
  const [notify, setNotify] = useState([])

  function handleLogout() {
    myApi
      .post('/')
      .then((response) => {
        const { data } = response.data
        localStorage.removeItem('blogtoken')
        if (data) {
          setTimeout(() => {
            navigate('/')
          }, 3000)
          return <LoadingScreen />
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function toggleDark() {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      localStorage.setItem('darkMode', 'false')
      settingDark && settingDark()
    } else {
      localStorage.setItem('darkMode', 'true')
      settingDark && settingDark()
    }
  }

  useEffect(() => {
    myApi
      .get('/users/v/img')
      .then((response) => {
        const { image, username } = response.data
        setImage(image)
        setUsername(username)
      })
      .catch(() => {
        null
      })
  }, [])
  useEffect(() => {
    myApi
      .get('/notification/new')
      .then((res) => {
        const { data } = res.data
        setNotify(data)
      })
      .catch(() => null)
  }, [])
  if (user) {
    return (
      <Nav className={dark ? 'dark-card' : ''}>
        <HomeDiv>
          <LinkLogo />
          <h2>Decablog</h2>
          <NavOptions>
            <NavIcons to="/users/v/dashboard">
              <AiOutlineHome
                size={24}
                color={highlight == 'home' ? '#4ea855' : '#686e78'}
              />
            </NavIcons>
            <NavIcons to="/users/v/space">
              <HiOutlineUsers
                size={24}
                color={highlight == 'spaces' ? '#4ea855' : '#686e78'}
              />
            </NavIcons>
            <NoticationTrigger>
              <BiBell
                size={24}
                color={highlight == 'notification' ? '#4ea855' : '#686e78'}
                onClick={setNote}
              />
              {notify.length > 0 && (
                <Counter onClick={setNote}>{notify.length}</Counter>
              )}
              <NotifcationModal
                display={openNote}
                dark={dark}
                notifications={notify}
              />
            </NoticationTrigger>
            <NoticationTrigger>
              <FiMoon
                onClick={toggleDark}
                size={24}
                color={dark ? '#4ea855' : '#686e78'}
              />
            </NoticationTrigger>
          </NavOptions>
        </HomeDiv>

        <SearchForm>
          <SearchDiv>
            <label htmlFor="search">
              <FiSearch size={16} />
            </label>
            <SearchField
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className={dark ? 'dark-card' : ''}
            />
          </SearchDiv>
        </SearchForm>
        <UserOptions>
          <ProfileBox>
            {image && (
              <ProfileImage src={image} alt="profile" onClick={setProfile} />
            )}
            <ProfileOptions
              show={openProfile}
              className={dark ? 'dark-card' : ''}
            >
              <ProfileDetails>
                <ProfileName className={dark ? 'dark-card' : ''}>
                  {username}
                </ProfileName>
                <ProfileType>Decadev</ProfileType>
              </ProfileDetails>
              <ProfileDivider />
              <ProfileAction>
                <LiaUser size={16} color={'#34a853'} />
                <span>Profile</span>
              </ProfileAction>
              <ProfileAction>
                <LuSettings size={16} color={'#34a853'} />
                <span>Settings</span>
              </ProfileAction>
              <ProfileAction onClick={handleLogout}>
                <RxExit size={16} color={'#34a853'} />
                <span>Logout</span>
              </ProfileAction>
            </ProfileOptions>
          </ProfileBox>
          <WriteButton onClick={writeArticle}>
            <ButtonSpan>Write an Article</ButtonSpan>
          </WriteButton>
          <Question>
            <ButtonSpan style={{ fontSize: '12px' }}>Coming Soon</ButtonSpan>
          </Question>
        </UserOptions>
      </Nav>
    )
  }
  return (
    <Nav className={dark ? 'dark-card' : ''}>
      <LinkLogo />
      <CustomLink to="/users/login">Get Started</CustomLink>
    </Nav>
  )
}

export default HomeNav
