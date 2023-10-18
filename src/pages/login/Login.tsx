import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import myApi from '../../api.config'
import axios from 'axios'
import LoadingScreen from '../booting/Loading'
import ServerError from '../error/ServerError'
import LinkLogo from '../../components/LinkLogo'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from '../../assets/images/Google.png'
import {
  Container,
  Wrapper,
  LoginForm,
  Fields,
  Submit,
  Message,
  CustomLink,
  GoogleSignin,
  GooglesLogo,
} from './Login.style'

function Login() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    myApi
      .get('/users/login')
      .then((response) => {
        const { message } = response.data
        setData(message) // Assuming the data field in the response contains your desired data
      })
      .catch((err) => {
        console.error(err)
        setError(err.message) // Handle errors here
      })
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Logging in...')
    myApi
      .post('/users/login', formData)
      .then((response) => {
        const { token } = response.data
        localStorage.setItem('blogtoken', token)
        navigate('/users/v/dashboard')
      })
      .catch(() => {
        setTimeout(() => {
          navigate('/users/signup')
        }, 2000)

        return <ServerError />
      })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse: { access_token: string }) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          myApi
            .post(`/auth/google/callback`, res.data)
            .then((response) => {
              const { token } = response.data
              localStorage.setItem('blogtoken', token)
              navigate('/users/v/dashboard')
            })
            .catch((err) => {
              console.log(err)
              navigate('/users/signup')
            })
        })
        .catch((err) => {
          console.log(err)
          navigate('/users/signup')
        })
    },
    onError: (error) => {
      console.log('Login Failed:', error)
      navigate('/')
    },
  })

  if (data) {
    return (
      <Container>
        <LinkLogo />
        <Wrapper>
          <h3>Hi! Welcome Back</h3>
          <LoginForm onSubmit={handleSubmit}>
            <Fields
              type="email"
              name="email"
              id="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <Fields
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Submit type="submit">Login</Submit>
            <GoogleSignin href="#" onClick={() => login()}>
              <GooglesLogo src={googleLogo} />
              Google
            </GoogleSignin>
            <Message>
              Don't have an account?{' '}
              <CustomLink to="/users/signup">Sign up</CustomLink>
            </Message>
          </LoginForm>
        </Wrapper>
      </Container>
    )
  }

  if (error) return <ServerError />

  return <LoadingScreen />
}

export default Login
