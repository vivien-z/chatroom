import { useRef, useState } from "react";
import { useChatrooms } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewChatroomModal = ({ closeModal }) => {
  const roomnameRef = useRef()
  // const [joinedUsers, setJoinedUsers] = useState([])
  const { users } = useUsers()
  const { createChatroom } = useChatrooms()

  function handleSubmit(e) {
    e.preventDefault()

    createChatroom(roomnameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>Create a Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
