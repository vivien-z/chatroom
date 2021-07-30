import { useState } from "react";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// const MessageInputField = ({ username, id, selectedChatroom }) => {
const MessageInputField = ({ type, name, value, onChange, onSubmit, username, id, selectedChatroom }) => {
  const [messageContent, setMessageContent] = useState('')

  if (!useChatrooms) {
    return null
  } else {
    const { sendMessage, selectedChatroom } = useChatrooms()
    const { users } = useUsers()

    function handleSubmit(e) {
      e.preventDefault()

      const sender = users.find(user => user.username === username)
      sendMessage(selectedChatroom, messageContent, sender)
      setMessageContent('')
    }

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <InputGroup className="w-100">
              <Form.Control
                as="textarea"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                style={{ height: '75px', resize: 'none'}}
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
