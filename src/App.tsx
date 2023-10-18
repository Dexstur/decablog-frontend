import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import StoryList from './pages/category/StoryList'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound from './pages/error/NotFound'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import SpacePage from './pages/space/SpacePage'
import SpaceCategory from './pages/spaceList/SpaceCategory'
import SpaceListing from './pages/spaceList/SpaceListing'
import Sso from './pages/sso/Sso'
import StoryPage from './pages/story/StoryPage'
import InvitePage from './pages/space/InvitePage'
import UpdateStory from './pages/updateStory/UpdateStory'

function App() {
  const darkMode = localStorage.getItem('darkMode')
  const [dark, setDark] = useState(darkMode === 'true' ? true : false)

  function toggleDark() {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      setDark(true)
    } else {
      setDark(false)
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route
          path="/users/v/dashboard"
          element={<Dashboard dark={dark} settingDark={toggleDark} />}
        />
        <Route
          path="/users/v/space"
          element={<SpaceListing dark={dark} settingDark={toggleDark} />}
        />
        <Route path="/auth/sso">
          <Route path=":ssoId" element={<Sso dark={dark} />} />
        </Route>
        <Route path="/story/id">
          <Route
            path=":storyId"
            element={<StoryPage dark={dark} settingDark={toggleDark} />}
          />
        </Route>
        <Route path="/story/update">
          <Route
            path=":storyId"
            element={<UpdateStory dark={dark} settingDark={toggleDark} />}
          />
        </Route>
        <Route
          path="/space/invite/:spaceId/"
          element={<InvitePage dark={dark} settingDark={toggleDark} />}
        />
        <Route path="/space/id">
          <Route
            path=":spaceId"
            element={<SpacePage dark={dark} settingDark={toggleDark} />}
          />
        </Route>
        <Route path="/category">
          <Route
            path="story/:category"
            element={<StoryList dark={dark} settingDark={toggleDark} />}
          />
          <Route
            path="space/:category"
            element={<SpaceCategory dark={dark} settingDark={toggleDark} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
