import { useState } from "react";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MessageInputField = ({ type, name, value, onChange, onSubmit, myUsername, myId }) => {
  const [messageContent, setMessageContent] = useState('')

  if (!useChatrooms) {
    return null
  } else {
    const { sendMessage, selectedChatroom } = useChatrooms()
    const { users } = useUsers()

    function handleSubmit(e) {
      e.preventDefault()

      const sender = users.find(user => user.username === myUsername)
      if (selectedChatroom) {
        sendMessage(selectedChatroom, messageContent, sender)
      } else {
        alert("Cannot sumbit message to empty chatroom!")
      }
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
                onClick={(e) => selectedChatroom ? null : alert("Please add a chatroom!")}
                onChange={(e) => setMessageContent(e.target.value)}
                style={{ height: '75px', resize: 'none'}}
                // placeholder={`current user: ${myUsername}`}
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
