import { useChatrooms } from "../context/ChatroomsProvider";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/Chatrooms.module.css';

const Chatrooms = ({ value }) => {
  const { chatrooms } = useChatrooms()

  return (
    <ListGroup variant="flush">

        {chatrooms.map((chatroom, i) => (
          <ListGroup.Item key={i}>
            <b>{chatroom.roomname}</b>
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
};

export default Chatrooms;
