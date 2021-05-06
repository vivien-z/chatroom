import { useState } from "react";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styles from '../styles/MessageInputField.module.css';

const MessageInputField = ({ type, name, value, onChange, onSubmit }) => {
  const [message, setMessage] = useState('')
  if (!useChatrooms) {
    return
  } else {
    // const { sendMessage, selectedChatroom } = useChatrooms()

    function  handleSubmit(e) {
      e.preventDefault()
      // const roomUsernames = selectedChatroom.roomUsers.map(roomUser => roomUser.username)
      // sendMessage(selectedChatroom, message)
      setMessage('')
    }

    return (
      <div className={styles.messageInput}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <InputGroup className="w-100">
              <Form.Control
                style={{ height: '75px', resize: 'none' }}
                as="textarea"
                name={name}
                value={value}
                onChange={(e) => e.preventDefault() || onChange(e.target.value)}
                required
              />
              <Button type="submit">Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
  }

};

export default MessageInputField;

{/*

      if (disabled) {
        return null;
      } else {
        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <input
            className={styles.messageInputField}
            type={type}
            name={name}
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            placeholder={placeholder}
          />
          <input
            className={styles.messageInputButton}
            type="submit"
            value="Submit"
          />
        </form>
      }
*/}
