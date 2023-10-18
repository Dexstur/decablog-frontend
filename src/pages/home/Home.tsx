import { useEffect, useState } from 'react'
import myApi from '../../api.config'
import Layout from '../../components/Layout'
import LoadingScreen from '../booting/Loading'
import ServerError from '../error/ServerError'
import fashion from '/Fashion.png'
import python from '/python.png'
import tslaptop from '/ts_laptop.png'
import nodejs from '/nodejs.png'
import html from '/html.png'
import ios from '/ios.png'
import java from '/java.png'
import react from '/React.png'
import {
  Large,
  LargeContent,
  LargeText,
  LargeOptions,
  LargeLinkWhite,
  LargeLinkGreen,
  StackCont,
  StackHeading,
  StackP,
  ImgWrapper,
  StackImg,
} from './Home.style'

function Home() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    myApi
      .get('/')
      .then((response) => {
        const { data } = response.data
        setData(data)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message) // Handle errors here
      })
  }, [])

  if (data)
    return (
      <Layout>
        <Large>
          <LargeContent>
            <LargeText>
              Join the decadev gist space with the latest articles in the world.
            </LargeText>
            <LargeOptions>
              <LargeLinkGreen to="/users/login">Get Started</LargeLinkGreen>
              <LargeLinkWhite to="/category/story/general">
                See Stories
              </LargeLinkWhite>
            </LargeOptions>
          </LargeContent>
        </Large>
        <StackCont>
          <StackHeading>Tips and recommendations on tech stacks</StackHeading>
          <StackP>
            Read Articles, join spaces hosted by different Decadevs just like
            you.
          </StackP>
          <ImgWrapper>
            <StackImg source={java}>Java</StackImg>
            <StackImg source={python}>Python</StackImg>
            <StackImg source={html}></StackImg>
            <StackImg source={ios}>IOS</StackImg>
            <StackImg source={tslaptop}>Typescript</StackImg>
            <StackImg source={nodejs}>Node js</StackImg>
            <StackImg source={fashion}>JS</StackImg>
            <StackImg source={react}>React</StackImg>
          </ImgWrapper>
        </StackCont>
      </Layout>
    )

  if (error) return <ServerError />

  return <LoadingScreen />
}

{
  /* <Colored>
          <DevImg src={devPic} />
        </Colored> */
}

export default Home
