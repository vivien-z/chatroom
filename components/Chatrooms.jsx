import { useChatrooms } from "../context/ChatroomsProvider";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/Chatrooms.module.css';

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
            <ListGroup>
              {chatroom.roomUsers.map((roomUser, i) =>
                <ListGroup.Item key={i}>{roomUser.name}</ListGroup.Item>
              )}
            </ListGroup>
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
};

export default Chatrooms;
