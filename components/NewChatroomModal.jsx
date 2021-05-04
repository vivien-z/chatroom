import { useRef, useState } from "react";
import { useChatrooms } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewChatroomModal = ({ closeModal }) => {
  const { users } = useUsers()
  const [selectedUserIds, setSelectedUserIds] = useState([])

  const roomnameRef = useRef()
  const { createChatroom } = useChatrooms()

  function handleCheckboxChange(userId) {
    setSelectedUserIds(prevSelectedUserIds => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter(id => {
          return id !== userID
        })
      } else {
        return [...prevSelectedUserIds, userId]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    createChatroom(roomnameRef.current.value, selectedUserIds) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>Create a Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {users.map(user => (
            <Form.Group controlId={user.id} key={user.id}>
              <Form.Check
                type="checkbox"
                value={selectedUserIds.includes(user.id)}
                label={user.username}
                onChange={() => handleCheckboxChange(user.id)}
              />

            </Form.Group>
          ))}
          <Form.Group>
            <Form.Label>Chatroom name:</Form.Label>
            <Form.Control type="text" ref={roomnameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewChatroomModal;
