import {
  MainBox,
  Top,
  Text,
  Divider,
  SubBox,
  TextBox,
  Text2,
  Text3,
  Button,
} from './Suggest.style'
import { SpaceSummary } from '../spaceList/SpaceList'

interface SuggestProps {
  spaces: SpaceSummary[]
  dark?: boolean
}

function Suggest({ spaces, dark = false }: SuggestProps) {
  return (
    <MainBox className={dark ? 'dark-card' : ''}>
      <Top className={dark ? 'dark-card' : ''}>
        <Text>Spaces you may like</Text>
      </Top>
      <SubBox>
        {spaces.length === 0 && (
          <Text3 className={dark ? 'dark-card' : ''}>No suggestions</Text3>
        )}
        {spaces.map((space, index) => (
          <>
            <Divider />
            <TextBox key={index} className={dark ? 'dark-card' : ''}>
              <Text2 className={dark ? 'dark-card' : ''}>{space.name}</Text2>
              <Text3 className={dark ? 'dark-card' : ''}>
                {space.description}
              </Text3>
              <Button to={`/space/id/${space._id}`}>Join Space</Button>
            </TextBox>
          </>
        ))}
      </SubBox>
    </MainBox>
  )
}

export default Suggest
