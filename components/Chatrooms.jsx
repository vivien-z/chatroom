import { useChatrooms } from "../context/ChatroomsProvider";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const Chatrooms = ({ value }) => {
  const { chatrooms, selectChatroomIndex } = useChatrooms()
  return (
    <ListGroup variant="flush">
      {chatrooms.map((chatroom, i) => (
        <ListGroup.Item
          key={i}
          action
          onClick={() => selectChatroomIndex(i)}
          active={chatroom.selected}
        >
          <b>{chatroom.roomname}</b>
          <ListGroup className={chatroom.selected ? null : 'd-none'}>
            {chatroom.roomUsers.map((roomUser, i) =>
              <ListGroup.Item key={i}>{roomUser.username}</ListGroup.Item>
            )}
          </ListGroup>

        </ListGroup.Item>
      ))}
    </ListGroup>
  )
};

export default Chatrooms;
