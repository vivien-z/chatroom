import { useChatrooms } from "../context/ChatroomsProvider";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/Chatrooms.module.css';

const Chatrooms = ({ value }) => {
  const { chatrooms, selectChatroomIndex } = useChatrooms()
  console.log(chatrooms)

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

{/*          <Dropdown>
            <Dropdown.Toggle variant="success" id="chatroom-users">
              <b>{chatroom.roomname}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ListGroup show={chatroom.selected}>
                {chatroom.roomUsers.map((roomUser, i) =>
                  <Dropdown.Item href={`#/action-{i}`}>
                    <ListGroup.Item key={i}>{roomUser.name}</ListGroup.Item>
                  </Dropdown.Item>
                )}
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>*/}

        </ListGroup.Item>
      ))}
    </ListGroup>
  )
};

export default Chatrooms;
