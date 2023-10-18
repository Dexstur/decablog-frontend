import { ReactNode, useState } from 'react'
import { styled } from 'styled-components'
import Footer from './Footer'
import HomeNav from './NavBar'
import WriteStory from './WriteStory'

interface ILayout {
  children: ReactNode
  userStatus?: boolean
  navActive?: string
  dark?: boolean
  settingDark?: () => void
}

const Container = styled.div<{ dark: boolean }>`
  position: relative;
  width: 100%;
  padding-top: 80px;
  min-height: 100vh;
  background-color: ${({ dark }) => (dark ? '#4f6d7a' : '#f8fbfb')};
`
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`

function Layout({
  children,
  navActive = 'none',
  userStatus = false,
  dark = false,
  settingDark = () => null,
}: ILayout) {
  const [seeProfile, setSeeProfile] = useState(false)
  const [notify, setNotify] = useState(false)
  const [openWriter, setOpenWriter] = useState(false)

  function closeAll() {
    setSeeProfile(false)
    setNotify(false)
    setOpenWriter(false)
  }
  function toggleProfile() {
    setNotify(false)
    setOpenWriter(false)
    setSeeProfile(!seeProfile)
  }
  function toggleNotify() {
    setSeeProfile(false)
    setOpenWriter(false)
    setNotify(!notify)
  }
  function toggleWriter() {
    setSeeProfile(false)
    setNotify(false)
    setOpenWriter(!openWriter)
  }
  if (userStatus) {
    const setOpacity = openWriter ? '0.5' : '1'
    return (
      <Container dark={dark}>
        <HomeNav
          user={true}
          highlight={navActive}
          openNote={notify}
          openProfile={seeProfile}
          setNote={toggleNotify}
          setProfile={toggleProfile}
          writeArticle={toggleWriter}
          settingDark={settingDark}
          dark={dark}
        />
        <WriteStory
          display={openWriter}
          close={() => setOpenWriter(false)}
          dark={dark}
        />
        <Wrapper
          onClick={closeAll}
          style={{ opacity: setOpacity }}
          className={dark ? 'dark-body' : ''}
        >
          {children}
        </Wrapper>
        <Footer dark={dark} />
      </Container>
    )
  }
  return (
    <Container dark={dark}>
      <HomeNav dark={dark} />
      <Wrapper className={dark ? 'dark-body' : ''}>{children}</Wrapper>
      <Footer dark={dark} />
    </Container>
  )
}

export default Layout
