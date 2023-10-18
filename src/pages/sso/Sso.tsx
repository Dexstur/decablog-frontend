import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ServerError from '../error/ServerError'
import NoAuth from '../error/NoAuth'
import LoadingScreen from '../booting/Loading'
import myApi from '../../api.config'

function Sso({ dark = false }) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { ssoId } = useParams()

  useEffect(() => {
    myApi
      .get(`/auth/sso/${ssoId}`)
      .then((response) => {
        const { token } = response.data
        localStorage.setItem('blogtoken', token)
        navigate('/users/v/dashboard')
        return
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.status)
        } else {
          setError(err)
        }
      })
  }, [ssoId, navigate])

  if (error) {
    if (error === 401) {
      setTimeout(() => {
        navigate('/users/login')
      }, 3000)
      return <NoAuth />
    }

    return <ServerError />
  }

  return <LoadingScreen dark={dark} />
}

export default Sso
