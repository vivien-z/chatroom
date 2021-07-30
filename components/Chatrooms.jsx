import { useChatrooms } from "../context/ChatroomsProvider";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const Chatrooms = ({ value, username }) => {
  const { chatrooms, selectChatroomIndex } = useChatrooms()

  function otherRoomUsers(chatroom) {
    return chatroom.roomUsers.filter(user => user.username !== username).map(user => user.username)
  }

  function isMyChatroom(chatroom) {
    return chatroom.roomUsers.length !== otherRoomUsers(chatroom).length
  }

  function listChatroomUsers(chatroom) {
    if (isMyChatroom(chatroom)) {
      return [...otherRoomUsers(chatroom), "me"]
    } else {
      return otherRoomUsers(chatroom)
    }
  }

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
            {listChatroomUsers(chatroom).map((roomUser, i) =>
              <ListGroup.Item key={i}>{roomUser}</ListGroup.Item>
            )}
          </ListGroup>

        </ListGroup.Item>
      ))}
    </ListGroup>
  )
};

export default Chatrooms;

            // {chatroom.roomUsers.map((roomUser, i) =>
            //   <ListGroup.Item key={i}>{roomUser.username}</ListGroup.Item>
            // )}
