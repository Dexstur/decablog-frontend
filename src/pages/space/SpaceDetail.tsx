import {
  Wrapper,
  Overlay,
  Content,
  Top,
  Title,
  Util,
  Owner,
  OwnerName,
  Controls,
  Options,
  Invite,
} from './SpaceDetail.style'
import { BsThreeDots } from 'react-icons/bs'
import InviteDecadev from './InviteDecadev'

interface ISpacedetail {
  space: SpaceData
  click1: () => void
  inviteState: boolean
  inviteUser: string
  inviteInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  sendInvite: () => void
}

interface SpaceData {
  _id: string
  name: string
  description: string
  owner: string
  ownerId: string
  category: string
  users: number
  comments: number
  userImg: string
  picture: string
  createdAt: string
}

function SpaceDetail({
  space,
  click1,
  inviteState,
  inviteUser,
  inviteInput,
  sendInvite,
}: ISpacedetail) {
  return (
    <Wrapper>
      <Overlay>
        <Content>
          <Top>
            <Title>{space.name}</Title>
          </Top>
          <Util>
            <Owner>
              <OwnerName>{space.owner}</OwnerName>
              <p>Organizer</p>
            </Owner>
            <Controls>
              <Options>
                <BsThreeDots size={24} color="#fff" />
              </Options>
              <Invite onClick={click1}>Invite</Invite>
              <InviteDecadev
                display={inviteState}
                spaceName={space.name}
                inviteUser={inviteUser}
                inviteInput={inviteInput}
                sendInvite={sendInvite}
              />
            </Controls>
          </Util>
        </Content>
      </Overlay>
    </Wrapper>
  )
}

export default SpaceDetail
